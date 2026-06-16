import { useEffect, useRef, useState, type ReactNode } from "react";
import { MessageSquare, X, Send, RotateCcw, Bot, ExternalLink } from "lucide-react";
import { COMPANY } from "@/lib/data";
import {
  WELCOME,
  INITIAL_SUGGESTIONS,
  FALLBACK_ANSWER,
  CADASTRO_STEPS,
  matchIntent,
  isCadastroTrigger,
  cadastroToWhats,
  cadastroResumo,
  whatsLink,
  salvarCadastro,
  type CadastroData,
} from "@/lib/chatbot";

type Msg = {
  id: number;
  role: "bot" | "user";
  content: string;
  suggestions?: string[];
};

type Mode = "chat" | "cadastro" | "done";

let idSeq = 1;
const nextId = () => idSeq++;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CadastroData>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<CadastroData>({});
  dataRef.current = data;

  // Teaser depois de alguns segundos (só se nunca abriu).
  useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Mensagem de boas-vindas ao abrir pela primeira vez.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: nextId(), role: "bot", content: WELCOME, suggestions: INITIAL_SUGGESTIONS },
      ]);
    }
    if (open) {
      setTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const pushUser = (content: string) =>
    setMessages((m) => [...m, { id: nextId(), role: "user", content }]);

  const botSay = (content: string, suggestions?: string[], delay = 480) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId(), role: "bot", content, suggestions }]);
      setTyping(false);
    }, delay);
  };

  const startCadastro = () => {
    setMode("cadastro");
    setStep(0);
    setData({});
    const s0 = CADASTRO_STEPS[0];
    botSay(s0.question, s0.type === "options" ? s0.options : undefined);
  };

  const finalize = (finalData: CadastroData) => {
    salvarCadastro(finalData);
    setMode("done");
    botSay(cadastroResumo(finalData), undefined, 520);
  };

  const handleCadastro = (text: string) => {
    const current = CADASTRO_STEPS[step];
    const err = current.validate?.(text);
    if (err) {
      botSay(err, current.type === "options" ? current.options : undefined);
      return;
    }
    const updated = { ...dataRef.current, [current.key]: text.trim() };
    setData(updated);
    const nextStep = step + 1;
    if (nextStep < CADASTRO_STEPS.length) {
      setStep(nextStep);
      const ns = CADASTRO_STEPS[nextStep];
      botSay(ns.question, ns.type === "options" ? ns.options : undefined);
    } else {
      finalize(updated);
    }
  };

  const handleChat = (text: string) => {
    if (isCadastroTrigger(text)) {
      startCadastro();
      return;
    }
    const intent = matchIntent(text);
    if (intent) {
      botSay(intent.answer, intent.suggestions);
    } else {
      botSay(FALLBACK_ANSWER, ["Falar no WhatsApp", "Quero alugar", "Preços"]);
    }
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    pushUser(text);
    setInput("");

    // "Falar no WhatsApp" é uma ação direta em qualquer modo.
    if (text.toLowerCase().includes("whatsapp")) {
      window.open(whatsLink("Olá! Vim pelo site e gostaria de atendimento."), "_blank");
      botSay("Abri o WhatsApp para você falar com a nossa equipe. 📲 Posso ajudar em mais algo?", [
        "Quero alugar",
        "Preços",
      ]);
      return;
    }

    if (mode === "cadastro") handleCadastro(text);
    else handleChat(text);
  };

  const resetChat = () => {
    setMessages([
      { id: nextId(), role: "bot", content: WELCOME, suggestions: INITIAL_SUGGESTIONS },
    ]);
    setMode("chat");
    setStep(0);
    setData({});
    setInput("");
  };

  const enviarCadastroWhats = () => {
    window.open(whatsLink(cadastroToWhats(dataRef.current)), "_blank");
    botSay("Perfeito! Te esperamos. 🚗💨 Qualquer dúvida, é só chamar por aqui.", [
      "Fazer outro cadastro",
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send(input);
    }
  };

  const progresso = mode === "cadastro" ? Math.round((step / CADASTRO_STEPS.length) * 100) : 0;

  return (
    <>
      {/* Janela do chat */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(620px,calc(100vh-7rem))] w-[min(384px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-2xl sm:right-6">
          {/* Header */}
          <div className="flex items-center justify-between bg-ink px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-grad">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-green-400" />
              </div>
              <div>
                <p className="font-display text-sm font-bold leading-tight">Assistente MCM</p>
                <p className="text-[11px] leading-tight text-white/60">Online • responde na hora</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                title="Reiniciar conversa"
                aria-label="Reiniciar conversa"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Fechar chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Barra de progresso do cadastro */}
          {mode === "cadastro" && (
            <div className="h-1 w-full bg-neutral-100">
              <div
                className="h-full bg-brand-grad transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
          )}

          {/* Mensagens */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-neutral-50 px-3.5 py-4">
            {messages.map((m) => (
              <div key={m.id}>
                <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-ink text-white"
                        : "rounded-bl-md bg-white text-charcoal shadow-sm ring-1 ring-charcoal/5"
                    }`}
                  >
                    <RichText text={m.content} />
                  </div>
                </div>
                {/* Sugestões / opções */}
                {m.role === "bot" && m.suggestions && m.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        disabled={typing}
                        className="rounded-full border border-brand/40 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand hover:text-white disabled:opacity-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-charcoal/5">
                  <Dot /> <Dot delay={150} /> <Dot delay={300} />
                </div>
              </div>
            )}
          </div>

          {/* Rodapé: ação final do cadastro ou input */}
          {mode === "done" ? (
            <div className="space-y-2 border-t border-charcoal/10 bg-white p-3">
              <button onClick={enviarCadastroWhats} className="btn-primary w-full">
                Enviar para o WhatsApp <ExternalLink className="h-4 w-4" />
              </button>
              <button
                onClick={resetChat}
                className="w-full rounded-full py-2 text-xs font-semibold text-charcoal/55 transition hover:text-brand"
              >
                Fazer novo cadastro
              </button>
            </div>
          ) : (
            <div className="flex items-end gap-2 border-t border-charcoal/10 bg-white p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                inputMode={
                  mode === "cadastro" ? CADASTRO_STEPS[step]?.inputMode ?? "text" : "text"
                }
                placeholder={
                  mode === "cadastro" ? "Digite sua resposta..." : "Escreva sua mensagem..."
                }
                disabled={typing}
                className="h-11 flex-1 rounded-xl border border-charcoal/15 bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
              />
              <button
                onClick={() => send(input)}
                disabled={typing || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-grad text-white shadow-glow transition hover:brightness-105 disabled:opacity-40"
                aria-label="Enviar"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Teaser */}
      {teaser && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-[6.5rem] right-5 z-40 max-w-[230px] animate-fade-up rounded-2xl rounded-br-md bg-white px-4 py-3 text-left text-sm text-charcoal shadow-card ring-1 ring-charcoal/10 sm:right-6"
        >
          <span className="font-semibold">Olá! 👋</span> Posso te ajudar a alugar ou tirar dúvidas?
        </button>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-brand-grad text-white shadow-glow transition hover:scale-105 sm:right-6"
        aria-label={open ? "Fechar chat" : "Abrir chat"}
      >
        {open ? (
          <X className="h-7 w-7" />
        ) : (
          <>
            <MessageSquare className="h-7 w-7" />
            <span className="absolute right-0 top-0 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            </span>
          </>
        )}
      </button>
    </>
  );
}

/** Renderiza texto com **negrito** e quebras de linha, sem HTML perigoso. */
function RichText({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split("\n").map((line, i) => {
        if (line === "") return <span key={i} className="block h-2" />;
        return (
          <span key={i} className="block">
            {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={j} className="font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
                return <em key={j}>{part.slice(1, -1)}</em>;
              }
              return <span key={j}>{part}</span>;
            })}
          </span>
        );
      })}
    </>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-charcoal/30"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
