import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS, WHATSAPP } from "@/lib/data";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Tudo o que você precisa saber antes de alugar
          </h2>
          <p className="mt-4 text-charcoal/60">
            Não encontrou sua resposta? Fale com a gente no WhatsApp, respondemos rápido.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-dark mt-6">
            Tirar dúvidas
          </a>
        </Reveal>

        <Reveal delay={120} className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-charcoal">{f.q}</span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen ? "bg-brand-grad text-white" : "bg-brand/10 text-brand"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="min-h-0 text-sm leading-relaxed text-charcoal/65">{f.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
