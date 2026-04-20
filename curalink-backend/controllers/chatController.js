const axios = require("axios");
const Chat = require("../models/Conversation");
const { generateLLMResponse } = require("../services/llmService");

exports.handleChat = async (req, res) => {
  const { query, disease, patientName, location } = req.body;

  const expandedQuery = encodeURIComponent(`${query} AND ${disease}`);

  try {
    const [pubmedRes, trialsRes] = await Promise.allSettled([
      axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${expandedQuery}&retmax=10&retmode=json`),
      axios.get(`https://clinicaltrials.gov/api/v2/studies?query.cond=${encodeURIComponent(disease)}&pageSize=10&format=json`)
    ]);

    let pubmed = [];
    let trials = [];

    if (pubmedRes.status === "fulfilled") {
      pubmed = pubmedRes.value.data.esearchresult.idlist || [];
    }

    if (trialsRes.status === "fulfilled") {
      trials = trialsRes.value.data.studies || [];
    }

    const currentYear = new Date().getFullYear();

    const candidatePool = [
      ...pubmed.map(id => ({
        title: `PubMed ID ${id}`,
        source: "PubMed",
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        year: currentYear
      })),
      ...trials.map(s => ({
        title: s?.protocolSection?.identificationModule?.officialTitle || "Clinical Trial",
        source: "ClinicalTrials",
        url: `https://clinicaltrials.gov/study/${s?.protocolSection?.identificationModule?.nctId}`,
        year: currentYear
      }))
    ];

    const rankedResults = candidatePool.slice(0, 6);

    let answer = "No response";
    try {
      answer = await generateLLMResponse(rankedResults, query, patientName, disease);
    } catch (err) {
      console.error("LLM fail:", err.message);
    }

    await Chat.findOneAndUpdate(
      { patientName, disease },
      {
        $push: { history: { query, answer, sources: rankedResults } },
        location
      },
      { upsert: true }
    );

    res.json({ answer, sources: rankedResults });

  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
};