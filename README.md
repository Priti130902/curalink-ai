 CuraLink Studio - AI Medical Research Assistant
CuraLink Studio is a high-performance, private, and localized medical research tool built for the Humanity Founders Hackathon. It synthesizes real-time clinical data from PubMed and ClinicalTrials.gov using a local LLM to provide instant, actionable insights while ensuring 100% data privacy.

 Key Features
Neural Synthesis Engine: Uses local LLM (TinyDolphin via Ollama) to summarize complex clinical papers.

Parallel Retrieval: Simultaneously fetches data from multiple medical APIs for sub-20 second response times.

Longitudinal Memory: Built-in MongoDB persistence to track patient research history and multi-turn clinical context.

Privacy First: All medical queries are processed locally; sensitive data never leaves the machine.

Responsive Studio UI: A futuristic, glassmorphic workspace designed for both desktop and mobile research.

 Tech Stack
Frontend: React.js, Tailwind CSS, Lucide-React (Icons), Framer Motion.

Backend: Node.js, Express.js.

Database: MongoDB (MERN Stack).

AI Inference: Ollama (Model: tinydolphin).

DevOps: Docker Compose for rapid DB deployment.

 Installation & Setup
1. Prerequisites
Install Node.js

Install Ollama and run:

Bash
ollama pull tinydolphin
Install Docker (Optional, for MongoDB).

2. Backend Setup
Bash
cd curalink-backend
npm install
# Start MongoDB via Docker or local service
docker-compose up -d 
node server.js
3. Frontend Setup
Bash
cd frontend
npm install
npm start
 Modular Architecture
The project follows a clean, industrial-standard folder structure:

models/: MongoDB Schemas.

controllers/: Request handling logic.

services/: External API (PubMed) and LLM (Ollama) integrations.

routes/: API endpoint definitions.
