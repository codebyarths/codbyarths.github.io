import {
  ShieldCheck,
  Gauge,
  Headset,
  FileCheck2,
  MapPin,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/lib/data";
import Reveal from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  Headset,
  FileCheck2,
  MapPin,
  Wrench,
};

export default function Features() {
  return (
    <section id="diferenciais" className="section bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Por que a MCM</span>
          <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Tudo o que você precisa para rodar tranquilo
          </h2>
          <p className="mt-4 text-charcoal/60">
            Mais de 27 anos cuidando da mobilidade de quem confia na MCM Rent a Car.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon] ?? ShieldCheck;
            return (
              <Reveal key={f.title} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-charcoal/10 bg-white p-7 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-card">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand-grad group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-charcoal">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
