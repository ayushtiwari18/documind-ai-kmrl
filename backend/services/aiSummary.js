import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import xlsx from 'xlsx';

dotenv.config();
console.log('Loading Gemini API key:', process.env.GEMINI_API_KEY ? 'Key found (length: ' + process.env.GEMINI_API_KEY.length + ')' : 'No key found');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractTextFromFile(filePath, mimetype) {
  let text = '';
  switch (mimetype) {
    case 'application/pdf': {
      const pdfBuffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(pdfBuffer);
      text = pdfData.text;
      break;
    }
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      const docBuffer = await fs.readFile(filePath);
      const docResult = await mammoth.extractRawText({ buffer: docBuffer });
      text = docResult.value;
      break;
    }
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      const workbook = xlsx.readFile(filePath);
      const sheets = workbook.SheetNames;
      text = sheets
        .map((sheet) => {
          const worksheet = workbook.Sheets[sheet];
          return xlsx.utils.sheet_to_txt(worksheet);
        })
        .join('\n\n');
      break;
    }
    case 'text/plain': {
      text = await fs.readFile(filePath, 'utf8');
      break;
    }
    default:
      throw new Error('Unsupported file type');
  }
  return text;
}

export async function generateSummary(text) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Please analyze the following document and provide a comprehensive summary in JSON format with this structure:
{
  "executiveSummary": "...",
  "keyPoints": ["..."],
  "actionItems": [{"task":"...","priority":"high|medium|low","deadline":"...","department":"...","estimatedHours":"..."}],
  "complianceItems": ["..."],
  "riskFactors": ["..."],
  "recommendations": ["..."],
  "categories": ["..."],
  "confidence": "percentage",
  "language": "English/Malayalam/Mixed",
  "documentType": "...",
  "urgencyLevel": "low|medium|high|critical"
}

Document Text:\n${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summaryText = response.text();

  try {
    const jsonMatch = summaryText.match(/```json\n?([\s\S]*?)```/) || summaryText.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[1] || jsonMatch[0] : summaryText;
    return JSON.parse(jsonText);
  } catch {
    return {
      executiveSummary: summaryText.substring(0, 300) + '...',
      keyPoints: [],
      actionItems: [],
      complianceItems: [],
      riskFactors: [],
      recommendations: [],
      categories: ['General'],
      confidence: '85',
      language: 'English',
      documentType: 'General Document',
      urgencyLevel: 'medium',
    };
  }
}

export async function summarizeFile(filePath, mimetype) {
  const text = await extractTextFromFile(filePath, mimetype);
  return generateSummary(text);
}

export async function summarizeText(text) {
  return generateSummary(text);
}
