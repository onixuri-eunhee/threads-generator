"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";

export default function GeneratorForm() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<{
    content: string;
    topic: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async (isRandom: boolean) => {
    if (!isRandom && !topic.trim()) {
      setError("주제를 입력해줘.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), isRandom }),
      });

      if (!res.ok) throw new Error("생성 실패");

      const data = await res.json();
      setResult(data);
    } catch {
      setError("글 생성에 실패했어. 다시 시도해줘.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator">
      <div className="input-group">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate(false)}
          placeholder="주제를 입력해봐 (예: 월요일 아침, 자기계발, 커피)"
          disabled={loading}
        />
        <div className="button-group">
          <button
            className="btn-generate"
            onClick={() => generate(false)}
            disabled={loading}
          >
            {loading ? "생성 중..." : "생성"}
          </button>
          <button
            className="btn-random"
            onClick={() => generate(true)}
            disabled={loading}
          >
            랜덤
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <p>글을 쓰고 있어...</p>
        </div>
      )}

      {result && <ResultCard content={result.content} topic={result.topic} />}
    </div>
  );
}
