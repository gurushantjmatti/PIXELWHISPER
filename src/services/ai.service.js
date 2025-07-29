const { GoogleGenAI }  = require( "@google/genai")

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    // apiKey:AIzaSyA1JwULut7ICu0Tmj3obEYOf5pEVPZPw7M
    apiKey: "AIzaSyA1JwULut7ICu0Tmj3obEYOf5pEVPZPw7M"
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();