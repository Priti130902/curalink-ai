const axios = require('axios');

const generateLLMResponse = async (data, query, patient, disease) => {
  try {
    const shortPrompt = `Patient: ${patient}, Condition: ${disease}. Question: ${query}. 
    Data: ${JSON.stringify(data.slice(0, 3))}. 
    Instruction: Provide 3-4 professional bullet points based ONLY on data. Be very brief for speed.`;
    
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "tinydolphin", 
      prompt: shortPrompt,
      stream: false,
      options: { num_predict: 200, temperature: 0.3 }
    }, { timeout: 45000 });
    return response.data.response;
  } catch (err) {
    return "The reasoning engine is processing the data locally.";
  }
};

module.exports = { generateLLMResponse };