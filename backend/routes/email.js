import express from "express";
import EmailIngestionService from "../services/emailIngestion.js";

const router = express.Router();
let emailService = null;
let newEmails = [];

router.post("/start", async (req, res) => {
    try {
        console.log('Starting email service...');
        
        if (emailService) {
            console.log('Stopping existing email service...');
            await emailService.stop();
        }

        const config = {
            user: 'rish23478@gmail.com', // Hardcoded for testing
            password: 'sdxw lqad ljor mdap', // Hardcoded for testing
            host: "imap.gmail.com",
            port: 993,
            tls: true
        };

        console.log('Creating new email service with config:', {...config, password: '***'});

        emailService = new EmailIngestionService(config, {
            onNewEmail: (email) => {
                console.log('New email received:', email);
                const emailNotif = {
                    id: email.messageId || Math.random().toString(36).substr(2, 9),
                    subject: email.subject,
                    from: email.from?.text,
                    date: email.date,
                    attachments: email.attachments?.length || 0,
                    timestamp: new Date()
                };
                console.log('Created notification:', emailNotif);
                newEmails.unshift(emailNotif);
                if (newEmails.length > 50) {
                    newEmails = newEmails.slice(0, 50);
                }
            }
        });
        
        await emailService.start();

        res.json({ message: "Email monitoring started successfully" });
    } catch (error) {
        console.error("Failed to start email monitoring:", error);
        res.status(500).json({ error: "Failed to start email monitoring" });
    }
});

router.post("/stop", (req, res) => {
    try {
        if (emailService) {
            emailService.stop();
            emailService = null;
            res.json({ message: "Email monitoring stopped successfully" });
        } else {
            res.status(400).json({ message: "Email monitoring is not running" });
        }
    } catch (error) {
        console.error("Failed to stop email monitoring:", error);
        res.status(500).json({ error: "Failed to stop email monitoring" });
    }
});

router.get("/status", (req, res) => {
    try {
        // Initialize response object with safe defaults
        const status = {
            status: "stopped",
            lastCheck: null,
            timeSinceLastCheck: null,
            newEmails: [],
            totalEmails: 0
        };

        // Only update if email service exists
        if (emailService) {
            status.status = "running";
            const lastCheck = emailService.getLastCheckTime();
            if (lastCheck) {
                status.lastCheck = lastCheck;
                status.timeSinceLastCheck = Date.now() - lastCheck;
            }
        }

        // Safely add email data
        if (Array.isArray(newEmails)) {
            status.newEmails = newEmails;
            status.totalEmails = newEmails.length;
        }
        
        console.log('Returning email status:', status);
        res.json(status);
    } catch (error) {
        console.error('Error getting email status:', error);
        res.status(500).json({ 
            error: "Failed to get email status",
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

router.post("/clear-notifications", (req, res) => {
    try {
        const { ids } = req.body;
        if (ids && Array.isArray(ids)) {
            newEmails = newEmails.filter(email => !ids.includes(email.id));
        } else {
            newEmails = [];
        }
        res.json({ message: "Notifications cleared successfully" });
    } catch (error) {
        console.error("Failed to clear notifications:", error);
        res.status(500).json({ error: "Failed to clear notifications" });
    }
});

export default router;
