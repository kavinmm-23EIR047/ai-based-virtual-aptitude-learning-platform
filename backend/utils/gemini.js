const fetch = require("node-fetch"); // npm install node-fetch@2
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Call Gemini API with a question
 * @param {string} question
 * @returns {string} answer
 */
async function callGemini(question) {
  try {
    const promptText = `
You are a math tutor. Solve problems in clear numbered steps, showing all intermediate calculations. End with "Final Answer: <answer>".

Question: ${question}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      }
    );

    const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini response:", data);
      return "No valid response from Gemini.";
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Error fetching from Gemini API";
  }
}

/**
 * Generate quiz with N questions
 */
async function generateQuiz(topic, numQuestions = 5) {
  const questions = [];
  for (let i = 1; i <= numQuestions; i++) {
    const qText = `Question ${i} on topic "${topic}"`;
    const answer = await callGemini(qText);

    questions.push({
      _id: `${i}`,
      question: qText,
      options: ["A", "B", "C", "D"], // placeholder
      answer
    });
  }
  return questions;
}

/**
 * Retry quiz with N questions
 */
async function generateRetryQuiz(numQuestions = 5) {
  const questions = [];
  for (let i = 1; i <= numQuestions; i++) {
    const qText = `Retry question ${i}`;
    const answer = await callGemini(qText);

    questions.push({
      _id: `${i}`,
      question: qText,
      options: ["A", "B", "C", "D"], // placeholder
      answer
    });
  }
  return questions;
}

module.exports = { callGemini, generateQuiz, generateRetryQuiz };


