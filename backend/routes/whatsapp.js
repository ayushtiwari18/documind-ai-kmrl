import express from "express";
import WhatsAppIngestionService from "../services/whatsappIngestion.js";

const router = express.Router();
let whatsappService = null;
let newMessages = [];

router.post("/start", async (req, res) => {
    try {
        if (whatsappService) {
            await whatsappService.stop();
        }

        whatsappService = new WhatsAppIngestionService({
            onNewMessage: (message) => {
                newMessages.unshift({
                    id: message.id,
                    from: message.from,
                    body: message.body,
                    timestamp: new Date(message.timestamp),
                    hasMedia: message.hasMedia,
                    attachments: message.attachments || []
                });
                if (newMessages.length > 50) {
                    newMessages = newMessages.slice(0, 50);
                }
            },
            onQRCode: (qr) => {
                console.log('New QR Code generated');
            },
            onReady: () => {
                console.log('WhatsApp client is ready');
            },
            onDisconnected: (reason) => {
                console.log('WhatsApp client disconnected:', reason);
            }
        });
        
        await whatsappService.start();
        res.json({ message: "WhatsApp monitoring started successfully" });
    } catch (error) {
        console.error("Failed to start WhatsApp monitoring:", error);
        res.status(500).json({ error: "Failed to start WhatsApp monitoring" });
    }
});

router.post("/stop", async (req, res) => {
    try {
        if (whatsappService) {
            await whatsappService.stop();
            whatsappService = null;
            res.json({ message: "WhatsApp monitoring stopped successfully" });
        } else {
            res.status(400).json({ message: "WhatsApp monitoring is not running" });
        }
    } catch (error) {
        console.error("Failed to stop WhatsApp monitoring:", error);
        res.status(500).json({ error: "Failed to stop WhatsApp monitoring" });
    }
});

router.get("/status", (req, res) => {
    try {
        const status = {
            status: "stopped",
            lastCheck: null,
            timeSinceLastCheck: null,
            qrCode: null,
            isReady: false,
            newMessages: [],
            totalMessages: 0
        };

        if (whatsappService) {
            const serviceStatus = whatsappService.getStatus();
            status.status = serviceStatus.isReady ? "running" : "initializing";
            status.isReady = serviceStatus.isReady;
            status.qrCode = serviceStatus.qrCode;
            status.lastCheck = serviceStatus.lastCheckTime;
            status.timeSinceLastCheck = serviceStatus.lastCheckTime ? Date.now() - serviceStatus.lastCheckTime : null;
        }

        if (Array.isArray(newMessages)) {
            status.newMessages = newMessages;
            status.totalMessages = newMessages.length;
        }
        
        res.json(status);
    } catch (error) {
        console.error("Failed to get WhatsApp status:", error);
        res.status(500).json({ error: "Failed to get WhatsApp status" });
    }
});

router.post("/clear-notifications", (req, res) => {
    try {
        const { ids } = req.body;
        if (ids && Array.isArray(ids)) {
            newMessages = newMessages.filter(msg => !ids.includes(msg.id));
        } else {
            newMessages = [];
        }
        res.json({ message: "Notifications cleared successfully" });
    } catch (error) {
        console.error("Failed to clear notifications:", error);
        res.status(500).json({ error: "Failed to clear notifications" });
    }
});

export default router;