#!/usr/bin/env node

// Test script to verify backend setup
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing Documind AI Backend...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    if (healthResponse.ok) {
      const health = await healthResponse.json();
      console.log('✅ Health check passed:', health.status);
    } else {
      console.log('❌ Health check failed');
      return;
    }

    // Test AI health
    console.log('\n2. Testing AI service...');
    const aiHealthResponse = await fetch(`${API_BASE_URL}/api/ai/health`);
    if (aiHealthResponse.ok) {
      const aiHealth = await aiHealthResponse.json();
      console.log('✅ AI service:', aiHealth.status);
    } else {
      console.log('⚠️  AI service check failed (API key needed)');
    }

    // Test task stats
    console.log('\n3. Testing task service...');
    const taskStatsResponse = await fetch(`${API_BASE_URL}/api/tasks/stats/summary`);
    if (taskStatsResponse.ok) {
      const stats = await taskStatsResponse.json();
      console.log('✅ Task service active, total tasks:', stats.total);
    } else {
      console.log('❌ Task service failed');
    }

    console.log('\n🎉 Backend is ready!');
    console.log('\nNext steps:');
    console.log('1. Add your Gemini API key to backend/.env');
    console.log('2. Start frontend: npm run dev');
    console.log('3. Visit: http://localhost:5173');

  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('\nMake sure to start the backend first:');
    console.log('npm run backend:dev');
  }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  testBackend();
}

export default testBackend;
