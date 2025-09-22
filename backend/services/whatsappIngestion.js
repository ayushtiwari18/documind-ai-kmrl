import WhatsAppWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = WhatsAppWeb;

class WhatsAppIngestionService {
    constructor(callbacks = {}) {
        this.lastCheckTime = null;
        this.callbacks = callbacks;
        this.client = null;
        this.qrCode = null;
        this.isReady = false;
    }

    async start() {
        console.log('Starting WhatsApp monitoring service...');
        
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            },
            qrMaxRetries: 5,
            authTimeoutMs: 60000,
            restartOnAuthFail: true
        });

        this.setupEventHandlers();
        await this.client.initialize();
        
        this.lastCheckTime = Date.now();
        console.log('WhatsApp service started successfully');
    }

    setupEventHandlers() {
        this.client.on('qr', (qr) => {
            console.log('WhatsApp QR Code received');
            this.qrCode = qr;
            if (this.callbacks.onQRCode) {
                this.callbacks.onQRCode(qr);
            }
        });

        this.client.on('ready', () => {
            console.log('WhatsApp Client is ready!');
            this.isReady = true;
            this.qrCode = null;
            if (this.callbacks.onReady) {
                this.callbacks.onReady();
            }
        });

        this.client.on('message', async (message) => {
            console.log('New WhatsApp message received:', {
                from: message.from,
                timestamp: message.timestamp,
                hasMedia: message.hasMedia
            });

            let attachments = [];
            if (message.hasMedia) {
                try {
                    const media = await message.downloadMedia();
                    attachments.push({
                        filename: media.filename,
                        data: media.data,
                        mimetype: media.mimetype
                    });
                } catch (error) {
                    console.error('Error downloading media:', error);
                }
            }

            if (this.callbacks.onNewMessage) {
                this.callbacks.onNewMessage({
                    id: message.id._serialized,
                    from: message.from,
                    timestamp: message.timestamp * 1000, // Convert to milliseconds
                    body: message.body,
                    hasMedia: message.hasMedia,
                    attachments
                });
            }
        });

        this.client.on('disconnected', (reason) => {
            console.log('WhatsApp Client was disconnected:', reason);
            this.isReady = false;
            if (this.callbacks.onDisconnected) {
                this.callbacks.onDisconnected(reason);
            }
        });
    }

    async stop() {
        if (this.client) {
            await this.client.destroy();
            this.client = null;
            this.isReady = false;
            this.qrCode = null;
            console.log('WhatsApp service stopped');
        }
    }

    getLastCheckTime() {
        return this.lastCheckTime;
    }

    getStatus() {
        return {
            isReady: this.isReady,
            qrCode: this.qrCode,
            lastCheckTime: this.lastCheckTime
        };
    }
}

export default WhatsAppIngestionService;