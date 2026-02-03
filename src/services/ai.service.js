const { GoogleGenAI } = require("@google/genai")

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});
// apiKey:AIzaSyA1JwULut7ICu0Tmj3obEYOf5pEVPZPw7M
// apiKey: "AIzaSyA1JwULut7ICu0Tmj3obEYOf5pEVPZPw7M"


// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();


async function generateCaption(base64ImageFile) {

  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  // Generate content using the Gemini model
  // The model will generate a caption for the image provided.
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: `
  You are a Gen-Z social media caption writer.
  
  Generate ONE meaningful and catchy caption for the image.
  The caption must:
  - Express a clear emotion, idea, or mood (not just aesthetics)
  - Feel relatable and scroll-stopping
  - Sound natural, modern, and social-media native
  
  Style rules:
  - Short (1–2 lines max)
  - Casual, conversational tone
  - Not overly poetic or dramatic
  - No generic filler words (beautiful, stunning, amazing, etc.)
  
  Include:
  - 1–2 relevant emojis
  - 3–6 hashtags that match the message, not random trends
  
  The caption should feel Instagram/Reel-ready and human-written, not AI-generated.
  `
      }

    });
    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

module.exports = generateCaption;

