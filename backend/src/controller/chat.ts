import { Request, Response } from "express";
import { gemini, MessageType, ModelType } from "..";
import { getSystemPrompt } from "../prompts";

export const chat = async (req: Request, res: Response) => {
  const messages: MessageType = req.body.messages;
  const mltiChats = gemini.chats.create({
    model: process.env.GEMINI_MODEL as ModelType,
    history: [
      {
        role: "user",
        parts: [{ text: messages[0].content }],
      },
      {
        role: "user",
        parts: [{ text: messages[0].content }],
      },
    ],
  });

  const response = await mltiChats.sendMessage({
    message: messages[messages.length - 1].content,
    config: {
      systemInstruction: getSystemPrompt(),
      responseMimeType: "application/json",
    },
  });

  if (!response) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, LLM is not responding",
    });
    return;
  }

  if (!response.text) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, LLM is not responding",
    });
    return;
  }

  const strResponse = response.text;
  console.log(strResponse);

  res.json({
    success: true,
    response: JSON.parse(strResponse),
  });
  return;
};
