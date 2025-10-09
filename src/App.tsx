import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Terminal, MapPin, Briefcase, Award, Download, Github,
  Mail, Phone, Linkedin, Cpu, Shield, Code2, ExternalLink,
} from "lucide-react";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };
type CVLink = { label: string; href: string; fileName?: string };
type Project = { title: string; description: string; tags: string[]; repo?: string };
type Skill = { group: string; items: string[] };

const CV_LINKS: CVLink[] = [
  { label: "CV Español (PDF)", href: "/cv-espanol.pdf", fileName: "cv-gabriel-palazzini-es.pdf" },
  { label: "CV English (PDF)", href: "/cv-english.pdf", fileName: "cv-gabriel-palazzini-en.pdf" },
];

const PROJECTS: Project[] = [
  {
    title: "Network Intrusion Detector",
    description: "Sistema de detección de intrusiones (IDS) construido en Python usando Scapy. Detecta port scans y ARP spoofing en tiempo real.",
    tags: ["Python", "Scapy", "IDS", "Security"],
    repo: "https://github.com/dekapala",
  },
  {
    title: "K8s SOC Lab",
    description: "Laboratorio defensivo en Kubernetes con Suricata IDS para monitoreo y detección de amenazas.",
    tags: ["Kubernetes", "Suricata", "Docker", "SOC"],
    repo: "https://github.com/dekapala",
  },
  {
    title: "CyberLab Infrastructure",
    description: "Infraestructura automatizada con Docker e IaC para despliegue de entornos vulnerables (DVWA).",
    tags: ["Docker", "IaC", "DVWA", "Ansible"],
    repo: "https://github.com/dekapala",
  },
  {
    title: "Port Scanner",
    description: "Escáner de puertos en Python para reconocimiento de red y auditorías de seguridad.",
    tags: ["Python", "Network Security"],
    repo: "https://github.com/dekapala",
  },
  {
    title: "Repo Análisis 2.0",
    description: "Sistema de gestión de equipos y bolsa de trabajo para Telecom Argentina (en desarrollo).",
    tags: ["HTML", "JavaScript"],
    repo: "https://github.com/dekapala",
  },
];

const SKILLS: Skill[] = [
  { group: "Cybersecurity", items: ["Suricata IDS", "OWASP ZAP", "Nmap", "Nessus", "Metasploit", "SIEM", "Ethical Hacking"] },
  { group: "Networking", items: ["CCNA", "DOCSIS", "TCP/IP", "VLANs", "DNS/DHCP", "ServAssure NXT", "Grafana"] },
  { group: "Development & DevOps", items: ["Python", "Docker", "Kubernetes", "IaC", "Git", "Linux", "Ansible"] },
  { group: "Cloud & AI", items: ["AWS (EC2/S3/VPC)", "ChatGPT", "Claude AI", "Gemini", "GitHub Copilot"] },
];

const CERTIFICATIONS = [
  "ISC2 Candidate (En curso)",
  "Junior Cybersecurity Analyst - Cisco (2024)",
  "Fortinet Certified Fundamentals in Cybersecurity (2023)",
  "Cloud Computing AWS - Educación IT (2023)",
  "Experto Universitario en Hacking Ético - UTN FRBA (2021-2022)",
  "CCNA v7 - Cisco Networking Academy (2020-2021)",
];

const Badge: React.FC<{ children: string }> = ({ children }) => (
  <span className="rounded-md border border-cyan-800/50 bg-cyan-950/30 px-2 py-1 text-xs text-cyan-400">{children}</span>
);

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 p-6 backdrop-blur-sm">
    <div className="mb-4 flex items-center gap-2 text-cyan-400">
      {icon}
      <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
    </div>
    {children}
  </section>
);

const knowledgeBase: Record<string, { keywords: string[]; answer: string }> = {
  experiencia: {
    keywords: ['experiencia', 'años', 'trabajo', 'experience', 'years'],
    answer: "Gabriel tiene 11+ años de experiencia en Telecom Argentina como Network Analyst, especializado en infraestructura DOCSIS y gestión de redes HFC. Actualmente en transición activa hacia ciberseguridad."
  },
  cybersecurity: {
    keywords: ['ciberseguridad', 'seguridad', 'hacking', 'soc', 'ids', 'cybersecurity', 'security'],
    answer: "Gabriel se especializa en ciberseguridad con laboratorios SOC usando Suricata IDS, automatización con Docker/Kubernetes, y proyectos de detección de intrusiones. Certificado en Ethical Hacking (UTN FRBA) y Cisco Cybersecurity Analyst."
  },
  proyectos: {
    keywords: ['proyectos', 'github', 'repositorios', 'projects', 'repos'],
    answer: "Gabriel tiene 5 proyectos: Network Intrusion Detector (Python/Scapy), K8s SOC Lab (Kubernetes/Suricata), CyberLab Infrastructure (Docker/IaC), Port Scanner, y Repo Análisis 2.0. Todos desarrollados 100% con IA."
  },
  ia: {
    keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'claude', 'gemini', 'ai'],
    answer: "Gabriel utiliza IA (ChatGPT, Claude, Gemini, GitHub Copilot) como herramientas principales. TODO su GitHub fue construido 100% con IA."
  },
  skills: {
    keywords: ['habilidades', 'skills', 'tecnologías', 'herramientas', 'tools'],
    answer: "Skills: Redes (CCNA, DOCSIS, TCP/IP), Ciberseguridad (Suricata, OWASP ZAP, Nmap), Cloud/DevOps (AWS, Docker, Kubernetes), Desarrollo (Python, Git, Linux), IA (ChatGPT, Claude, Gemini)."
  },
  contacto: {
    keywords: ['contacto', 'email', 'linkedin', 'teléfono', 'contact'],
    answer: "Email: gabrielleandro.p@outlook.com | Teléfono: +54 11 3097-6948 | LinkedIn: linkedin.com/in/gabrielpalazzini | GitHub: github.com/dekapala | Buenos Aires, Argentina"
  }
};

export default function App() {
  const endRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "¡Hola! 👋 Soy el asistente de Gabriel. Preguntame sobre su experiencia, proyectos, skills o contacto." },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSend = () => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: "user", content: input.trim() }]);

    let response = "Interesante pregunta. Podés encontrar más info en las secciones de arriba o contactar a Gabriel directamente.";

    for (const value of Object.values(knowledgeBase)) {
      if (value.keywords.some(keyword => trimmed.includes(keyword))) {
        response = value.answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-neutral-950 to-neutral-950" />
      
      <header className="sticky top-0 z-10 w-full border-b border-neutral-800/50 bg-neutral-900/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Terminal className="h-6 w-6 text-cyan-400" />
            <div>
              <h1 className="text-base font-bold tracking-wide">Gabriel Palazzini</h1>
              <p className="text-xs text-neutral-400">Network Analyst → Cybersecurity Engineer</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-xs text-neutral-300 md:flex">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Buenos Aires, AR
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-4 w-4" /> 11+ años
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="h-4 w-4" /> 6 certs
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8">
        <Section title="Network Analyst → Cybersecurity Engineer" icon={<Shield className="h-6 w-6" />}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <p className="text-neutral-300 leading-relaxed">
                Analista de redes con <strong className="text-cyan-400">11+ años de experiencia</strong> en Telecom Argentina gestionando entornos críticos. 
                En <strong className="text-cyan-400">transición activa</strong> hacia ciberseguridad ofensiva y defensiva.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                Sólida base técnica en redes combinada con formación en <strong className="text-cyan-400">detección de amenazas</strong>, análisis de tráfico y gestión de entornos vulnerables.
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-cyan-950/30 border border-cyan-800/50 px-4 py-2 text-sm text-cyan-300">
                <Cpu className="h-4 w-4" />
                <span>Todos mis proyectos desarrollados 100% con IA (ChatGPT, Claude, Gemini)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:flex-col">
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-800/50 bg-cyan-950/30 px-4 py-2.5 text-sm hover:bg-cyan-900/30" href="mailto:gabrielleandro.p@outlook.com">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-800/50 bg-cyan-950/30 px-4 py-2.5 text-sm hover:bg-cyan-900/30" href="tel:+5491130976948">
                <Phone className="h-4 w-4" /> +54 11 3097-6948
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-800/50 bg-cyan-950/30 px-4 py-2.5 text-sm hover:bg-cyan-900/30" href="https://github.com/dekapala" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-800/50 bg-cyan-950/30 px-4 py-2.5 text-sm hover:bg-cyan-900/30" href="https://linkedin.com/in/gabrielpalazzini" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>DISPONIBILIDAD INMEDIATA</Badge>
            <Badge>HÍBRIDO/REMOTO</Badge>
            <Badge>Buenos Aires, Argentina</Badge>
          </div>
        </Section>

        <Section title="Currículums" icon={<Download className="h-5 w-5" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {CV_LINKS.map((cv, idx) => (
              <a key={idx} className="flex items-center justify-between rounded-xl border border-neutral-700/50 bg-neutral-800/30 px-5 py-4 text-sm hover:bg-neutral-800/50 hover:border-cyan-800/50 transition-all group" href={cv.href} download={cv.fileName}>
                <span>{cv.label}</span>
                <Download className="h-4 w-4 text-neutral-400 group-hover:text-cyan-400" />
              </a>
            ))}
          </div>
        </Section>

        <Section title="Proyectos de Ciberseguridad" icon={<Code2 className="h-5 w-5" />}>
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="group rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-5 hover:border-cyan-800/50 transition-all">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-base font-semibold text-cyan-400">{p.title}</h3>
                  {p.repo && (
                    <a className="text-neutral-400 hover:text-cyan-400" href={p.repo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="mb-4 text-sm text-neutral-300 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-400 italic">✨ Todos desarrollados 100% con IA (ChatGPT, Claude, Gemini)</p>
        </Section>

        <Section title="Habilidades Técnicas" icon={<Cpu className="h-5 w-5" />}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map(s => (
              <div key={s.group} className="rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-4">
                <div className="mb-3 text-sm font-semibold text-cyan-400">{s.group}</div>
                <ul className="space-y-1.5 text-sm text-neutral-300">
                  {s.items.map(i => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Educación y Certificaciones" icon={<Award className="h-5 w-5" />}>
          <div className="grid gap-3 md:grid-cols-2">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-4">
                <Award className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-300">{cert}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Experiencia Laboral" icon={<Briefcase className="h-5 w-5" />}>
          <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-5">
            <div className="mb-2">
              <h3 className="font-semibold text-cyan-400">Analista Técnico de Operaciones Regionales</h3>
              <p className="text-sm text-neutral-400">Telecom Argentina • Nov 2016 - Actualidad</p>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Monitoreo preventivo de redes HFC con ServAssure NXT y Grafana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Gestión de fallas masivas, optimizando tiempos de resolución</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Soporte técnico avanzado (Internet, LAN/WAN, VoIP, FTTH, DNS/DHCP)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Coordinación con equipos NOC y Sistemas</span>
              </li>
            </ul>
          </div>
        </Section>

        <Section title="Asistente Interactivo" icon={<Terminal className="h-5 w-5" />}>
          <div className="rounded-xl border border-neutral-800/50 bg-neutral-900 p-4">
            <div className="mb-3 max-h-[40vh] min-h-[200px] overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                    {m.role === "user" ? "→ USER" : "← ASSISTANT"}
                  </div>
                  <div className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-cyan-950/30 border border-cyan-800/50 text-neutral-200" : "bg-neutral-800/50 border border-neutral-700/50 text-neutral-300"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                value={input}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Preguntame sobre experiencia, proyectos, skills..."
                className="flex-1 rounded-lg border border-neutral-700/50 bg-neutral-800/50 px-4 py-2.5 text-sm outline-none focus:border-cyan-700 focus:bg-neutral-800 transition-colors placeholder:text-neutral-500"
              />
              <button onClick={handleSend} className="rounded-lg border border-cyan-800/50 bg-cyan-950/30 px-4 py-2.5 text-sm hover:bg-cyan-900/30 transition-colors">
                Enviar
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-500 text-center">
            Preguntá sobre experiencia, proyectos, skills, certificaciones o contacto
          </p>
        </Section>
      </main>

      <footer className="border-t border-neutral-800/50 bg-neutral-900/50 py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-3 text-center text-sm text-neutral-400">
            <div className="flex items-center gap-4">
              <a href="https://github.com/dekapala" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/gabrielpalazzini" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:gabrielleandro.p@outlook.com" className="hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p>© {new Date().getFullYear()} Gabriel Palazzini — Desarrollado con Vite + React + TypeScript + IA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
