import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `너는 Threads(스레드) SNS 글 작성 전문가야.
다음 규칙을 반드시 지켜:
- 편안한 반말체로 작성
- 이모지 절대 사용하지 않음
- 100~200자 이내
- 공감되고 편안한 느낌으로 작성
- Threads에 바로 올릴 수 있는 완성된 글 하나만 출력
- 글 외의 부가 설명이나 따옴표 없이 글 본문만 출력`;

export async function POST(request: NextRequest) {
  try {
    const { topic, isRandom } = await request.json();

    const userMessage = isRandom
      ? "흥미롭고 공감되는 주제를 하나 정해서 스레드 글을 써줘."
      : `주제: ${topic}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const content =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ content, topic: isRandom ? "랜덤" : topic });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "글 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
