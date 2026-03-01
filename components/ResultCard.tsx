"use client";

import { useState } from "react";

interface ResultCardProps {
  content: string;
  topic: string;
}

export default function ResultCard({ content, topic }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-topic">{topic}</span>
        <span className="result-length">{content.length}자</span>
      </div>
      <p className="result-content">{content}</p>
      <button className="copy-button" onClick={handleCopy}>
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}
