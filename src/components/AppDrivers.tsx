import { Check, Zap } from "lucide-react";
import { WHATSAPP } from "@/lib/data";
import Reveal from "./Reveal";

const BENEFITS = [
  "Planos diários e semanais que cabem no bolso",
  "Carros econômicos prontos para Uber e 99",
  "Manutenção e troca de óleo por nossa conta",
  "Sem comprovação de renda complicada",
  "Carro reserva se o seu precisar de revisão",
];

export default function AppDrivers() {
  return (
    <section id="app" className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -right-32 top-0 h-full w-1/2">
        <img src="/brand/moto.jpg" alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>

      <div className="container-x relative z-10">
        <div className="max-w-2xl text-white">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
            <Zap className="h-3.5 w-3.5 fill-brand text-brand" />
            Motoristas de aplicativo
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Trabalhe com aplicativo dirigindo um carro da MCM
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Comece a rodar hoje com diárias acessíveis e suporte de verdade. Você cuida das
            corridas, a MCM cuida do carro.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <Reveal key={b}>
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-grad text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm">{b}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary mt-9 text-base">
            Quero alugar para trabalhar
          </a>
        </div>
      </div>
    </section>
  );
}
