require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('API Key prefix:', process.env.GEMINI_API_KEY?.substring(0, 12) + '...');

async function test() {
  try {
    const model  = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent('Halo, siapa kamu?');
    console.log('✅ SUCCESS:', result.response.text().substring(0, 150));
  } catch (e) {
    console.error('❌ ERROR:', e.message);
  }
}

test();
