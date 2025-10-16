import { useState } from 'react';
import { Terminal, Github, Linkedin, Mail, MapPin, Calendar, Award, Code, Shield, Network, Download, MessageSquare, ChevronDown, ChevronUp, ExternalLink, Briefcase, Sun, Moon, X, Zap, Brain, Cpu, TrendingUp, Sparkles, Lightbulb } from 'lucide-react';

const CV_LINKS = {
  spanish: "/CV - Gabriel Leandro Palazzini- ES.pdf",
  english: "/CV - Gabriel Leandro Palazzini- EN.pdf"
};

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface ExpandedSections {
  experience: boolean;
  projects: boolean;
  skills: boolean;
  certs: boolean;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  link?: string;
}

const certifications: Certification[] = [
  {
    name: "Junior Cybersecurity Analyst",
    issuer: "Cisco",
    year: "2024",
    description: "Certificación enfocada en fundamentos de ciberseguridad, análisis de amenazas y respuesta a incidentes. Cubre conceptos esenciales para roles de analista SOC junior.",
    skills: ["Threat Analysis", "Incident Response", "Security Operations", "Network Security", "SIEM Basics"],
    link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/cybersecurity/junior-cybersecurity-analyst.html"
  },
  {
    name: "Fortinet Certified Fundamentals in Cybersecurity",
    issuer: "Fortinet",
    year: "2023",
    description: "Fundamentos de ciberseguridad con enfoque en conceptos de seguridad de red, firewalls, VPNs y políticas de seguridad. Introducción a la suite de productos Fortinet.",
    skills: ["Network Security", "Firewalls", "VPN", "Security Policies", "Threat Prevention"],
    link: "https://www.fortinet.com/training/cybersecurity-certifications"
  },
  {
    name: "Cloud Computing (AWS)",
    issuer: "Educación IT",
    year: "2023",
    description: "Formación en servicios AWS fundamentales: EC2, S3, VPC, IAM. Diseño de arquitecturas cloud seguras y escalables. Implementación de buenas prácticas de seguridad en la nube.",
    skills: ["AWS EC2", "AWS S3", "AWS VPC", "IAM", "Cloud Security", "Cloud Architecture"],
    link: "https://www.educacionit.com/"
  },
  {
    name: "Experto Universitario en Hacking Ético",
    issuer: "UTN FRBA",
    year: "2021-2022",
    description: "Programa universitario intensivo en pentesting y seguridad ofensiva. Incluye técnicas de reconocimiento, explotación de vulnerabilidades, post-explotación y reportes técnicos.",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Exploit Development", "Metasploit", "Nmap", "Web Application Security", "Network Pentesting"],
    link: "https://sceu.frba.utn.edu.ar/"
  },
  {
    name: "CCNA v7",
    issuer: "Cisco Networking Academy",
    year: "2020-2021",
    description: "Certificación fundamental en networking: routing, switching, IPv4/IPv6, VLANs, protocolos de enrutamiento (OSPF, EIGRP), seguridad básica de red y troubleshooting.",
    skills: ["TCP/IP", "Routing & Switching", "VLANs", "OSPF", "Network Troubleshooting", "IPv4/IPv6", "Network Security"],
    link: "https://www.netacad.com/courses/networking/ccna"
  }
];

const projects = [
  {
    title: "Portfolio Profesional (este sitio)",
    description: "Portfolio interactivo desarrollado 100% con IA (React, TypeScript, Vite, Tailwind). Incluye chatbot inteligente, diseño responsive y modo claro/oscuro.",
    result: "Proyecto completo creado mediante Prompt Engineering avanzado con Claude AI",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "AI-Generated"],
    github: "https://github.com/dekapala/gabriel-portfolio"
  },
  {
    title: "RepoAnalisis2 - Gestión de Reportería",
    description: "Herramienta interna de gestión de reportería para análisis ágil del sector. Automatiza análisis diarios y generación de informes. Desarrollado completamente con IA.",
    result: "Optimización de tiempos de análisis y reportes automáticos para el sector",
    tech: ["HTML", "Python", "AI-Powered", "Data Analysis", "Automation"],
    github: "https://github.com/dekapala"
  },
  {
    title: "SOC Lab (Suricata IDS)",
    description: "Laboratorio de monitoreo y detección de amenazas con Suricata IDS usando Docker. Tuning de reglas para escenarios de port-scan/ARP.",
    result: "Detección efectiva con reglas ET optimizadas y análisis de pcap",
    tech: ["Docker", "Suricata", "IDS", "pcap", "ET Rules"],
    github: "https://github.com/dekapala/soc-lab"
  },
  {
    title: "Network Intrusion Detector",
    description: "Sistema de detección de intrusiones (IDS) construido en Python usando Scapy. Captura y analiza tráfico LAN para detectar comportamientos sospechosos como port scans y ARP spoofing.",
    result: "Identificación en tiempo real de port scans y ARP spoofing con alertas",
    tech: ["Python", "Scapy", "IDS", "Network Security"],
    github: "https://github.com/dekapala/network-intrusion-detector"
  },
  {
    title: "Port Scanner",
    description: "Escáner de puertos básico en Python para prácticas de ciberseguridad. Reconocimiento de red y auditorías de seguridad.",
    result: "Herramienta funcional para análisis de puertos y reconocimiento",
    tech: ["Python", "Network Security", "Scanning"],
    github: "https://github.com/dekapala/port-scanner"
  },
  {
    title: "CyberLab - Infra",
    description: "Infraestructura local automatizada para prácticas de ciberseguridad con Docker y aplicaciones vulnerables (DVWA).",
    result: "Entornos de prueba reproducibles con automatización completa",
    tech: ["Docker", "IaC", "Ansible", "DVWA"],
    github: "https://github.com/dekapala/cyberlab-infra"
  }
];

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: '¡Hola! Soy tu asistente inteligente creado con IA. Pregúntame sobre la experiencia de Gabriel, sus proyectos con IA, certificaciones o su enfoque en automatización con Inteligencia Artificial.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    experience: false,
    projects: false,
    skills: false,
    certs: false
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    
    let response = '';
    const msg = inputMessage.toLowerCase();
    
    if (msg.includes('ia') || msg.includes('inteligencia artificial') || msg.includes('ai') || msg.includes('chatgpt') || msg.includes('claude')) {
      response = '¡Exacto! Gabriel tiene un FOCO ACTUAL en IA para implementar mejoras en sectores operativos. Todos sus proyectos están desarrollados con IA: este portfolio completo con Claude AI, RepoAnalisis2 para reportería automatizada, y todos sus labs de ciberseguridad. Domina Prompt Engineering avanzado.';
    } else if (msg.includes('portfolio') || msg.includes('este sitio') || msg.includes('web')) {
      response = 'Este portfolio fue creado 100% con Inteligencia Artificial usando Claude AI. Stack: React + TypeScript + Vite + Tailwind. Todo desarrollado mediante Prompt Engineering avanzado, desde el diseño hasta el chatbot que estás usando ahora. Código disponible en GitHub.';
    } else if (msg.includes('repoanalisis') || msg.includes('reportería') || msg.includes('herramienta')) {
      response = 'RepoAnalisis2 es una herramienta interna de gestión de reportería que Gabriel está implementando en su sector. Permite análisis más ágiles de datos diarios y generación automática de informes. Completamente desarrollado con IA para optimizar procesos operativos.';
    } else if (msg.includes('experiencia') || msg.includes('experience') || msg.includes('trabajo')) {
      response = 'Gabriel tiene 11 años en Telecom Argentina con progresión clara: Soporte Residencial (2014-2015), Corporativo (2015-2016), Network Analyst (2016-actualidad). Actualmente enfocado en implementar IA en operaciones y mejorar procesos con automatización inteligente.';
    } else if (msg.includes('proyecto') || msg.includes('project') || msg.includes('github')) {
      response = 'Proyectos: Portfolio con IA (este sitio), RepoAnalisis2 (reportería automatizada), SOC Lab (Suricata IDS), Network Intrusion Detector, Port Scanner, CyberLab-Infra. TODOS desarrollados con IA. Disponibles en github.com/dekapala con documentación completa.';
    } else if (msg.includes('certificación') || msg.includes('cert') || msg.includes('curso')) {
      response = 'Certificaciones: Junior Cybersecurity Analyst (Cisco 2024), Fortinet Fundamentals (2023), AWS Cloud Computing (2023), Experto Hacking Ético UTN (2021-22), CCNA v7 (2020-21). Click en cada una para ver skills adquiridos.';
    } else if (msg.includes('skill') || msg.includes('habilidad') || msg.includes('tecnología')) {
      response = 'Blue Team: Suricata IDS, pcap/tcpdump, Wireshark, SIEM. Infra: DOCSIS, SNMP, Grafana. Dev: Python, React, TypeScript. AI Tools: ChatGPT, Claude, Gemini, Prompt Engineering. Foco actual: implementar IA en sectores para automatización y mejora de procesos.';
    } else if (msg.includes('soc') || msg.includes('blue team') || msg.includes('security')) {
      response = 'Gabriel busca roles SOC Analyst (L1-L2) o posiciones enfocadas en implementación de IA para ciberseguridad. Combina 11 años de operaciones de red con labs prácticos de IDS/IPS y desarrollo con IA.';
    } else if (msg.includes('inglés') || msg.includes('ingles') || msg.includes('english') || msg.includes('idioma')) {
      response = 'Inglés: B2 profesional (CEFR) - lectura, escritura y comprensión técnica avanzada. Puede trabajar con documentación técnica en inglés y comunicarse en entornos profesionales internacionales.';
    } else if (msg.includes('foco') || msg.includes('objetivo') || msg.includes('meta')) {
      response = 'Foco actual: Implementar IA en sectores operativos para automatización y mejora de procesos. Combina experiencia en redes con desarrollo asistido por IA. Objetivo: roles donde pueda aplicar IA en ciberseguridad y operaciones (SOC + IA, Automation Engineer, DevSecOps con IA).';
    } else if (msg.includes('cv') || msg.includes('resume') || msg.includes('descargar')) {
      response = 'Podés descargar el CV optimizado para ATS en español o inglés. Incluye keywords de Blue Team, métricas y proyectos con IA. PDFs profesionales listos para recruiters.';
    } else if (msg.includes('contacto') || msg.includes('contact') || msg.includes('email') || msg.includes('linkedin')) {
      response = 'Email: gabrielleandro.p@outlook.com | Tel: +54 11 3097-6948 | LinkedIn: linkedin.com/in/gabrielpalazzini | GitHub: github.com/dekapala | Disponibilidad: Inmediata (híbrido/remoto).';
    } else if (msg.includes('hola') || msg.includes('hello') || msg.includes('hi')) {
      response = '¡Hola! 👋 Podés preguntarme sobre: experiencia (11 años), proyectos con IA (portfolio, RepoAnalisis2, labs), certificaciones, foco en implementación de IA en sectores, o cómo contactar a Gabriel.';
    } else {
      response = 'Podés preguntarme sobre: experiencia laboral, proyectos desarrollados con IA (este portfolio, RepoAnalisis2, labs de ciberseguridad), certificaciones, foco actual en IA para sectores, skills técnicos, o contacto. ¿Qué te interesa?';
    }
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 500);
    
    setInputMessage('');
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-neutral-900'}`}>
      
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-colors ${darkMode ? 'bg-neutral-900/60 border-b border-neutral-800' : 'bg-white/80 border-b border-neutral-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/20'}`}>
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Gabriel Palazzini
                </h1>
                <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Network Operations → Blue Team (SOC) Transition
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://github.com/dekapala" target="_blank" rel="noopener noreferrer" className={`hover:text-cyan-400 transition ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/gabrielpalazzini" target="_blank" rel="noopener noreferrer" className={`hover:text-cyan-400 transition ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:gabrielleandro.p@outlook.com" className={`hover:text-cyan-400 transition ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <Mail className="w-5 h-5" />
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-yellow-400' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        <section className={`rounded-2xl p-8 border transition-all ${darkMode ? 'bg-gradient-to-br from-neutral-900 to-neutral-950 border-neutral-800 shadow-2xl shadow-cyan-500/5' : 'bg-white border-neutral-200 shadow-lg'}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' : 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30'}`}>
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">Network Operations → Blue Team (SOC) Transition</h2>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                <span className="font-semibold">11+ años en redes críticas DOCSIS/HFC</span> (Telecom Argentina). Formación defensiva con <span className="text-cyan-400 font-semibold">Suricata IDS</span>, análisis de tráfico (Wireshark/tcpdump/pcap), <span className="text-cyan-400 font-semibold">triaje y respuesta inicial</span> en laboratorio (Docker/Kubernetes), <span className="text-cyan-400 font-semibold">SIEM (Wazuh/Splunk – lab)</span> y <span className="text-cyan-400 font-semibold">MITRE ATT&CK</span>. <span className="font-semibold">Prompt Engineering + Python</span> para acelerar investigación y automatización. <span className="font-semibold">Objetivo: SOC Analyst (L1–L2)</span> con foco en detección y tuning de reglas.
              </p>

              {/* ÚNICO RECUADRO CONSOLIDADO SOBRE IA */}
              <div className={`rounded-xl p-5 border ${darkMode ? 'bg-gradient-to-br from-purple-950/20 to-cyan-950/20 border-purple-900/30' : 'bg-gradient-to-br from-purple-50 to-cyan-50 border-purple-200'}`}>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
                      <span className="text-purple-400">Desarrollo 100% asistido por IA</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-200 text-purple-700'}`}>
                        Foco actual
                      </span>
                    </h3>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Todos mis proyectos desarrollados con <span className="font-semibold text-cyan-400">Prompt Engineering avanzado</span> (ChatGPT, Claude, Gemini): este portfolio completo, RepoAnalisis2 (herramienta interna de reportería), y labs de ciberseguridad. <span className="font-semibold">Objetivo: implementar IA en sectores operativos</span> para automatización y mejora de procesos.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-purple-900/30 border-purple-700/50 text-purple-300' : 'bg-purple-100 border-purple-300 text-purple-700'}`}>
                        ChatGPT
                      </span>
                      <span className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-purple-900/30 border-purple-700/50 text-purple-300' : 'bg-purple-100 border-purple-300 text-purple-700'}`}>
                        Claude AI
                      </span>
                      <span className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-purple-900/30 border-purple-700/50 text-purple-300' : 'bg-purple-100 border-purple-300 text-purple-700'}`}>
                        Gemini
                      </span>
                      <span className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-cyan-900/30 border-cyan-700/50 text-cyan-300' : 'bg-cyan-100 border-cyan-300 text-cyan-700'}`}>
                        Prompt Engineering
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className={`text-center p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="text-2xl font-bold text-cyan-400 mb-1">11+</div>
              <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Años Network Ops</div>
            </div>
            <div className={`text-center p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="text-2xl font-bold text-emerald-400 mb-1">5</div>
              <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Certificaciones</div>
            </div>
            <div className={`text-center p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
              <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Proyectos con IA</div>
            </div>
            <div className={`text-center p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="text-2xl font-bold text-blue-400 mb-1">B2</div>
              <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Inglés Profesional</div>
            </div>
          </div>

          <div className={`rounded-lg p-4 border ${darkMode ? 'bg-blue-950/10 border-blue-900/30' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-2">Objetivo Profesional</h3>
                <p className={`text-xs ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <span className="font-semibold">SOC Analyst (Entry/Mid)</span> con foco en detección, triaje y respuesta. Interés especial en roles que combinen ciberseguridad con implementación de IA: automatización de análisis, SIEM con IA, o desarrollo de herramientas inteligentes para equipos de seguridad.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className={`px-3 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'}`}>
              DISPONIBILIDAD INMEDIATA
            </span>
            <span className={`px-3 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'bg-blue-500/20 text-blue-700 border border-blue-500/30'}`}>
              HÍBRIDO / REMOTO
            </span>
            <span className={`px-3 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-purple-500/20 text-purple-700 border border-purple-500/30'}`}>
              Buenos Aires, Argentina
            </span>
            <span className={`px-3 py-1 rounded text-xs font-semibold ${darkMode ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-cyan-500/20 text-cyan-700 border border-cyan-500/30'}`}>
              Inglés B2 Profesional
            </span>
          </div>
        </section>

        <section className={`rounded-2xl p-6 border transition-all hover:shadow-lg ${darkMode ? 'bg-neutral-950/50 border-neutral-800 hover:shadow-cyan-500/10' : 'bg-white border-neutral-200 hover:shadow-xl'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold">Curriculum Vitae</h3>
            <span className={`ml-auto text-xs px-2 py-1 rounded border ${darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'}`}>
              Optimizado ATS
            </span>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3">
            <a 
              href={CV_LINKS.spanish}
              download="Gabriel-Palazzini-CV-ES.pdf"
              className={`group flex flex-col gap-2 p-4 rounded-lg border transition-all hover:scale-105 ${darkMode ? 'bg-neutral-900/50 border-neutral-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' : 'bg-neutral-50 border-neutral-200 hover:border-cyan-500 hover:shadow-md'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${darkMode ? 'bg-cyan-500/10' : 'bg-cyan-500/20'}`}>
                    <Shield className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-semibold text-sm ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      Español
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      Keywords ATS incluidos
                    </span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-cyan-400" />
              </div>
            </a>

            <a 
              href={CV_LINKS.english}
              download="Gabriel-Palazzini-CV-EN.pdf"
              className={`group flex flex-col gap-2 p-4 rounded-lg border transition-all hover:scale-105 ${darkMode ? 'bg-neutral-900/50 border-neutral-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20' : 'bg-neutral-50 border-neutral-200 hover:border-blue-500 hover:shadow-md'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${darkMode ? 'bg-blue-500/10' : 'bg-blue-500/20'}`}>
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-semibold text-sm ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      English
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      ATS Keywords included
                    </span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-blue-400" />
              </div>
            </a>
          </div>
        </section>

        <section className={`rounded-2xl border transition-all ${darkMode ? 'bg-neutral-950/50 border-neutral-800 hover:border-cyan-500/30' : 'bg-white border-neutral-200'}`}>
          <button 
            onClick={() => toggleSection('experience')}
            className={`w-full flex items-center justify-between p-6 text-left transition rounded-t-2xl ${darkMode ? 'hover:bg-neutral-900/30' : 'hover:bg-neutral-50'}`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold">Experiencia Laboral</h3>
              <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-500/20 text-cyan-700'}`}>
                11 años con progresión
              </span>
            </div>
            {expandedSections.experience ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.experience && (
            <div className="px-6 pb-6 space-y-4">
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">Analista Técnico de Operaciones Regionales / Network Analyst</h4>
                    <p className="text-sm text-cyan-400">Telecom Argentina - Buenos Aires</p>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Nov 2016 - Actualidad</span>
                </div>
                <ul className={`text-sm space-y-1.5 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li>• Monitoreo preventivo de redes HFC (fibra y coaxial) con ServAssure NXT y Grafana</li>
                  <li>• Gestión de fallas masivas, optimizando tiempos de resolución</li>
                  <li>• Soporte técnico avanzado a clientes residenciales y corporativos: Internet, LAN/WAN, VoIP, FTTH, DNS/DHCP</li>
                  <li>• Diagnóstico de red mediante análisis de CM y niveles de señal (RX, TX, MER)</li>
                  <li>• Desarrollo de herramientas con IA para análisis ágil y reportería automatizada del sector</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">Soporte Técnico Corporativo</h4>
                    <p className="text-sm text-cyan-400">Telecom Argentina</p>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Jun 2015 - Nov 2016</span>
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li>• Soporte a servicios corporativos: IPs fijas, DNS, registros MX/SPF/A</li>
                  <li>• Gestión de hosting y bases de datos MySQL</li>
                  <li>• Seguimiento técnico de enlaces de fibra y dedicados</li>
                </ul>
              </div>

              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">Soporte Técnico Residencial</h4>
                    <p className="text-sm text-cyan-400">Telecom Argentina</p>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>May 2014 - Jun 2015</span>
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li>• Atención técnica a usuarios residenciales: Internet, STB, VoIP y correo</li>
                  <li>• Análisis de reclamos y resolución efectiva de incidencias</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        <section className={`rounded-2xl border transition-all ${darkMode ? 'bg-neutral-950/50 border-neutral-800 hover:border-cyan-500/30' : 'bg-white border-neutral-200'}`}>
          <button 
            onClick={() => toggleSection('projects')}
            className={`w-full flex items-center justify-between p-6 text-left transition rounded-t-2xl ${darkMode ? 'hover:bg-neutral-900/30' : 'hover:bg-neutral-50'}`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">Proyectos con IA + Blue Team</h3>
              <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-500/20 text-purple-700'}`}>
                100% AI-Powered
              </span>
            </div>
            {expandedSections.projects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.projects && (
            <div className="px-6 pb-6 space-y-3">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 rounded-lg border transition-all hover:scale-[1.02] ${darkMode ? 'bg-neutral-900/50 border-neutral-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' : 'bg-neutral-50 border-neutral-200 hover:border-cyan-500 hover:shadow-md'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      {project.title}
                      <ExternalLink className="w-3 h-3" />
                    </h4>
                  </div>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    {project.description}
                  </p>
                  <div className={`flex items-start gap-2 mb-3 p-2 rounded ${darkMode ? 'bg-purple-950/20' : 'bg-purple-50'}`}>
                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                      <span className="font-semibold">Desarrollado con IA:</span> {project.result}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-neutral-800 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className={`rounded-2xl border transition-all ${darkMode ? 'bg-neutral-950/50 border-neutral-800 hover:border-cyan-500/30' : 'bg-white border-neutral-200'}`}>
          <button 
            onClick={() => toggleSection('skills')}
            className={`w-full flex items-center justify-between p-6 text-left transition rounded-t-2xl ${darkMode ? 'hover:bg-neutral-900/30' : 'hover:bg-neutral-50'}`}
          >
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold">Habilidades Técnicas</h3>
              <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-500/20 text-purple-700'}`}>
                Keywords ATS
              </span>
            </div>
            {expandedSections.skills ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.skills && (
            <div className="px-6 pb-6">
              <div className="grid lg:grid-cols-3 gap-4 mb-6">
                <div className={`lg:col-span-2 space-y-4`}>
                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-purple-950/10 border-purple-900/30' : 'bg-purple-50 border-purple-200'}`}>
                    <h4 className="text-sm font-semibold mb-3 text-purple-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Tools & Prompt Engineering (Foco Actual)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['ChatGPT', 'Claude AI', 'Gemini', 'GitHub Copilot', 'Prompt Engineering', 'Análisis con IA', 'Automatización IA', 'Desarrollo Asistido'].map(skill => (
                        <span key={skill} className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-neutral-900 border-purple-500/30 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-red-950/10 border-red-900/30' : 'bg-red-50 border-red-200'}`}>
                    <h4 className="text-sm font-semibold mb-3 text-red-400">Blue Team (Dominio Actual)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Suricata IDS', 'Reglas ET', 'pcap', 'tcpdump', 'Wireshark', 'Triage', 'Detección', 'SIEM (Splunk/Wazuh)', 'MITRE ATT&CK', 'Respuesta', 'Telemetría', 'IOC/IOA'].map(skill => (
                        <span key={skill} className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-neutral-900 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-blue-950/10 border-blue-900/30' : 'bg-blue-50 border-blue-200'}`}>
                    <h4 className="text-sm font-semibold mb-3 text-blue-400">Infraestructura / Monitoreo (11+ años)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['DOCSIS/HFC', 'SNMP', 'ServAssure NXT', 'Grafana', 'Nagios/Icinga', 'TCP/IP', 'VLANs', 'DNS/DHCP', 'RX/TX/MER'].map(skill => (
                        <span key={skill} className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-neutral-900 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-emerald-950/10 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'}`}>
                    <h4 className="text-sm font-semibold mb-3 text-emerald-400">Dev / Automation</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Parsing/Logs', 'Bash', 'Git', 'Docker', 'Kubernetes', 'IaC', 'Ansible', 'React', 'TypeScript', 'HTML/CSS'].map(skill => (
                        <span key={skill} className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-neutral-900 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-cyan-950/10 border-cyan-900/30' : 'bg-cyan-50 border-cyan-200'}`}>
                    <h4 className="text-sm font-semibold mb-3 text-cyan-400">Laboratorio Activo (En Progreso)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Nmap', 'Nessus', 'Metasploit', 'Burp Suite', 'OWASP ZAP', 'AWS (EC2/S3/VPC)', 'EDR (lab)', 'Tuning Suricata'].map(skill => (
                        <span key={skill} className={`text-xs px-2 py-1 rounded border ${darkMode ? 'bg-neutral-900 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD FLOTANTE: IA × SECURITY */}
                <div className={`rounded-xl p-5 border h-fit sticky top-24 ${darkMode ? 'bg-gradient-to-br from-cyan-950/30 to-purple-950/30 border-cyan-900/50' : 'bg-gradient-to-br from-cyan-50 to-purple-50 border-cyan-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-semibold text-sm">Insight: IA × Security</h4>
                  </div>
                  
                  <p className={`text-xs mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    ¿Por qué esta combinación funciona?
                  </p>

                  <div className={`text-xs space-y-2 mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">→</span>
                      <div>
                        <span className="font-semibold text-cyan-400">Integridad:</span> Validación automática de datos y prevención de alteraciones
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">→</span>
                      <div>
                        <span className="font-semibold text-purple-400">Confidencialidad:</span> Análisis sin exposición de datos sensibles
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">→</span>
                      <div>
                        <span className="font-semibold text-blue-400">Disponibilidad:</span> Monitoreo 24/7 sin fatiga humana
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">→</span>
                      <div>
                        <span className="font-semibold text-emerald-400">Detección:</span> Identificación de anomalías en tiempo real
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">→</span>
                      <div>
                        <span className="font-semibold text-amber-400">Automatización:</span> Respuesta inmediata a incidentes
                      </div>
                    </div>
                  </div>

                  <div className={`pt-3 border-t text-xs ${darkMode ? 'border-cyan-900/50 text-neutral-300' : 'border-cyan-200 text-neutral-700'}`}>
                    <p className="font-semibold mb-1">La evolución natural:</p>
                    <p>De gestionar redes críticas a protegerlas con inteligencia artificial.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className={`rounded-2xl border transition-all ${darkMode ? 'bg-neutral-950/50 border-neutral-800 hover:border-cyan-500/30' : 'bg-white border-neutral-200'}`}>
          <button 
            onClick={() => toggleSection('certs')}
            className={`w-full flex items-center justify-between p-6 text-left transition rounded-t-2xl ${darkMode ? 'hover:bg-neutral-900/30' : 'hover:bg-neutral-50'}`}
          >
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold">Educación & Certificaciones</h3>
            </div>
            {expandedSections.certs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSections.certs && (
            <div className="px-6 pb-6 space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCert(cert)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${darkMode ? 'bg-neutral-900/50 border-neutral-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' : 'bg-neutral-50 border-neutral-200 hover:border-cyan-500 hover:shadow-md'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        {cert.name}
                        <ExternalLink className="w-3 h-3" />
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        {cert.issuer}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`}>
                      {cert.year}
                    </span>
                  </div>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Click para ver skills adquiridos →
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCert(null)}>
          <div
            className={`max-w-2xl w-full rounded-2xl border shadow-2xl overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{selectedCert.name}</h3>
                  <p className="text-sm text-cyan-400">{selectedCert.issuer} • {selectedCert.year}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-cyan-400">Descripción</h4>
                <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {selectedCert.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-cyan-400">Habilidades Adquiridas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-1 rounded-full border ${darkMode ? 'bg-neutral-800 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCert.link && (
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline"
                >
                  Más información sobre esta certificación
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className={`mb-4 w-80 sm:w-96 rounded-2xl border shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 shadow-cyan-500/10' : 'bg-white border-neutral-200 shadow-xl'}`}>
            <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-sm">Asistente Inteligente</span>
                <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-500/20 text-purple-700'}`}>
                  <Sparkles className="w-3 h-3" />
                  Creado con IA
                </span>
              </div>
              <button onClick={() => setChatOpen(false)} className={`transition ${darkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-600 hover:text-neutral-900'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? darkMode ? 'bg-cyan-500/20 text-cyan-100' : 'bg-cyan-500 text-white'
                      : darkMode ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={`p-4 border-t ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Pregunta sobre Gabriel..."
                  className={`flex-1 px-3 py-2 rounded-lg text-sm border ${darkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-500' : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'}`}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 flex items-center justify-center transition-all hover:scale-110"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>

    </div>
  );
};

export default App;