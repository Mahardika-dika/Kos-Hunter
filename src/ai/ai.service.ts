import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { DescriptionPrompt } from './prompt/description-genai.prompt';

@Injectable()
export class AiService {
  private AI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  async generateDescription(data: any) {
    const prompt = DescriptionPrompt(data);

    const res = await this.AI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return res.text!;
  }
}
