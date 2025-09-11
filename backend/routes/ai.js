import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import xlsx from 'xlsx';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Extract text from various file formats
async function extractTextFromFile(filePath, mimetype) {
  try {
    let text = '';
    
    switch (mimetype) {
      case 'application/pdf':
        const pdfBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        text = pdfData.text;
        break;
        
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docBuffer = await fs.readFile(filePath);
        const docResult = await mammoth.extractRawText({ buffer: docBuffer });
        text = docResult.value;
        break;
        
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        const workbook = xlsx.readFile(filePath);
        const sheets = workbook.SheetNames;
        text = sheets.map(sheet => {
          const worksheet = workbook.Sheets[sheet];
          return xlsx.utils.sheet_to_txt(worksheet);
        }).join('\\n\\n');
        break;
        
      case 'text/plain':
        text = await fs.readFile(filePath, 'utf8');
        break;
        
      default:
        throw new Error('Unsupported file type');
    }
    
    return text;
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw new Error('Failed to extract text from file');
  }
}

// Generate AI summary using Gemini
async function generateSummary(text, options = {}) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
Please analyze the following document and provide a comprehensive summary in JSON format with the following structure:

{
  "executiveSummary": "A brief executive summary of the document",
  "keyPoints": ["Array of key points from the document"],
  "actionItems": [
    {
      "task": "Specific task description",
      "priority": "high|medium|low",
      "deadline": "suggested deadline",
      "department": "responsible department",
      "estimatedHours": "estimated completion time"
    }
  ],
  "complianceItems": ["Array of compliance-related items"],
  "riskFactors": ["Array of identified risks"],
  "recommendations": ["Array of recommendations"],
  "categories": ["Array of document categories/tags"],
  "confidence": "confidence score as percentage",
  "language": "detected language (English/Malayalam/Mixed)",
  "documentType": "type of document",
  "urgencyLevel": "low|medium|high|critical"
}

Document Text:
${text}

Please ensure the analysis is specific to KMRL (Kochi Metro Rail Limited) context and includes relevant operational, safety, and compliance considerations.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summaryText = response.text();
    
    // Parse JSON response
    let summary;
    try {
      // Extract JSON from the response (remove any markdown formatting)
      const jsonMatch = summaryText.match(/```json\\n?([\\s\\S]*?)```/) || summaryText.match(/\\{[\\s\\S]*\\}/);
      const jsonText = jsonMatch ? jsonMatch[1] || jsonMatch[0] : summaryText;
      summary = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      // Fallback to a structured response
      summary = {
        executiveSummary: summaryText.substring(0, 300) + '...',
        keyPoints: ['Summary generation completed'],
        actionItems: [],
        complianceItems: [],
        riskFactors: [],
        recommendations: [],
        categories: ['General'],
        confidence: '85',
        language: 'English',
        documentType: 'General Document',
        urgencyLevel: 'medium'
      };
    }
    
    return summary;
  } catch (error) {
    console.error('Error generating summary with Gemini:', error);
    throw new Error('Failed to generate AI summary');
  }
}

// POST /api/ai/summarize - Summarize document content
router.post('/summarize', upload.single('document'), async (req, res) => {
  try {
    let text = '';
    
    if (req.file) {
      // Extract text from uploaded file
      text = await extractTextFromFile(req.file.path, req.file.mimetype);
      
      // Clean up uploaded file
      await fs.unlink(req.file.path);
    } else if (req.body.text) {
      // Use provided text
      text = req.body.text;
    } else {
      return res.status(400).json({
        error: 'No document file or text provided'
      });
    }
    
    if (!text.trim()) {
      return res.status(400).json({
        error: 'No readable text found in the document'
      });
    }
    
    // Generate AI summary
    const summary = await generateSummary(text, req.body.options);
    
    // Add metadata
    const result = {
      id: uuidv4(),
      summary,
      metadata: {
        originalLength: text.length,
        generatedAt: new Date().toISOString(),
        model: 'gemini-pro',
        processingTime: Date.now() - req.startTime
      }
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error in summarize endpoint:', error);
    res.status(500).json({
      error: error.message || 'Failed to process document'
    });
  }
});

// POST /api/ai/analyze-text - Analyze raw text
router.post('/analyze-text', async (req, res) => {
  try {
    const { text, options = {} } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({
        error: 'Text content is required'
      });
    }
    
    const summary = await generateSummary(text, options);
    
    const result = {
      id: uuidv4(),
      summary,
      metadata: {
        originalLength: text.length,
        generatedAt: new Date().toISOString(),
        model: 'gemini-pro',
        processingTime: Date.now() - req.startTime
      }
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error in analyze-text endpoint:', error);
    res.status(500).json({
      error: error.message || 'Failed to analyze text'
    });
  }
});

// GET /api/ai/health - Check AI service health
router.get('/health', async (req, res) => {
  try {
    // Test Gemini API connectivity
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const testResult = await model.generateContent('Say "OK" if you can receive this message.');
    const response = await testResult.response;
    
    res.json({
      status: 'healthy',
      geminiConnected: true,
      message: 'AI services are operational',
      model: 'gemini-pro',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      geminiConnected: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Middleware to track request time
router.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

export default router;
