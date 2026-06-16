import { useState } from "react";
import { Star, CheckCircle2, CalendarDays, MapPin, Car, ArrowRight } from "lucide-react";
import { COMPANY, FLEET, WHATSAPP } from "@/lib/data";

export default function Hero() {
  const [form, setForm] = useState({
    local: "Loja - Distrito Industrial",
    retirada: "",
    devolucao: "",
    categoria: FLEET[0].category,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Quero fazer uma reserva na MCM Rent a Car.%0A%0A• Retirada: ${form.local}%0A• Data de retirada: ${
      form.retirada || "a combinar"
    }%0A• Data de devolução: ${form.devolucao || "a combinar"}%0A• Categoria: ${form.categoria}`;
    window.open(`https://wa.me/${COMPANY.phoneRaw}?text=${msg}`, "_blank");
  };

  return (
    <section id="inicio" className="relative flex min-h-[760px] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/brand/hero.png"
          alt="Frota MCM Rent a Car"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="container-x relative z-10 grid items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-28">
        {/* Copy */}
        <div className="max-w-xl text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
            <Star className="h-3.5 w-3.5 fill-brand text-brand" />
            Locadora nº 1 em {COMPANY.city}
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-[1.07] text-balance sm:text-5xl lg:text-6xl">
            Sua frota pronta <span className="text-brand">para rodar</span> hoje mesmo
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-white/80">
            Aluguel de carros e motos com agilidade e sem burocracia. Para o seu dia a dia,
            sua viagem ou para trabalhar com aplicativo — escolha, reserve e dirija.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#frota" className="btn-primary text-base">
              Ver a frota <ArrowRight className="h-4 w-4" />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-outline text-base">
              Falar no WhatsApp
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
            {["Seguro incluso", "Suporte 24h", "Sem fidelidade"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking card */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-white/10 bg-white p-6 shadow-card sm:p-7"
        >
          <h3 className="font-display text-xl font-bold text-charcoal">Reserve em 1 minuto</h3>
          <p className="mt-1 text-sm text-charcoal/60">
            Confirme a disponibilidade direto no WhatsApp.
          </p>

          <div className="mt-5 space-y-4">
            <Field label="Local de retirada" icon={<MapPin className="h-4 w-4" />}>
              <select
                value={form.local}
                onChange={(e) => setForm({ ...form, local: e.target.value })}
                className="input"
              >
                <option>Loja - Distrito Industrial</option>
                <option>Aeroporto de Manaus</option>
                <option>Entrega no endereço</option>
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Retirada" icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  type="date"
                  value={form.retirada}
                  onChange={(e) => setForm({ ...form, retirada: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Devolução" icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  type="date"
                  value={form.devolucao}
                  onChange={(e) => setForm({ ...form, devolucao: e.target.value })}
                  className="input"
                />
              </Field>
            </div>

            <Field label="Categoria" icon={<Car className="h-4 w-4" />}>
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="input"
              >
                {FLEET.map((v) => (
                  <option key={v.category}>{v.category}</option>
                ))}
              </select>
            </Field>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full text-base">
            Solicitar reserva <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-center text-xs text-charcoal/50">
            Resposta rápida • Sem compromisso
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-charcoal/55">
        <span className="text-brand">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
