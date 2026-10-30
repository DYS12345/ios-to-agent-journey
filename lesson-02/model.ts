import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function callModel(
  messages: ChatCompletionMessageParam[]
) {
  const response = await client.chat.completions.create({
    model: "deepseek-flash",
    messages,
  });

  const message = response.choices[0].message;

  return {
    message,                       // 完整的 assistant 消息，后面要追加回数组
    text: message.content ?? "",
    usage: response.usage,
  };
}