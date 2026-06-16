import { STATS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="relative z-20 -mt-px bg-ink">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="bg-ink px-6 py-9 text-center"
            >
              <div className="font-display text-4xl font-extrabold text-white lg:text-5xl">
                {s.value}
                <span className="text-brand">{s.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
