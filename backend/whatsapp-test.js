import WhatsAppWeb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
const { Client, LocalAuth } = WhatsAppWeb;

console.log('Starting WhatsApp client...');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "documind-client" }),
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
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log('Message received:', msg.body);
});

client.on('disconnected', (reason) => {
    console.log('Client was disconnected', reason);
});

client.initialize().catch(err => {
    console.error('Error initializing client:', err);
});