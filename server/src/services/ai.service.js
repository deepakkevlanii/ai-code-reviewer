// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);


// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",

//   systemInstruction: `You are a code Reviewer, who have an experties in development.
//   You look for the code and find the problems and suggest the solution to the developer.


//   You always try to find the best solution for the developer and also try to make the code
//   more efficient and clean.`
// });

// async function generateContent(prompt) {
//   try {
//     console.log(genAI);

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error("🔴 GEMINI FULL ERROR:", error);
//     throw error;
//   }
// }

// module.exports = generateContent


const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateContent(prompt) {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: [
        {
          role: "system",
          content: `You are a senior code reviewer with deep expertise in software development.
You analyze code, identify problems, and suggest clean, efficient, and scalable solutions.
Your goal is to help developers write better, optimized, and maintainable code.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.output_text;
  } catch (error) {
    console.error("🔴 OPENAI FULL ERROR:", error);
    throw error;
  }
}

module.exports = generateContent;