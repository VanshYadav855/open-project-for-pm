require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = 'claude-haiku-4-5-20251001';

async function callClaude(prompt, maxTokens = 1000) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: maxTokens,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.content[0].text;
}

// Endpoint for Outreach Composer
app.post('/api/outreach', async (req, res) => {
    try {
        const { name, role, recentActivity } = req.body;
        const prompt = `Write a short personalized LinkedIn connection message based on this profile. Keep it under 100 words, friendly and specific.
Profile:
- Name: ${name}
- Role: ${role}
- Recent Activity: ${recentActivity}`;

        const message = await callClaude(prompt);
        res.json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Profile Coach
app.post('/api/profile-coach', async (req, res) => {
    try {
        const { targetRole } = req.body;
        const prompt = `Give 4 specific profile gaps a person would need to fix to become a ${targetRole}. Format as a JSON array with fields: missing, fix. Only return JSON, no other text.`;

        const responseText = await callClaude(prompt);
        // Try to extract JSON
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        const gaps = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        res.json({ gaps });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Job Debrief
app.post('/api/job-debrief', async (req, res) => {
    try {
        const { jobDescription } = req.body;
        const prompt = `Analyze this job description and return 3 sections: strengths (what a typical applicant has), watch_out (common gaps), fix_now (most important thing to fix). Keep each under 30 words. Format as JSON with keys: strengths, watch_out, fix_now. Only return JSON, no other text.

Job Description:
${jobDescription}`;

        const responseText = await callClaude(prompt);
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const debrief = jsonMatch ? JSON.parse(jsonMatch[0]) : { strengths: '', watch_out: '', fix_now: '' };
        res.json({ debrief });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test the API at http://localhost:${PORT}/api/outreach`);
});

// Add a test endpoint
app.get('/', (req, res) => {
    res.json({ message: 'LinkedIn AI Backend is running!' });
});
