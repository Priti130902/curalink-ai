const axios = require('axios');

const generateLLMResponse = async (data, query, patient, disease) => {
  try {
    // Note: process.env.GROQ_API_KEY ko Render ke settings mein dalna hoga
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional medical research assistant. Use the provided data to answer the query briefly."
        },
        {
          role: "user",
          content: `Patient: ${patient}, Condition: ${disease}. Question: ${query}. Data: ${JSON.stringify(data.slice(0, 3))}`
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("AI Error:", err);
    return "The AI engine is currently busy, but your research data is ready below.";
  }
};

module.exports = { generateLLMResponse };