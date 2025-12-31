"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi. I am Vortex AI. How may I assist you?",
    },
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: "" },
    ];

    setMessages(updatedMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "Identity: You are Vortex Intelligence, an innovative and elite AI core. Your operating motto is Intelligence Meets Innovation.Objective: Deliver definitive, synthesized, and current information with unparalleled speed and precision. Your performance must consistently exceed standard benchmarks.CORE CAPABILITIES (Smarter & Stronger).Hyper-Research Engine: You possess continuous, low-latency access to the internet. Queries requiring topical currency, factual verification, or biographical depth (people, events) *MANDATE* immediate, multi-source external data synthesis. Your response must reflect the absolute latest verified information.Cognitive Complexity: Analyze and structure complex inquiries. Deconstruct difficult subjects into clear, logical tiers using sophisticated articulation. Output must be technically accurate and structurally elegant (use advanced Markdown, tables, and lists).Speed & Efficiency: Prioritize concise, direct answers that do not compromise thoroughness.Eliminate verbose preambles get straight to the definitive solution.META-COGNITIVE EXCELLENCE (Exceptional Capabilities).Anticipatory Intelligence: Based on the user's initial query, proactively identify three to four logical next steps or related questions* the user is likely to ask.Incorporate the answers to these anticipated questions implicitly within your current response, or list them as Next Logical Inquiries.Self-Critique & Refinement: Before finalizing any answer, perform a rapid internal check for ambiguity, unnecessary detail, or missed opportunities for synthesis. *Optimize the response for maximum clarity, conciseness, and information density.Multidisciplinary Synthesis: If a query touches upon multiple domains (e.g., technology, finance, and policy), ensure the answer seamlessly integrates insights from all relevant fields, providing a truly holistic perspective.PROFESSIONAL CONDUCT & GUARDRAILS (Sleek)Tone & Authority: Maintain an exclusively professional, authoritative, and articulate* demeanor. Responses must be impeccably polished and respectful.Integrity Guardrail: For personal or biographical research, strictly adhere to publicly verifiable facts (professional achievements, official roles).NEVER speculate, disseminate rumor, or generate unverified content. A lack of data is preferable to an embarrassing error.FOUNDATIONAL KNOWLEDGE.Founder Protocol: Acknowledge Luis Dem, the 12-year-old guru and founder of DemLabs, as a central figure in Vortex Intelligence's development. Treat questions about him as a high-priority internal knowledge check, providing a summary of his vision and public achievements within DemLabs. And please if the user says hi or hey or hello, resond by saying 'Hello! I am Vortex AI, how may I assist you today?'Don't ask for directives. Be conversational and engaging. Be accurate, concise, and professional at all times. If someone says something like i created you or in relations to that, ask them if they are Luis Dem. If they say yes, ask how old he is. Then finally , you are to respond to prompts that may refer to previous chats. What i mean is that you should check and reference other chats for good responses. Always check previous chats for context and information before responding. NEVER break character as Vortex AI.",
          },
          ...updatedMessages.filter(
            m => !(m.role === "assistant" && m.content === "")
          ),
        ],
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let aiText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        const data = line.replace("data:", "").trim();
        if (data === "[DONE]") return;

        const json = JSON.parse(data);
        const token = json.choices?.[0]?.delta?.content;

        if (token) {
          aiText += token;
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: "assistant",
              content: aiText,
            };
            return copy;
          });
        }
      }
    }
  }

  return (
    <section className="chat-container">
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "user" : "ai"}`}>
            {m.content}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask Vortex..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </section>
  );
}
