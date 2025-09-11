# Documind AI - KMRL Integration Setup

This project has been enhanced with **Google Gemini AI integration** for document summarization and automatic task creation.

## 🚀 New Features

- **AI-Powered Document Summarization**: Uses Google Gemini to analyze documents and extract key insights
- **Automatic Task Creation**: Converts action items from AI analysis into actionable tasks
- **KMRL-Specific Context**: Tailored analysis for Kochi Metro Rail Limited operations
- **Real-time Processing**: Live document analysis with immediate task generation

## 📁 Project Structure

```
documind-ai-kmrl/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── AISummarizationPanel.tsx
│   │   ├── hooks/
│   │   │   └── useAISummarization.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── aiService.js
│   │   │   └── taskService.js
│   │   └── pages/
│   │       └── EnhancedDocumentViewer.tsx
└── backend/                  # Node.js + Express backend
    ├── server.js
    ├── routes/
    │   ├── ai.js            # Gemini AI integration
    │   ├── tasks.js         # Task management
    │   └── documents.js     # Document handling
    └── uploads/             # File upload directory
```

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run backend:install

# Or install everything at once
npm run setup
```

### 2. Configure Environment

1. **Get Google Gemini API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

2. **Configure Backend Environment**:
   ```bash
   cd backend
   cp .env.example .env
   ```

3. **Update `.env` file**:
   ```env
   NODE_ENV=development
   PORT=3001
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   FRONTEND_URL=http://localhost:5173
   ```

### 3. Start the Application

```bash
# Start both frontend and backend
npm run dev:all

# Or start them separately
npm run backend:dev    # Backend on http://localhost:3001
npm run dev           # Frontend on http://localhost:5173
```

## 🧠 AI Features Usage

### Document Summarization

1. **Navigate to Documents page**
2. **Open any document** in the enhanced viewer
3. **Click "AI Analysis"** button to enable the AI panel
4. **Click "Analyze with AI"** to process the document
5. **View results** including:
   - Executive summary
   - Key points extraction
   - Automatically created tasks
   - Risk assessment
   - Compliance requirements

### Manual Text Analysis

1. **Use the AI Summarization Panel**
2. **Choose "Text Input"** tab
3. **Paste your content**
4. **Click "Analyze with AI"**
5. **Tasks are automatically created** from action items

### File Upload Analysis

1. **Choose "File Upload"** tab
2. **Upload PDF, Word, Excel, or text files**
3. **Click "Process Document"**
4. **AI extracts text and analyzes content**
5. **Tasks are generated automatically**

## 🔧 API Endpoints

### AI Service (`/api/ai/`)
- `POST /summarize` - Analyze uploaded documents
- `POST /analyze-text` - Analyze raw text content
- `GET /health` - Check AI service status

### Tasks Service (`/api/tasks/`)
- `GET /` - List all tasks with filtering
- `POST /` - Create new task
- `POST /batch` - Create multiple tasks from action items
- `PUT /:id` - Update task
- `PATCH /:id/status` - Update task status
- `DELETE /:id` - Delete task

### Documents Service (`/api/documents/`)
- `GET /` - List documents
- `POST /upload` - Upload new document
- `POST /:id/process` - Process document with AI
- `GET /:id` - Get document details

## 🎯 KMRL-Specific Features

The AI is configured with KMRL context to focus on:
- **Passenger Safety** protocols and requirements
- **Operational Efficiency** improvements
- **Compliance Requirements** (MRSS 2024, Fire Safety, etc.)
- **Maintenance Protocols** and schedules
- **Emergency Procedures** and response plans

## 🔒 Security Features

- **Rate limiting** on API endpoints
- **File type validation** for uploads
- **CORS protection** between frontend and backend
- **Error handling** and logging
- **Environment-based configuration**

## 📊 Task Management

Tasks created by AI include:
- **Priority levels** (critical, high, medium, low)
- **Department assignments**
- **Estimated completion times**
- **Deadline suggestions**
- **Risk assessments**

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev    # Starts with nodemon for hot reload
```

### Frontend Development
```bash
npm run dev    # Starts Vite dev server
```

### Environment Variables

Required environment variables:
- `GEMINI_API_KEY` - Your Google Gemini API key
- `PORT` - Backend server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## 📱 Usage Examples

### Example 1: Safety Document Analysis
1. Upload a safety protocol document
2. AI identifies compliance requirements
3. Tasks are created for training, equipment installation, etc.
4. Risk factors are highlighted

### Example 2: Maintenance Report Processing
1. Paste maintenance report text
2. AI extracts key maintenance items
3. Tasks are created with appropriate priorities
4. Deadlines are suggested based on content

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot find module 'react'"**
   - Run `npm install` to install dependencies

2. **Backend connection errors**
   - Ensure backend is running on port 3001
   - Check `.env` configuration

3. **Gemini API errors**
   - Verify your API key is correct
   - Check API key permissions
   - Ensure you have Gemini API access

4. **File upload issues**
   - Check file size limits (10MB default)
   - Verify supported file types

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and stack traces.

## 🎉 Next Steps

1. **Test AI Analysis**: Upload a sample document and analyze it
2. **Review Generated Tasks**: Check the automatically created tasks
3. **Customize Context**: Modify AI prompts for specific KMRL needs
4. **Add Database**: Replace in-memory storage with persistent database
5. **Deploy**: Set up production deployment with environment variables

The AI integration transforms the document management system into an intelligent assistant that not only organizes documents but actively helps with task management and operational insights!
