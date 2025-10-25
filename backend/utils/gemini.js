// const fetch = require("node-fetch"); // npm install node-fetch@2
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// /**
//  * Call Gemini API with a question
//  * @param {string} question
//  * @returns {string} answer
//  */
// async function callGemini(question) {
//   try {
//     const promptText = `
// You are a math tutor. Solve problems in clear numbered steps, showing all intermediate calculations. End with "Final Answer: <answer>".

// Question: ${question}
// `;

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: promptText }] }]
//         })
//       }
//     );

//     const data = await response.json();

//     if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
//       return data.candidates[0].content.parts[0].text;
//     } else {
//       console.error("Gemini response:", data);
//       return "No valid response from Gemini.";
//     }
//   } catch (err) {
//     console.error("Gemini API error:", err);
//     return "Error fetching from Gemini API";
//   }
// }

// /**
//  * Generate quiz with N questions
//  */
// async function generateQuiz(topic, numQuestions = 5) {
//   const questions = [];
//   for (let i = 1; i <= numQuestions; i++) {
//     const qText = `Question ${i} on topic "${topic}"`;
//     const answer = await callGemini(qText);

//     questions.push({
//       _id: `${i}`,
//       question: qText,
//       options: ["A", "B", "C", "D"], // placeholder
//       answer
//     });
//   }
//   return questions;
// }

// /**
//  * Retry quiz with N questions
//  */
// async function generateRetryQuiz(numQuestions = 5) {
//   const questions = [];
//   for (let i = 1; i <= numQuestions; i++) {
//     const qText = `Retry question ${i}`;
//     const answer = await callGemini(qText);

//     questions.push({
//       _id: `${i}`,
//       question: qText,
//       options: ["A", "B", "C", "D"], // placeholder
//       answer
//     });
//   }
//   return questions;
// }

// module.exports = { callGemini, generateQuiz, generateRetryQuiz };


import fetch from "node-fetch"; // If using ES modules
import dotenv from "dotenv";
dotenv.config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

// --------------------------------------------------
// Function: callCohere
// Description: Sends a math question or prompt to Cohere’s API
// --------------------------------------------------
export async function callCohere(question) {
  try {
    const promptText = `
You are a math tutor. Solve problems step by step in detail.
Show all calculations clearly.
End your response with "Final Answer: <answer>".

Question: ${question}
`;

    const response = await fetch("https://api.cohere.ai/v2/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r-08-2024", // ✅ Works for free & trial keys
        messages: [
          {
            role: "user",
            content: promptText,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // ✅ Extract model’s text safely
    if (data?.message?.content?.[0]?.text) {
      return data.message.content[0].text.trim();
    } else {
      console.error("Cohere API returned unexpected response:", data);
      return "⚠️ No valid response from Cohere API.";
    }
  } catch (err) {
    console.error("❌ Cohere API Error:", err);
    return "Error fetching response from Cohere Chat API.";
  }
}


