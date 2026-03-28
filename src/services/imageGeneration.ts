import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateHeroImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A stunning, high-resolution hero image for a wedding invitation. Elegant white and gold theme, cinematic lighting, professional photography, 4k resolution, showing a beautiful wedding venue or a romantic abstract wedding scene.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}

export async function generateCoupleImage() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A stunning, high-resolution photo of a romantic couple for a wedding invitation. Elegant white and gold theme, professional photography, 4k resolution, cinematic lighting.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4",
        imageSize: "1K"
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
