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


async function generateCaption(base64ImageFile)
 {

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
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,

    config:{
      systemInstruction:`
      you are expert in generating captions for images.
      you generate single caption for the image.
      your caption should be short and concise.
      you use hashtags and emojis in the caption.
      `
    }
  });
  return response.text
}

module.exports = generateCaption;

