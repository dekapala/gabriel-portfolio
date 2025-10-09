import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, Shield, Code, Lock, Server, Brain, Sparkles, ExternalLink, Download, MessageCircle, Send, X } from 'lucide-react';

interface Message {
  role: string;
  content: string;
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const knowledgeBase = {
    experiencia: {
      keywords: ['experiencia', 'años', 'trabajo', 'carrera', 'trayectoria', 'experience', 'years', 'career'],
      answer: "Gabriel tiene 11+ años de experiencia en Telecom Argentina como Network Analyst, especializado en infraestructura DOCSIS, monitoreo de redes HFC con ServAssure NXT y Grafana, troubleshooting LAN/WAN/VoIP, y gestión de incidentes críticos. Actualmente en transición activa hacia ciberseguridad."
    },
    cybersecurity: {
      keywords: ['ciberseguridad', 'seguridad', 'hacking', 'pentesting', 'soc', 'ids', 'cybersecurity', 'security', 'ethical hacking'],
      answer: "Gabriel se está especializando en ciberseguridad con laboratorios SOC propios usando Suricata IDS, automatización con Docker/Kubernetes, entornos vulnerables DVWA, y proyectos de detección de intrusiones. Certificado en Ethical Hacking (UTN FRBA), Cisco Cybersecurity Analyst, y Fortinet Fundamentals. Ha desarrollado 5 proyectos prácticos de security."
    },
    proyectos: {
      keywords: ['proyectos', 'github', 'repositorios', 'desarrollos', 'projects', 'repos'],
      answer: "Gabriel tiene 5 proyectos destacados: 1) Network Intrusion Detector (IDS con Python/Scapy), 2) K8s SOC Lab (laboratorio con Suricata), 3) CyberLab Infrastructure (entornos vulnerables con Docker), 4) Port Scanner (reconocimiento de red), 5) Repo Análisis 2.0 (gestión de equipos para Telecom). Todos desarrollados 100% con IA (ChatGPT, Claude, Gemini). GitHub: github.com/dekapala"
    },
    ia: {
      keywords: ['ia', 'inteligencia artificial', 'chatgpt', 'claude', 'gemini', 'ai', 'artificial intelligence'],
      answer: "Gabriel utiliza IA (ChatGPT, Claude, Gemini, GitHub Copilot) como herramientas principales de desarrollo. TODO su GitHub fue construido 100% con IA, lo que le permite acelerar el aprendizaje, desarrollar proyectos complejos, automatizar tareas de security y mantener best practices en código."
    },
    skills: {
      keywords: ['habilidades', 'skills', 'tecnologías', 'herramientas', 'tools', 'conocimientos', 'tech stack'],
      answer: "Skills principales: Redes (CCNA, DOCSIS, TCP/IP, VLANs, DNS/DHCP, ServAssure NXT, Grafana), Ciberseguridad (Suricata IDS, OWASP ZAP, Nmap, Nessus, Metasploit, SIEM), Cloud/DevOps (AWS, Docker, Kubernetes, IaC, Ansible), Desarrollo (Python, Git, Linux, Bash), IA (ChatGPT, Claude, Gemini, Copilot)."
    },
    certificaciones: {
      keywords: ['certificaciones', 'certificados', 'títulos', 'certifications', 'certs', 'diplomas'],
      answer: "Certificaciones: ISC2 Candidate (en curso), Junior Cybersecurity Analyst (Cisco 2024), Fortinet Fundamentals in Cybersecurity (2023), Cloud Computing AWS (Educación IT 2023), Experto Universitario en Hacking Ético (UTN FRBA 2021-2022), CCNA v7 (Cisco 2020-2021)."
    },
    disponibilidad: {
      keywords: ['disponibilidad', 'cuando', 'empezar', 'inicio', 'available', 'start', 'begin', 'availability'],
      answer: "Gabriel tiene disponibilidad INMEDIATA. Modalidad preferida: Híbrido o Remoto. Ubicación: Buenos Aires, Argentina. Puede comenzar de inmediato en roles como SOC Analyst, Security Engineer, Junior Pentester o similares."
    },
    contacto: {
      keywords: ['contacto', 'email', 'teléfono', 'linkedin', 'mail', 'phone', 'contact', 'reach'],
      answer: "Contacto: Email: gabrielleandro.p@outlook.com o gabrielleandro.p@gmail.com, Teléfono/WhatsApp: +54 11 3097-6948, LinkedIn: linkedin.com/in/gabrielpalazzini, GitHub: github.com/dekapala. Responde rápido, está muy activo en búsqueda de oportunidades."
    },
    idiomas: {
      keywords: ['idiomas', 'inglés', 'español', 'languages', 'english', 'spanish'],
      answer: "Idiomas: Español (nativo), Inglés B2 nivel profesional (lectura y escritura avanzada, oral en desarrollo activo). Puede trabajar en equipos internacionales y leer documentación técnica en inglés sin problema."
    },
    sueldo: {
      keywords: ['sueldo', 'salario', 'pretensión', 'salary', 'compensation', 'pay'],
      answer: "Para temas de compensación y expectativas salariales, te recomiendo contactarlo directamente. Gabriel está abierto a negociar según el rol y la empresa. Contacto: gabrielleandro.p@outlook.com"
    },
    roles: {
      keywords: ['rol', 'posición', 'puesto', 'trabajo', 'job', 'position', 'role'],
      answer: "Gabriel busca roles como: SOC Analyst (L1/L2), Security Engineer, Junior Penetration Tester, Cybersecurity Analyst, o posiciones similares donde pueda aplicar su experiencia en redes + su formación en ciberseguridad. Abierto a posiciones híbridas o remotas."
    }
  };

  const findBestAnswer = (userInput: string) => {
    const input = userInput.toLowerCase().trim();
    
    for (const [, data] of Object.entries(knowledgeBase)) {
      const hasMatch = data.keywords.some(keyword => input.includes(keyword));
      if (hasMatch) {
        return data.answer;
      }
    }
    
    return "Esa es una buena pregunta. Para información específica sobre ese tema, te recomiendo:\n\n• Revisar las secciones del portfolio arriba\n• Contactar directamente a Gabriel: gabrielleandro.p@outlook.com\n• Conectar en LinkedIn: linkedin.com/in/gabrielpalazzini\n\n¿Hay algo más sobre su experiencia, proyectos o disponibilidad que pueda ayudarte?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findBestAnswer(inputMessage);
      const botMessage: Message = { role: 'assistant', content: answer };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const projects = [
    {
      name: "Network Intrusion Detector",
      description: "IDS con Python y Scapy para detección de port scans y ARP spoofing en tiempo real.",
      tech: ["Python", "Scapy", "IDS"],
      github: "https://github.com/dekapala/network-intrusion-detector",
      aiTool: "Claude + ChatGPT",
      category: "security"
    },
    {
      name: "K8s SOC Lab",
      description: "Laboratorio defensivo en Kubernetes con Suricata IDS para monitoreo de amenazas.",
      tech: ["Kubernetes", "Suricata", "Docker"],
      github: "https://github.com/dekapala/k8s-soc-lab",
      aiTool: "ChatGPT",
      category: "security"
    },
    {
      name: "Cyberlab Infrastructure",
      description: "Infraestructura automatizada con Docker e IaC para entornos vulnerables (DVWA).",
      tech: ["Docker", "IaC", "DVWA"],
      github: "https://github.com/dekapala/cyberlab-infra",
      aiTool: "Claude",
      category: "security"
    },
    {
      name: "Port Scanner",
      description: "Escáner de puertos en Python para reconocimiento de red y auditorías.",
      tech: ["Python", "Network Security"],
      github: "https://github.com/dekapala/port-scanner",
      aiTool: "ChatGPT + Gemini",
      category: "security"
    },
    {
      name: "Repo Análisis 2.0",
      description: "Sistema de gestión de equipos y bolsa de trabajo para Telecom Argentina.",
      tech: ["HTML", "JavaScript"],
      github: "https://github.com/dekapala/Repoanalisis2",
      aiTool: "Claude + ChatGPT",
      category: "internal"
    }
  ];

  const skills = {
    cybersecurity: ["Suricata IDS", "OWASP ZAP", "Nmap", "Nessus", "Metasploit", "SIEM", "Ethical Hacking"],
    networking: ["CCNA", "DOCSIS", "TCP/IP", "VLANs", "DNS/DHCP", "ToIP", "ServAssure NXT", "Grafana"],
    development: ["Python", "Docker", "Kubernetes", "IaC", "Git", "Linux", "Ansible"],
    cloud: ["AWS EC2", "AWS S3", "AWS VPC"],
    aiTools: ["ChatGPT", "Claude AI", "Google Gemini", "GitHub Copilot"]
  };

  const certifications = [
    { name: "ISC2 Candidate", year: "En curso", issuer: "ISC2" },
    { name: "Junior Cybersecurity Analyst", year: "2024", issuer: "Cisco" },
    { name: "Fortinet Fundamentals in Cybersecurity", year: "2023", issuer: "Fortinet" },
    { name: "Cloud Computing (AWS)", year: "2023", issuer: "Educación IT" },
    { name: "Hacking Ético", year: "2021-2022", issuer: "UTN FRBA" },
    { name: "CCNA v7", year: "2020-2021", issuer: "Cisco" }
  ];

  const filteredProjects = activeTab === 'all' ? projects : projects.filter(p => p.category === activeTab);

  const suggestedQuestions = [
    "¿Cuál es tu experiencia?",
    "¿Qué proyectos tenés?",
    "¿Cómo usás IA?",
    "¿Cuándo podés empezar?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-100">
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-xl">GP</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-cyan-400 transition">About</a>
            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
          </div>
          <a href="#contact" className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm hover:bg-cyan-500/20 transition">
            Hire Me
          </a>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>100% Built with AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Gabriel Leandro Palazzini
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-lg md:text-2xl text-gray-300 mb-4">
            <span>Network Analyst</span>
            <span className="text-cyan-400">→</span>
            <span>Cybersecurity Engineer</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-8">
            <span>Buenos Aires, Argentina</span>
            <span>•</span>
            <span>11+ años experiencia</span>
            <span>•</span>
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 font-semibold">
              Disponible ya
            </div>
          </div>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Network Analyst con <span className="text-cyan-400">11+ años en Telecom</span>, en transición hacia <span className="text-green-400">ciberseguridad SOC y pentesting</span>. Todo potenciado por IA.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Contactar
            </a>
            <a href="#projects" className="px-8 py-3 border border-cyan-500/30 rounded-lg font-semibold hover:bg-cyan-500/10 transition">
              Ver Proyectos
            </a>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <a 
              href="/cv-gabriel-palazzini-es.pdf" 
              download="CV-Gabriel-Palazzini-ES.pdf"
              className="px-6 py-2.5 bg-gray-800 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition inline-flex items-center gap-2 text-sm group"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition" />
              <span>Descargar CV (Español)</span>
            </a>
            <a 
              href="/resume-gabriel-palazzini-en.pdf" 
              download="Resume-Gabriel-Palazzini-EN.pdf"
              className="px-6 py-2.5 bg-gray-800 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition inline-flex items-center gap-2 text-sm group"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition" />
              <span>Download Resume (English)</span>
            </a>
          </div>
          
          <div className="flex gap-6 justify-center">
            <a href="https://github.com/dekapala" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/gabrielpalazzini" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:gabrielleandro.p@outlook.com" className="text-gray-400 hover:text-cyan-400 transition">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-900/50 border-y border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">11+</div>
            <div className="text-sm text-gray-400">Años Telecom</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">5</div>
            <div className="text-sm text-gray-400">Proyectos Cyber</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
            <div className="text-sm text-gray-400">Con IA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">6</div>
            <div className="text-sm text-gray-400">Certificaciones</div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Sobre Mí
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold">11 Años en Redes</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Experiencia sólida en <strong className="text-cyan-400">Telecom Argentina</strong> gestionando infraestructura DOCSIS, monitoreo HFC con ServAssure NXT y Grafana, troubleshooting LAN/WAN/VoIP, y gestión de incidentes críticos.
              </p>
            </div>
            
            <div className="bg-gray-800/50 border border-green-500/20 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold">Transición a Cyber</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Labs SOC con Suricata IDS, automatización Docker/K8s, entornos vulnerables DVWA. Certificado en <strong className="text-green-400">Ethical Hacking y Cloud Security</strong>.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-cyan-400" />
              <h3 className="text-2xl font-bold">100% Desarrollado con IA</h3>
            </div>
            <p className="text-gray-400 mb-4">
              <strong className="text-cyan-400">Todo mi GitHub construido con ChatGPT, Claude y Gemini.</strong> Uso IA para acelerar aprendizaje, desarrollar proyectos complejos, automatizar security tasks y mantener best practices.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Proyectos
          </h2>
          
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Todos (5)
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === 'security' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Cybersecurity (4)
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition">{project.name}</h3>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <Brain className="w-4 h-4" />
                  <span>Con: {project.aiTool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold">Cybersecurity</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.cybersecurity.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-cyan-500/10 rounded-lg text-sm text-cyan-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Networking</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.networking.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/10 rounded-lg text-sm text-blue-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold">Development</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.development.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/10 rounded-lg text-sm text-purple-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold">AI Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.aiTools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-green-500/20 rounded-lg text-sm text-green-400 font-semibold">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Certificaciones</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div className="text-sm">
                    <div className="text-white">{cert.name}</div>
                    <div className="text-gray-400">{cert.issuer} • {cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Conectemos
          </h2>
          
          <p className="text-gray-400 mb-4">
            Busco roles como <strong className="text-cyan-400">SOC Analyst</strong>, <strong className="text-green-400">Security Engineer</strong> o <strong className="text-blue-400">Pentester</strong>.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Disponible ya • Híbrido/Remoto</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <a href="mailto:gabrielleandro.p@outlook.com" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition group">
              <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition" />
              <div className="text-xs font-mono break-all">gabrielleandro.p@outlook.com</div>
            </a>
            
            <a href="https://linkedin.com/in/gabrielpalazzini" target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition group">
              <Linkedin className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition" />
              <div className="text-sm font-mono">gabrielpalazzini</div>
            </a>
            
            <a href="tel:+5491130976948" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition group">
              <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition" />
              <div className="text-sm font-mono">+54 11 3097-6948</div>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Built with AI • ChatGPT, Claude & Gemini</span>
          </div>
          <p>© 2025 Gabriel Leandro Palazzini</p>
        </div>
      </footer>

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute -top-14 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg border border-cyan-500/30">
            💬 Pregúntame sobre Gabriel
          </div>
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-gray-900 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <div className="font-bold text-white">AI Assistant</div>
                <div className="text-xs text-cyan-100">Preguntame sobre Gabriel</div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 p-1 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center space-y-4 mt-8">
                <div className="text-gray-400 mb-4">¡Hola! 👋 ¿Qué querés saber sobre Gabriel?</div>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInputMessage(q)}
                      className="block w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-400 text-sm">Escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed p-2 rounded-lg transition"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}