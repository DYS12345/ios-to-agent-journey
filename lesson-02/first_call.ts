import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

async function main(): Promise<void> {
  const completion = await client.chat.completions.create({
    model: "deepseek-v4-pro",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "用一句话介绍一下你自己。" },
    ],
  });

  console.log(completion.choices[0]?.message.content);
}

main().catch((error) => {
  console.error("调用失败:", error);
  process.exit(1);
});
