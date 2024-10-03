const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

app.post('/api/generate-quiz', async (req, res) => {
  const { topic, difficulty, numberOfQuestions } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',  // Change to an available model
      messages: [
        { role: 'system', content: `You are a quiz maker for ${topic} at ${difficulty} level.` },
        { role: 'user', content: `Create ${numberOfQuestions} quiz questions.` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const quizQuestions = response.data.choices[0].message.content;
    res.json({ quiz: quizQuestions });

  } catch (error) {
    console.error('Error generating quiz:', error.response ? error.response.data : error.message);
    res.status(500).send('Error generating quiz');
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
