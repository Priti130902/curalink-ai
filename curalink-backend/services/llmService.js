const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_TOKEN);

const generateLLMResponse = async (data, query, patient, disease) => {
  try {
    const prompt = `
Patient: ${patient}
Disease: ${disease}
Question: ${query}

Research Data:
${JSON.stringify(data.slice(0, 3))}

Give 3-4 short professional bullet points based ONLY on this data.
`;

    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.3
      }
    });

    return result.generated_text;

  } catch (err) {
    console.error("LLM Error:", err.message);
    return "AI response unavailable";
  }
};

module.exports = { generateLLMResponse };