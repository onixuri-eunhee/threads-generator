import GeneratorForm from "@/components/GeneratorForm";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1>스레드 글 생성기</h1>
        <p className="subtitle">
          주제를 입력하면 Threads에 올릴 글을 만들어줄게. 랜덤도 돼!
        </p>
      </header>
      <GeneratorForm />
    </main>
  );
}
