import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá, meu nome é ${form.nome}.%0ATelefone: ${form.telefone}%0A%0A${form.mensagem}`;
    window.open(`https://wa.me/${COMPANY.phoneRaw}?text=${msg}`, "_blank");
    setSent(true);
  };

  const infos = [
    { icon: Phone, label: "Telefone / WhatsApp", value: COMPANY.phone, href: `tel:+${COMPANY.phoneRaw}` },
    { icon: Mail, label: "E-mail", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: MapPin, label: "Endereço", value: COMPANY.address },
    { icon: Clock, label: "Horário", value: COMPANY.hours },
  ];

  return (
    <section id="contato" className="section bg-neutral-50">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        {/* Info */}
        <Reveal>
          <span className="eyebrow">Fale com a gente</span>
          <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Pronto para reservar seu veículo?
          </h2>
          <p className="mt-4 text-charcoal/60">
            Nossa equipe está à disposição para encontrar o carro ou a moto ideal para você.
            Atendimento rápido e sem complicação.
          </p>

          <div className="mt-8 space-y-4">
            {infos.map((info) => {
              const Icon = info.icon;
              const content = (
                <div className="flex items-start gap-4 rounded-xl border border-charcoal/10 bg-white p-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/45">
                      {info.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-charcoal">{info.value}</p>
                  </div>
                </div>
              );
              return info.href ? (
                <a key={info.label} href={info.href} className="block transition hover:opacity-80">
                  {content}
                </a>
              ) : (
                <div key={info.label}>{content}</div>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-charcoal/45">CNPJ: {COMPANY.cnpj}</p>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <div className="rounded-2xl bg-white p-7 shadow-card ring-1 ring-charcoal/5 sm:p-9">
            {sent ? (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-brand" />
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal">
                  Quase lá!
                </h3>
                <p className="mt-2 max-w-xs text-sm text-charcoal/60">
                  Abrimos o WhatsApp com sua mensagem. É só enviar que retornamos rapidinho.
                </p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-6">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-xl font-bold text-charcoal">Solicite um orçamento</h3>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal/55">
                    Nome
                  </span>
                  <input
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="input"
                    placeholder="Seu nome completo"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal/55">
                    Telefone
                  </span>
                  <input
                    required
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    className="input"
                    placeholder="(92) 9 0000-0000"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal/55">
                    Mensagem
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="input resize-none"
                    placeholder="Conte qual veículo e período você precisa."
                  />
                </label>
                <button type="submit" className="btn-primary w-full text-base">
                  Enviar pelo WhatsApp <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
