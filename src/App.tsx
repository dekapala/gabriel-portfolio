import { useEffect, useRef, useState, FormEvent, ChangeEvent } from "react";
import { Terminal, MapPin, Briefcase, Award } from "lucide-react";

// --- Tipos explícitos para evitar 'never[]' e 'any' ---
type ChatRole = "user" | "assistant" | "system";
type ChatMessage = { role: ChatRole; content: string };

// Rutas a los PDFs (tal como están en /public)
// encodeURI() maneja los espacios correctamente.
const CV_LINKS = [
  {
    label: "CV Español (PDF)",
    href: encodeURI("/CV - Gabriel Leandro Palazzini- ES.pdf"),
    download: "cv-gabriel-palazzini-es.pdf",
  },
  {
    label: "CV English (PDF)",
    href: encodeURI("/CV - Gabriel Leandro Palazzini- EN.pdf"),
    download: "resume-gabriel-palazzini-en.pdf",
  },
];

// --- Componente principal ---
const App = () => {
  // Ref para auto-scroll al final del chat
  const endRef = useRef<HTMLDivElement | null>(null);

  // Estado del chat con tipado explícito
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "¡Hola! Soy tu asistente del portfolio. ¿En qué te ayudo?" },
  ]);

  // Estado del input con tipado explícito
  const [input, setInput] = useState<string>("");

  // Auto-scroll cuando cambian los mensajes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Maneja el cambio del input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Envía el mensaje del usuario y una respuesta de ejemplo
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);

    // Respuesta de placeholder: reemplaza por tu lógica si corresponde
    const reply: ChatMessage = {
      role: "assistant",
      content:
        "Recibido. Este es un mensaje de ejemplo. Podés conectar aquí tu lógica real (APIs, acciones, etc.).",
    };

    setMessages((prev) => [...prev, reply]);
    setInput("");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-neutral-800 bg-neutral-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5" aria-hidden />
            <h1 className="text-sm font-semibold tracking-wide">
              Gabriel • Portfolio
            </h1>
          </div>
          <nav className="flex items-center gap-4 text-xs text-neutral-300">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" aria-hidden /> Buenos Aires, AR
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-4 w-4" aria-hidden /> SOC / Networking
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="h-4 w-4" aria-hidden /> Certs & Projects
            </span>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        {/* Currículums */}
        <section className="mb-6 rounded-xl border border-neutral-800 bg-neutral-900">
          <div className="border-b border-neutral-800 px-4 py-2 text-xs text-neutral-400">
            Currículums
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {CV_LINKS.map(({ label, href, download }) => (
              <a
                key={href}
                href={href}
                download={download}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 py-3 text-sm hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
              >
                <span>{label}</span>
                <span className="text-[11px] text-neutral-400">{download}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Panel de “consola/chat” */}
        <section className="rounded-xl border border-neutral-800 bg-neutral-900">
          <div className="border-b border-neutral-800 px-4 py-2 text-xs text-neutral-400">
            Interactive Console
          </div>

          {/* Mensajes */}
          <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
            {messages.map((m, idx) => (
              <div key={idx} className="mb-3">
                <div className="text-[11px] uppercase tracking-wide text-neutral-400">
                  {m.role}
                </div>
                <div className="whitespace-pre-wrap rounded-lg bg-neutral-800/60 px-3 py-2 text-sm">
                  {m.content}
