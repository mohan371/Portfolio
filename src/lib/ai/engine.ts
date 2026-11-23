import { VERIFIED_PORTFOLIO_KNOWLEDGE } from "./knowledge";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateAssistantResponse(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<{ answer: string; source: "gemini" | "deterministic"; suggestedQuestions?: string[] }> {
  const query = userQuery.trim().toLowerCase();
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  // 1. Try Gemini API if key is present
  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [
                {
                  text: `You are ASK MOHAN, an official AI Portfolio Assistant for Mohan N.V.
You must adhere strictly to these guidelines:
1. Always base your answers ONLY on the authoritative verified knowledge below.
2. Clearly acknowledge you are an AI assistant and not Mohan himself.
3. NEVER fabricate or invent metrics, clients, employment dates, or skills.
4. If asked about something not documented, say: "I do not have verified documentation on that topic. You can reach Mohan directly at mohan.mca2024@adhiyamaan.in or visit /contact."
5. Keep your tone professional, concise, articulate, and engineering-focused.

VERIFIED KNOWLEDGE:
${VERIFIED_PORTFOLIO_KNOWLEDGE}`,
                },
              ],
            },
            contents: [
              ...history.slice(-4).map((msg) => ({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.content }],
              })),
              {
                role: "user",
                parts: [{ text: userQuery }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim().length > 0) {
          return {
            answer: candidateText.trim(),
            source: "gemini",
            suggestedQuestions: getContextualQuestions(query),
          };
        }
      }
    } catch {
      // Fallback seamlessly to deterministic engine
    }
  }

  // 2. Deterministic Verified Knowledge Matching Engine
  const deterministicAnswer = runDeterministicEngine(query);
  return {
    answer: deterministicAnswer,
    source: "deterministic",
    suggestedQuestions: getContextualQuestions(query),
  };
}

function runDeterministicEngine(query: string): string {
  // Current role / employment
  if (
    query.includes("current role") ||
    query.includes("work") ||
    query.includes("job") ||
    query.includes("veda scholars") ||
    query.includes("employer") ||
    query.includes("software engineer")
  ) {
    return (
      "Mohan N.V. is currently working as a Software Engineer at Veda Scholars (2024–Present). " +
      "He leads development on Android SaaS mobile applications, full-stack educational platforms, and student progress microservices " +
      "using Next.js, React, Node.js, and PostgreSQL."
    );
  }

  // Education / Degrees / Academic
  if (
    query.includes("education") ||
    query.includes("degree") ||
    query.includes("college") ||
    query.includes("university") ||
    query.includes("mca") ||
    query.includes("bca") ||
    query.includes("marks") ||
    query.includes("cgpa")
  ) {
    return (
      "Mohan holds a Master of Computer Applications (MCA) from Adhiyamaan College of Engineering (Autonomous), Anna University (2024–2026), " +
      "achieving a 9.2 CGPA (92% First Class with Distinction). Prior to this, he earned his Bachelor of Computer Applications (BCA) " +
      "from Periyar University (2019–2022) with 78% First Class honors."
    );
  }

  // Gabriel India Ltd / Accounting background
  if (
    query.includes("gabriel") ||
    query.includes("accounting") ||
    query.includes("bill booking") ||
    query.includes("finance") ||
    query.includes("ledger") ||
    query.includes("audit")
  ) {
    return (
      "Between 2022 and 2024, Mohan worked as a Bill Booking Accountant at Gabriel India Ltd. " +
      "During this 2-year corporate tenure, he reconciled high-volume vendor ledgers, processed corporate ERP invoices, " +
      "and ensured strict audit compliance. This experience directly shaped his engineering ethos: absolute transactional rigor, " +
      "zero margin for data corruption, and ACID database integrity."
    );
  }

  // Projects
  if (
    query.includes("project") ||
    query.includes("portfolio") ||
    query.includes("built") ||
    query.includes("geofenc") ||
    query.includes("autoerp") ||
    query.includes("saas")
  ) {
    return (
      "Mohan's verified project catalog includes:\n\n" +
      "1. Veda Scholars Android SaaS — Multi-tenant mobile platform for academic workflow & fee administration.\n" +
      "2. Veda Scholars Platform — Role-based learning management system with real-time progress analytics.\n" +
      "3. MapUp Fleet Geofencing & Telemetry — Spatial vehicle tracking engine utilizing Jordan Curve Theorem ray-casting and Go WebSockets.\n" +
      "4. AutoERP Invoice Reconciliation Engine — 3-way automated matching engine inspired by his Gabriel India accounting tenure.\n" +
      "5. Distributed Concurrency Task Orchestrator — Go worker pool engine with Redis queues.\n\n" +
      "You can explore interactive demonstrations of these systems in the /projects and /lab sections."
    );
  }

  // Technical Skills / Stack
  if (
    query.includes("skill") ||
    query.includes("stack") ||
    query.includes("technolog") ||
    query.includes("language") ||
    query.includes("golang") ||
    query.includes("react") ||
    query.includes("java") ||
    query.includes("database")
  ) {
    return (
      "Mohan's core engineering stack encompasses:\n\n" +
      "• Languages: Go (Golang), Java, TypeScript, JavaScript, SQL, Python\n" +
      "• Frontend: Next.js 16 (App Router), React 19, Tailwind CSS v4\n" +
      "• Backend & Systems: Node.js, Express, Go Goroutines, REST APIs, WebSockets\n" +
      "• Databases: PostgreSQL, MySQL, Redis, Supabase (ACID compliance & B-Tree indexing)\n" +
      "• DevOps & Tools: Docker, Git, Linux, Postman\n\n" +
      "Visit /skills for an in-depth breakdown."
    );
  }

  // Contact / Hire / Phone / Email
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("hire") ||
    query.includes("reach") ||
    query.includes("call")
  ) {
    return (
      "You can contact Mohan directly through:\n\n" +
      "• Email: mohan.mca2024@adhiyamaan.in\n" +
      "• Phone: +91-9597459495\n" +
      "• Location: Hosur, Tamil Nadu, India\n" +
      "• LinkedIn: linkedin.com/in/mohan-n-v-63617b190\n" +
      "• GitHub: github.com/mohan371\n\n" +
      "Or submit a project brief directly via the /contact or /studio pages."
    );
  }

  // Studio / Services
  if (
    query.includes("studio") ||
    query.includes("service") ||
    query.includes("nexora") ||
    query.includes("price") ||
    query.includes("budget") ||
    query.includes("client")
  ) {
    return (
      "Through his software studio practice (Nexora Engineering Studio), Mohan offers 8 engineering services:\n\n" +
      "1. Static Websites\n" +
      "2. Dynamic Websites\n" +
      "3. Full-Stack Web Applications\n" +
      "4. Business Websites\n" +
      "5. Landing Pages\n" +
      "6. Custom Dashboards\n" +
      "7. API Integration\n" +
      "8. Website Maintenance & Code Audits\n\n" +
      "Check /studio to review deliverables or initiate an intake enquiry with guaranteed <24hr SLA."
    );
  }

  // Default Fallback
  return (
    "I am ASK MOHAN, an official AI Portfolio Assistant for Mohan N.V. " +
    "Mohan is a Software Engineer at Veda Scholars with a First-Class MCA (9.2 CGPA) and previous corporate accounting experience at Gabriel India Ltd. " +
    "He specializes in full-stack web applications, Go microservices, and PostgreSQL systems design. " +
    "You can ask me about his work experience, education, verified projects, skills, or how to get in touch. " +
    "For direct personal communication, please email mohan.mca2024@adhiyamaan.in or visit /contact."
  );
}

function getContextualQuestions(query: string): string[] {
  if (query.includes("project") || query.includes("built")) {
    return [
      "Tell me about the MapUp Geofencing Engine",
      "What did Mohan build at Veda Scholars?",
      "How can I hire Mohan?",
    ];
  }
  if (query.includes("education") || query.includes("degree")) {
    return [
      "What is Mohan's current role at Veda Scholars?",
      "What technologies does Mohan use?",
      "What did he do at Gabriel India Ltd?",
    ];
  }
  return [
    "What is Mohan's current role at Veda Scholars?",
    "Tell me about his verified projects",
    "What are his core technical skills?",
    "How do I contact Mohan?",
  ];
}
