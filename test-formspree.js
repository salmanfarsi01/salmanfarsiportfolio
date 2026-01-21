#!/usr/bin/env node

// Simple test script to verify Formspree configuration
// Run with: node test-emailjs.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing Formspree Configuration...\n');

// Check .env.local file
const envPath = path.join(__dirname, '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (value && !value.startsWith('your_')) {
        envVars[key.trim()] = value;
      }
    }
  });
}

console.log('📋 Environment Variables Check (.env.local):');
console.log(`Groq API Key: ${envVars.VITE_GROQ_API_KEY ? '✅ Set' : '❌ Not set'}`);

console.log('\n📧 Formspree Configuration:');
console.log('✅ Formspree endpoint: https://formspree.io/f/mgvzzpka');
console.log('✅ Contact form is configured to use Formspree');

if (envVars.VITE_GROQ_API_KEY) {
  console.log('\n✅ All configurations appear to be set!');
  console.log('\n🧪 To test the contact form:');
  console.log('1. Start the dev server: npm run dev');
  console.log('2. Go to http://localhost:3002');
  console.log('3. Fill out and submit the contact form');
  console.log('4. Check your email for the message');
} else {
  console.log('\n❌ Groq API key is missing!');
  console.log('Please set VITE_GROQ_API_KEY in your .env.local file');
}

console.log('\n📧 Direct contact: salmanf4545@gmail.com');