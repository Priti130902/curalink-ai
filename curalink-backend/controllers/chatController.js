const axios = require('axios');
const Chat = require('../models/Conversation'); 
const { generateLLMResponse } = require('../services/llmService');

exports.handleChat = async (req, res) => {
  const { query, disease, patientName, location } = req.body;
  const expandedQuery = `${query} AND ${disease}`.trim();

  try {
    const [pubmed, trials] = await Promise.all([
      axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${expandedQuery}&retmax=10&retmode=json`),
      axios.get(`https://clinicaltrials.gov/api/v2/studies?query.cond=${disease}&pageSize=10&format=json`)
    ]);

    const candidatePool = [
      ...(pubmed.data.esearchresult?.idlist || []).map(id => ({
        title: `PubMed Analysis: ID ${id}`, source: 'PubMed', url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
      })),
      ...(trials.data.studies || []).map(s => ({
        title: s.protocolSection.identificationModule.officialTitle || "Clinical Trial",
        source: 'ClinicalTrials.gov', url: `https://clinicaltrials.gov/study/${s.protocolSection.identificationModule.nctId}`
      }))
    ];

    const rankedResults = candidatePool.slice(0, 6);
    const answer = await generateLLMResponse(rankedResults, query, patientName, disease);

    // Database mein save karna
    await Chat.findOneAndUpdate(
      { patientName, disease },
      { $push: { history: { query, answer, sources: rankedResults } }, location },
      { upsert: true, new: true }
    );

    res.json({ answer, sources: rankedResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "System Busy" });
  }
};