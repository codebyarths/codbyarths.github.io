import { ArrowRight, Phone } from "lucide-react";
import { COMPANY, WHATSAPP } from "@/lib/data";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="bg-white py-4">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-12 sm:px-12 lg:py-16">
            <img
              src="/brand/road.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl text-white">
                <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  Garanta seu carro para <span className="text-brand">hoje mesmo</span>
                </h2>
                <p className="mt-3 text-white/70">
                  Frota disponível e atendimento imediato. Reserve agora e retire no mesmo dia.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary text-base">
                  Reservar agora <ArrowRight className="h-4 w-4" />
                </a>
                <a href={`tel:+${COMPANY.phoneRaw}`} className="btn-outline text-base">
                  <Phone className="h-4 w-4" /> {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
