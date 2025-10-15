import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  Terminal, MapPin, Briefcase, Award, Download, Github,
  Mail, Phone, Linkedin, Cpu, Shield, Code2, ExternalLink,
  Sparkles, Brain, Zap
} from "lucide-react";

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };
type CVLink = { label: string; href: string; fileName?: string };
type Project = { title: string; description: string; tags: string[]; repo?: string };
type Skill = { group: string; items: string[] };

const CV_LINKS: CVLink[] = [
  {
    label: "CV Español (PDF)",
    href: "/cv-gabriel-palazzini-es.pdf",
    fileName: "cv-gabriel-palazzini-es.pdf",
  },
  {
    label: "CV English (PDF)",
    href: "/resume-gabriel-palazzini-en.pdf",
    fileName: "resume-gabriel-palazzini-en.pdf",
  },
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
    title: "Portfolio Profesional",
    description: "Portfolio interactivo desarrollado con React, TypeScript y Vite. Incluye chatbot inteligente y diseño responsive.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    repo: "https://github.com/dekapala",
  },
];

const SKILLS: Skill[] = [
  { 
    group: "Cybersecurity", 
    items: ["Suricata IDS", "OWASP ZAP", "Nmap", "Nessus", "Metasploit", "SIEM", "Ethical Hacking"] 
  },
  { 
    group: "Networking", 
    items: ["CCNA", "DOCSIS", "TCP/IP", "VLANs", "DNS/DHCP", "ServAssure NXT", "Grafana"] 
  },
  { 
    group: "Development", 
    items: ["Python", "React", "TypeScript", "JavaScript", "HTML/CSS", "Git", "Linux"] 
  },
  { 
    group: "DevOps & Cloud", 
    items: ["Docker", "Kubernetes", "IaC", "Ansible", "AWS (EC2/S3/VPC)", "Vite"] 
  },
  { 
    group: "AI Tools", 
    items: ["ChatGPT", "Claude AI", "Gemini", "GitHub Copilot", "Prompt Engineering"] 
  },
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
  <span className="rounded-md border border-cyan-700/40 bg-cyan-900/20 px-2.5 py-1 text-xs font-medium text-cyan-300">
    {children}
  </span>
);

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="rounded-2xl border border-neutral-800/60 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-6 backdrop-blur-sm shadow-xl">
    <div className="mb-5 flex items-center gap-2.5 text-cyan-400">
      {icon}
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
    </div>
    {children}
  </section>
);

// Knowledge Base
const knowledgeBase: Record<string, { keywords: string[]; answer: string }> = {
  quien: {
    keywords: ['quien', 'quién', 'gabriel', 'palazzini', 'sobre ti', 'about', 'presentate', 'conocerte'],
    answer: "Gabriel Palazzini es un Network Analyst con 11+ años de experiencia en Telecom Argentina, actualmente en transición hacia ciberseguridad. Es autodidacta, utilizando IA (ChatGPT, Claude, Gemini) como principal herramienta de aprendizaje y desarrollo. Todos sus proyectos están desarrollados 100% con IA, demostrando dominio en Prompt Engineering y capacidad de aprendizaje acelerado."
  },
  experiencia: {
    keywords: ['experiencia', 'trabajo', 'años', 'carrera', 'trayectoria', 'experience', 'career', 'telecom'],
    answer: "Gabriel tiene 11+ años de experiencia en Telecom Argentina como Network Analyst, especializado en infraestructura DOCSIS, monitoreo de redes HFC con ServAssure NXT y Grafana, gestión de incidentes críticos y soporte técnico avanzado (LAN/WAN/VoIP/FTTH). Actualmente en transición activa hacia roles de SOC Analyst y Cybersecurity Engineer."
  },
  cybersecurity: {
    keywords: ['ciberseguridad', 'seguridad', 'hacking', 'pentesting', 'soc', 'ids', 'security', 'ethical'],
    answer: "Gabriel se especializa en ciberseguridad con laboratorios SOC propios usando Suricata IDS, automatización con Docker/Kubernetes, entornos vulnerables (DVWA), y proyectos de detección de intrusiones en Python. Certificado en Ethical Hacking (UTN FRBA), Cisco Cybersecurity Analyst y Fortinet Fundamentals. Busca posiciones como SOC Analyst o Security Engineer."
  },
  proyectos: {
    keywords: ['proyectos', 'github', 'repositorios', 'desarrollos', 'projects', 'repos', 'portfolio'],
    answer: "Gabriel tiene 5 proyectos destacados: 1) Network Intrusion Detector (IDS con Python/Scapy), 2) K8s SOC Lab (Kubernetes + Suricata), 3) CyberLab Infrastructure (Docker/IaC/DVWA), 4) Port Scanner (Python), 5) Portfolio Profesional (React/TypeScript/Vite). TODOS desarrollados 100% con IA sin cursos formales, demostrando autodidactismo y dominio de Prompt Engineering."
  },
  ia: {
    keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'claude', 'gemini', 'ai', 'artificial', 'copilot', 'prompt'],
    answer: "Gabriel es experto en aprovechar IA para desarrollo acelerado. Utiliza ChatGPT, Claude AI, Gemini y GitHub Copilot diariamente. TODOS sus proyectos técnicos están desarrollados 100% con IA, desde la arquitectura hasta el código final. Domina Prompt Engineering y ha demostrado capacidad de aprender tecnologías complejas (React, Kubernetes, IDS) sin cursos formales, solo con IA como mentor."
  },
  skills: {
    keywords: ['habilidades', 'skills', 'tecnologías', 'herramientas', 'tools', 'conocimientos', 'stack', 'sabe', 'maneja'],
    answer: "Skills técnicos: Redes (CCNA, DOCSIS, TCP/IP, VLANs), Ciberseguridad (Suricata IDS, OWASP ZAP, Nmap, Metasploit), Desarrollo (Python, React, TypeScript, JavaScript), DevOps (Docker, Kubernetes, IaC, Ansible), Cloud (AWS), IA (ChatGPT, Claude, Gemini, Copilot, Prompt Engineering). Autodidacta con capacidad demostrada de aprender tecnologías complejas mediante IA."
  },
  certificados: {
    keywords: ['certificados', 'certificaciones', 'títulos', 'certifications', 'diplomas', 'estudios', 'formación'],
    answer: "Certificaciones: ISC2 Candidate (en curso), Junior Cybersecurity Analyst (Cisco 2024), Fortinet Certified Fundamentals in Cybersecurity (2023), Cloud Computing AWS (Educación IT 2023), Experto Universitario en Hacking Ético (UTN FRBA 2021-2022), CCNA v7 (Cisco 2020-2021). Además, autodidacta en React, TypeScript, Docker y Kubernetes mediante IA."
  },
  contratar: {
    keywords: ['contratar', 'contratarlo', 'por qué', 'porque', 'razones', 'ventajas', 'beneficios', 'hire', 'why'],
    answer: "Razones para contratar a Gabriel: 1) 11+ años de experiencia sólida en networking, 2) Transición activa a ciberseguridad con proyectos reales, 3) AUTODIDACTA experto en IA - aprende tecnologías nuevas rápidamente, 4) Portafolio completo de proyectos 100% con IA, 5) Dominio de Prompt Engineering, 6) Disponibilidad inmediata, 7) Modalidad híbrida/remota, 8) Stack técnico amplio y actual. Es un profesional que combina experiencia, autodidactismo y dominio de herramientas IA."
  },
  contacto: {
    keywords: ['contacto', 'email', 'linkedin', 'teléfono', 'telefono', 'contact', 'comunicar', 'hablar'],
    answer: "📧 Email: gabrielleandro.p@outlook.com | 📱 Teléfono: +54 11 3097-6948 | 💼 LinkedIn: linkedin.com/in/gabrielpalazzini | 🔗 GitHub: github.com/dekapala | 📍 Ubicación: Buenos Aires, Argentina | ⚡ Disponibilidad: INMEDIATA (Híbrido/Remoto)"
  },
  disponibilidad: {
    keywords: ['disponibilidad', 'cuando', 'empezar', 'inicio', 'available', 'start'],
    answer: "Gabriel tiene DISPONIBILIDAD INMEDIATA para comenzar. Modalidad preferida: Híbrido o Remoto. Ubicación: Buenos Aires, Argentina. Puede incorporarse de inmediato en roles como SOC Analyst, Security Engineer, Junior Pentester o posiciones relacionadas con ciberseguridad y redes."
  }
};

export default function App() {
  const endRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: "assistant", 
      content: "¡Hola! 👋 Soy el asistente de Gabriel. Preguntame lo que quieras: ¿Quién es Gabriel? ¿Qué experiencia tiene? ¿Por qué contratarlo? ¿Qué proyectos desarrolló? ¿Cómo usa IA?" 
    },
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

    let response = "No encontré una respuesta específica para esa pregunta. Podés contactar a Gabriel directamente:\n📧 gabrielleandro.p@outlook.com\n📱 +54 11 3097-6948\n💼 linkedin.com/in/gabrielpalazzini";

    // Buscar coincidencias en el knowledge base
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

  // Nuevo handler: reemplaza onKeyPress (deprecado)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent" />
      </div>
      
      <header className="sticky top-0 z-10 w-full border-b border-neutral-800/60 bg-neutral-900/80 backdrop-blur-xl shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <Terminal className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wide">Gabriel Palazzini</h1>
              <p className="text-xs text-neutral-400">Network Analyst → Cybersecurity Engineer</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-xs text-neutral-300 md:flex">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-cyan-400" /> Buenos Aires, AR
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-cyan-400" /> 11+ años
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="h-4 w-4 text-cyan-400" /> 6 certs
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8">
        {/* Hero Section */}
        <Section title="Network Analyst → Cybersecurity Engineer" icon={<Shield className="h-6 w-6" />}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-base text-neutral-200 leading-relaxed">
                  <strong className="text-cyan-400 font-semibold">Analista de Redes Senior</strong> con{" "}
                  <strong className="text-cyan-400">11+ años en Telecom Argentina</strong>, gestionando infraestructuras críticas DOCSIS/HFC. 
                  Actualmente en <strong className="text-cyan-400">transición activa hacia Ciberseguridad Ofensiva y Defensiva</strong>, 
                  enfocado en roles de <strong>SOC Analyst</strong> y <strong>Security Engineer</strong>.
                </p>
                
                <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 p-4">
                  <div className="flex items-start gap-3">
                    <Brain className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-cyan-300">🚀 Autodidacta + IA = Aprendizaje Acelerado</p>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        <strong className="text-cyan-400">100% autodidacta</strong> en tecnologías modernas. 
                        Todos mis proyectos están desarrollados íntegramente con <strong>Inteligencia Artificial</strong> (ChatGPT, Claude, Gemini) 
                        como herramienta principal, sin cursos formales. Dominio avanzado de <strong>Prompt Engineering</strong> para 
                        desarrollo, debugging y arquitectura de soluciones complejas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-purple-800/40 p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-purple-300">⚡ Stack Técnico Full-Cycle</p>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        De <strong>Networking</strong> (CCNA, DOCSIS, TCP/IP) a <strong>Cybersecurity</strong> (Suricata IDS, OWASP, Nmap), 
                        pasando por <strong>DevOps</strong> (Docker, Kubernetes, IaC) y <strong>Desarrollo</strong> (Python, React, TypeScript). 
                        Este portfolio es evidencia: construido con <strong>React + TypeScript + Vite + Tailwind</strong>, 
                        desarrollado 100% con IA en tiempo récord.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge>DISPONIBILIDAD INMEDIATA</Badge>
                <Badge>HÍBRIDO / REMOTO</Badge>
                <Badge>Buenos Aires, Argentina</Badge>
                <Badge>React + TypeScript</Badge>
                <Badge>Python + Docker</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:flex-col md:min-w-[180px]">
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-700/50 bg-cyan-900/20 px-4 py-3 text-sm font-medium hover:bg-cyan-800/30 transition-all shadow-lg hover:shadow-cyan-900/50" href="mailto:gabrielleandro.p@outlook.com">
                <Mail className="h-4 w-4" /> Email
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-700/50 bg-cyan-900/20 px-4 py-3 text-sm font-medium hover:bg-cyan-800/30 transition-all shadow-lg hover:shadow-cyan-900/50" href="tel:+5491130976948">
                <Phone className="h-4 w-4" /> +54 11 3097-6948
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-700/50 bg-cyan-900/20 px-4 py-3 text-sm font-medium hover:bg-cyan-800/30 transition-all shadow-lg hover:shadow-cyan-900/50" href="https://github.com/dekapala" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-700/50 bg-cyan-900/20 px-4 py-3 text-sm font-medium hover:bg-cyan-800/30 transition-all shadow-lg hover:shadow-cyan-900/50" href="https://linkedin.com/in/gabrielpalazzini" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </Section>

        {/* CVs */}
        <Section title="Currículums" icon={<Download className="h-5 w-5" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {CV_LINKS.map((cv) => (
              <a
                key={cv.href}
                className="flex items-center justify-between rounded-xl border border-neutral-700/50 bg-neutral-800/40 px-5 py-4 text-sm font-medium hover:bg-neutral-800/60 hover:border-cyan-700/50 transition-all group shadow-lg"
                href={cv.href}
                download={cv.fileName}
              >
                <span>{cv.label}</span>
                <Download className="h-4 w-4 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </Section>

        {/* Proyectos */}
        <Section title="Proyectos de Ciberseguridad" icon={<Code2 className="h-5 w-5" />}>
          <div className="grid gap-4 md:grid-cols-2">
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="group rounded-xl border border-neutral-800/60 bg-neutral-900/60 p-5 hover:border-cyan-700/50 transition-all shadow-lg hover:shadow-cyan-900/20">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-base font-bold text-cyan-400">{p.title}</h3>
                  {p.repo && (
                    <a className="text-neutral-400 hover:text-cyan-400 transition-colors" href={p.repo} target="_blank" rel="noreferrer" aria-label="Ver repositorio">
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
          <div className="mt-4 rounded-lg bg-cyan-950/20 border border-cyan-800/30 p-3 text-center">
            <p className="text-sm text-cyan-300 font-medium flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Todos desarrollados 100% con IA (ChatGPT, Claude, Gemini) - Sin cursos formales
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section title="Habilidades Técnicas" icon={<Cpu className="h-5 w-5" />}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {SKILLS.map(s => (
              <div key={s.group} className="rounded-xl border border-neutral-800/60 bg-neutral-900/60 p-4 shadow-lg">
                <div className="mb-3 text-sm font-bold text-cyan-400">{s.group}</div>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {s.items.map(i => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Certificaciones */}
        <Section title="Educación y Certificaciones" icon={<Award className="h-5 w-5" />}>
          <div className="grid gap-3 md:grid-cols-2">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-neutral-800/60 bg-neutral-900/60 p-4 shadow-lg">
                <Award className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-300">{cert}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Experiencia */}
        <Section title="Experiencia Laboral" icon={<Briefcase className="h-5 w-5" />}>
          <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/60 p-5 shadow-lg">
            <div className="mb-3">
              <h3 className="font-bold text-cyan-400 text-base">Analista Técnico de Operaciones Regionales / Network Analyst</h3>
              <p className="text-sm text-neutral-400">Telecom Argentina • Nov 2016 - Actualidad (8+ años)</p>
            </div>
            <ul className="mt-3 space-y-2.5 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Monitoreo preventivo y gestión de infraestructura crítica HFC (fibra/coaxial) con ServAssure NXT y Grafana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Resolución de fallas masivas en tiempo récord, optimizando SLAs y reduciendo downtime</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Soporte técnico avanzado: Internet, LAN/WAN, VoIP, FTTH, DNS/DHCP, Cable Modems (DOCSIS)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span>Coordinación con equipos NOC, Sistemas y Field para resolución de incidentes complejos</span>
              </li>
            </ul>
          </div>
        </Section>

        {/* Chatbot */}
        <Section title="Asistente Interactivo IA" icon={<Terminal className="h-5 w-5" />}>
          <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/90 p-4 shadow-lg">
            <div className="mb-3 max-h-[45vh] min-h-[250px] overflow-y-auto space-y-3 pr-2">
              {messages.map((m, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
                    {m.role === "user" ? "→ TU PREGUNTA" : "← RESPUESTA IA"}
                  </div>
                  <div className={`rounded-lg px-4 py-3 text-sm leading-relaxed shadow-md ${m.role === "user" ? "bg-cyan-900/30 border border-cyan-700/50 text-neutral-100" : "bg-neutral-800/60 border border-neutral-700/50 text-neutral-200"}`}>
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
                onKeyDown={handleKeyDown}
                placeholder="Ej: ¿Quién es Gabriel? ¿Por qué contratarlo? ¿Qué experiencia tiene?"
                className="flex-1 rounded-lg border border-neutral-700/50 bg-neutral-800/60 px-4 py-3 text-sm outline-none focus:border-cyan-600 focus:bg-neutral-800 transition-all placeholder:text-neutral-500 shadow-inner"
              />
              <button onClick={handleSend} className="rounded-lg border border-cyan-700/50 bg-cyan-900/30 px-5 py-3 text-sm font-medium hover:bg-cyan-800/40 transition-all shadow-lg hover:shadow-cyan-900/50">
                Enviar
              </button>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-cyan-950/20 border border-cyan-800/30 p-2.5 text-center">
            <p className="text-xs text-cyan-300 flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Preguntá lo que quieras: experiencia, proyectos, skills, certificados, por qué contratarlo, contacto, etc.
            </p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-neutral-800/60 bg-neutral-900/80 py-6 backdrop-blur-xl">
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
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Gabriel Palazzini — Portfolio desarrollado con 
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 inline" />
              <strong className="text-cyan-400">IA</strong>
              (React + TypeScript + Vite + Tailwind)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
