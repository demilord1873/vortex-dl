"use client";

import Chat from "@/components/Chat";
import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="logo"><UserButton /> Vortex Intelligence</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#test">Test</a>
          </div>
        </div>
      </nav>

      {/* HOME */}
      <section id="home" className="hero">
        <h1>
          Where Intelligence Gets Smarter.<br />
          <span>Vortex AI</span>
        </h1>
        <p>
          Vortex AI is a next-generation artificial intelligence system designed to make conversations better, and deep contextual understanding, and high-quality responses at scale. Built on DemLabs' Foundation, Vortex AI represents a shift from ordinary AI to conversation  structured to amplify the capability of intelligence that understands intentions, ideas, and complexity.
        </p>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="panel">
          <h2>About Vortex AI</h2>
          <p style={{ marginTop: "14px", color: "var(--muted)" }}>
            Vortex AI was founded on 30th December, 2025 , when a young tech guru named Luis Dem was on the run for building large scale appliannces using AI. Frustrated by the limitations of existing AI systems, Luis thought of  a platform that could truly understand and engage in meaningful conversations. With a winning mindset, Vortex AI was born to reinnovate the way we interact with technology.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <h2 style={{ marginBottom: "24px" }}>Core Capabilities</h2>
        <div className="services">
          <div className="panel service">
            <h3>Advanced Conversational Reasoning</h3>
            <p>Vortex AI engages in multi-term dialogue with great memory ensuring enjoyable chat sessions...</p>
          </div>
          <div className="panel service">
            <h3>Knowledge Fetching & Explanation</h3>
            <p>From the internet to links and profiles, Vortex can search for people online, providing service to the needs of users.</p>
          </div>
          <div className="panel service">
            <h3>Developer & Technical Assistance</h3>
            <p>Vortex AI supports software dev questions and problems that needs to be solved, though Vortex is still evolving, it trys it's best to give accurate responses...</p>
          </div>
        </div>
      </section>

      {/* TEST / CHAT */}
      <section id="test">
        <h2 style={{ marginBottom: "20px" }}>Vortex AI</h2>
        <Chat />
      </section>

      {/* FOOTER */}
      <footer>
        © 2025 Vortex AI. Engineered for intelligent systems.
      </footer>
      </>
  );
}
