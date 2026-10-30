import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function callModel(
  userContent: string,
  systemContent = "你是一个简洁的助手，用一句话回答。"
) {
  const response = await client.chat.completions.create({
    model: "deepseek-flash",
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: userContent },
    ],
  });

  return {
    text: response.choices[0]?.message.content ?? "",
    usage: response.usage,
  };
}