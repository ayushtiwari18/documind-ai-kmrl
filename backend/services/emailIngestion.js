import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailIngestionService {
    constructor(config, callbacks = {}) {
        console.log('Initializing email service with config:', {
            user: config.user,
            host: config.host,
            port: config.port,
            tls: config.tls
        });

        this.lastCheckTime = null;
        this.callbacks = callbacks;

        this.imap = new Imap({
            user: config.user,
            password: config.password,
            host: config.host,
            port: config.port,
            tls: config.tls,
            tlsOptions: { rejectUnauthorized: false },
            debug: console.log // Enable IMAP debug logging
        });

        this.checkInterval = null;
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.imap.on('ready', () => {
            console.log('IMAP connection ready');
            this.onReady();
        });

        this.imap.on('error', err => {
            console.error('IMAP Error:', err);
            if (err.code === 'ENOTFOUND') {
                console.error('DNS lookup failed - check host name');
            } else if (err.code === 'ETIMEDOUT') {
                console.error('Connection timed out - check network and port');
            } else if (err.source === 'authentication') {
                console.error('Authentication failed - check username and password');
            }
            setTimeout(() => {
                console.log('Attempting to reconnect...');
                this.start();
            }, 10000);
        });

        this.imap.on('end', () => {
            console.log('IMAP Connection ended');
            if (this.checkInterval) {
                clearInterval(this.checkInterval);
                this.checkInterval = null;
            }
        });

        // Add more debug event handlers
        this.imap.on('alert', msg => console.log('IMAP Alert:', msg));
        this.imap.on('mail', numNewMsgs => console.log('New mail arrived, count:', numNewMsgs));
        this.imap.on('expunge', seqno => console.log('Message #', seqno, 'was expunged'));
        this.imap.on('update', seqno => console.log('Message #', seqno, 'was updated'));
    }

    async start() {
        console.log('Starting email monitoring service...');
        return new Promise((resolve, reject) => {
            this.imap.once('ready', () => {
                console.log('Connection established successfully');
                if (!this.checkInterval) {
                    this.checkInterval = setInterval(() => this.checkNewEmails(), 30000);
                    console.log('Email check interval set to 30 seconds');
                }
                resolve();
            });
            this.imap.once('error', reject);
            
            console.log('Attempting to connect to IMAP server...');
            this.imap.connect();
        });
    }

    stop() {
        console.log('Stopping email monitoring service...');
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
            console.log('Email check interval cleared');
        }
        if (this.imap) {
            this.imap.end();
            console.log('IMAP connection terminated');
        }
    }

    onReady() {
        console.log('Opening INBOX mailbox...');
        this.imap.openBox('INBOX', false, (err, box) => {
            if (err) {
                console.error('Error opening mailbox:', err);
                return;
            }
            console.log('Connected to INBOX:', {
                name: box.name,
                messages: box.messages,
                flags: box.flags,
                readOnly: box.readOnly
            });
            this.checkNewEmails();
        });
    }

    getLastCheckTime() {
        return this.lastCheckTime;
    }

    checkNewEmails() {
        console.log('Checking for new emails...');
        this.lastCheckTime = Date.now();
        
        this.imap.search(['UNSEEN'], (err, results) => {
            if (err) {
                console.error('Error searching emails:', err);
                return;
            }

            if (!results || !results.length) {
                console.log('No new messages found');
                return;
            }

            console.log(`Found ${results.length} new messages:`, results);
            const f = this.imap.fetch(results, {
                bodies: '',
                markSeen: true
            });

            f.on('message', (msg, seqno) => {
                console.log(`Starting to process message #${seqno}`);
                this.processMessage(msg, seqno);
            });
            
            f.once('error', err => console.error('Fetch error:', err));
            f.once('end', () => console.log('Done fetching all messages'));
        });
    }

    async processMessage(msg, seqno) {
        console.log(`Processing message #${seqno}`);
        let buffer = '';

        msg.on('body', stream => {
            console.log(`Reading body of message #${seqno}`);
            stream.on('data', chunk => {
                buffer += chunk.toString('utf8');
            });

            stream.once('end', async () => {
                try {
                    console.log(`Parsing message #${seqno}`);
                    const parsed = await simpleParser(buffer);
                    console.log(`Message #${seqno} details:`, {
                        subject: parsed.subject,
                        from: parsed.from?.text,
                        date: parsed.date,
                        hasAttachments: parsed.attachments?.length > 0
                    });

                    if (parsed.attachments && parsed.attachments.length > 0) {
                        console.log(`Found ${parsed.attachments.length} attachments in message #${seqno}`);
                        await this.processAttachments(parsed.attachments, seqno);
                    } else {
                        console.log(`No attachments found in message #${seqno}`);
                    }

                    // Call the onNewEmail callback if provided
                    if (this.callbacks.onNewEmail) {
                        this.callbacks.onNewEmail({
                            messageId: parsed.messageId,
                            subject: parsed.subject,
                            from: parsed.from,
                            date: parsed.date,
                            attachments: parsed.attachments || []
                        });
                    }
                } catch (err) {
                    console.error(`Error parsing email #${seqno}:`, err);
                }
            });
        });

        msg.once('attributes', attrs => {
            console.log(`Message #${seqno} attributes:`, {
                uid: attrs.uid,
                flags: attrs.flags,
                date: attrs.date
            });
        });
    }

    processAttachments(attachments, seqno) {
        return Promise.all(attachments.map(async (attachment, index) => {
            console.log(`Processing attachment ${index + 1}/${attachments.length} from message #${seqno}:`, {
                filename: attachment.filename,
                contentType: attachment.contentType,
                size: attachment.size
            });

            const filename = crypto.createHash('md5').update(attachment.filename + Date.now()).digest('hex');
            const filepath = path.join(__dirname, '..', 'uploads', filename);

            return new Promise((resolve, reject) => {
                fs.writeFile(filepath, attachment.content, err => {
                    if (err) {
                        console.error('Error saving attachment:', err);
                        reject(err);
                        return;
                    }
                    console.log(`Attachment saved successfully:`, {
                        originalName: attachment.filename,
                        savedAs: filename,
                        path: filepath,
                        size: attachment.size
                    });
                    resolve();
                });
            });
        }));
    }
}

export default EmailIngestionService;