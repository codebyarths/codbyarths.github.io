import { STEPS } from "@/lib/data";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Como funciona</span>
          <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Alugar com a MCM é simples assim
          </h2>
          <p className="mt-4 text-charcoal/60">Três passos e você já está com a chave na mão.</p>
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />

          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 110} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-grad font-display text-xl font-extrabold text-white shadow-glow ring-8 ring-white">
                {i + 1}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-charcoal">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-charcoal/60">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
