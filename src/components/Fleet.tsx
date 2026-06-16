import { useState } from "react";
import { Users, Cog, Fuel, ArrowRight } from "lucide-react";
import { FLEET, COMPANY } from "@/lib/data";
import Reveal from "./Reveal";

const CATEGORIES = ["Todos", ...Array.from(new Set(FLEET.map((v) => v.category)))];

export default function Fleet() {
  const [active, setActive] = useState("Todos");
  const list = active === "Todos" ? FLEET : FLEET.filter((v) => v.category === active);

  const reserve = (name: string, category: string) => {
    const msg = `Olá! Tenho interesse no veículo ${name} (${category}). Pode me passar a disponibilidade?`;
    window.open(`https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="frota" className="section bg-neutral-50">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Nossa frota</span>
          <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Escolha o veículo ideal para cada momento
          </h2>
          <p className="mt-4 text-charcoal/60">
            Carros novos, revisados e higienizados. Do compacto econômico ao SUV premium,
            mais motos para quem trabalha na rua.
          </p>
        </Reveal>

        {/* Filtros */}
        <Reveal className="mt-8 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === cat
                  ? "bg-ink text-white shadow"
                  : "bg-white text-charcoal/70 ring-1 ring-charcoal/10 hover:text-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Cards */}
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => (
            <Reveal key={v.name} delay={i * 70}>
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 transition hover:-translate-y-1 ${
                  v.highlight ? "ring-2 ring-brand" : "ring-charcoal/5"
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {v.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-brand-grad px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                      {v.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8 text-xs font-medium uppercase tracking-wider text-white/90">
                    {v.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-charcoal">{v.name}</h3>

                  <ul className="mt-4 grid grid-cols-3 gap-2 text-xs text-charcoal/60">
                    <Spec icon={<Users className="h-4 w-4" />} label={`${v.seats} lugares`} />
                    <Spec icon={<Cog className="h-4 w-4" />} label={v.transmission} />
                    <Spec icon={<Fuel className="h-4 w-4" />} label={v.fuel} />
                  </ul>

                  <div className="mt-5 flex items-end justify-between border-t border-charcoal/10 pt-4">
                    <div>
                      <p className="text-xs text-charcoal/50">a partir de</p>
                      <p className="font-display text-2xl font-extrabold text-charcoal">
                        R$ {v.pricePerDay}
                        <span className="text-sm font-medium text-charcoal/50">/dia</span>
                      </p>
                    </div>
                    <button
                      onClick={() => reserve(v.name, v.category)}
                      className="btn-primary px-5 py-2.5"
                    >
                      Reservar <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex flex-col items-center gap-1 rounded-lg bg-neutral-50 py-2 text-center">
      <span className="text-brand">{icon}</span>
      <span className="leading-tight">{label}</span>
    </li>
  );
}
