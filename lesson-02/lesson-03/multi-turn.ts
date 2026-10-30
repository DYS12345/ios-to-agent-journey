import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { callModel } from "../model";

async function main() {
  const rl = readline.createInterface({ input, output });

  const messages: any[] = [
    { role: "system", content: "你是一个简洁的助手，用一句话回答。" },
  ];

  console.log("多轮对话开始，输入 exit 退出。\n");

  while (true) {
    const userInput = await rl.question("你：");
    if (userInput.trim().toLowerCase() === "exit") break;

    messages.push({ role: "user", content: userInput });

    const { message, usage } = await callModel(messages);

    // 关键：把模型的回复追加回历史
    messages.push(message);

    console.log(`模型：${message.content}`);
    console.log(`[本轮 prompt_tokens: ${usage?.prompt_tokens}, completion_tokens: ${usage?.completion_tokens}]\n`);
  }

  rl.close();
}

main().catch(console.error);