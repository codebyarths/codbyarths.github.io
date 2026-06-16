import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "./Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export default function Testimonials() {
  return (
    <section className="section bg-neutral-50">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Quem anda com a MCM, recomenda
          </h2>
          <p className="mt-4 text-charcoal/60">
            Mais de 5.700 clientes já confiaram na nossa frota.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="relative flex h-full flex-col rounded-2xl bg-white p-7 shadow-card ring-1 ring-charcoal/5">
                <Quote className="h-9 w-9 text-brand/25" />
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-brand text-brand" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-charcoal/75">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-charcoal/10 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-grad font-display text-sm font-bold text-white">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-charcoal/55">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
