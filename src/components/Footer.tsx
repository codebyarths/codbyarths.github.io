import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { COMPANY, NAV, FLEET, WHATSAPP } from "@/lib/data";

export default function Footer() {
  const year = 2026;
  const categories = Array.from(new Set(FLEET.map((v) => v.category)));

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/brand/logo-mcm.jpg"
            alt={COMPANY.name}
            className="h-12 w-auto rounded-md ring-1 ring-white/10"
          />
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            Locação ágil de carros e motos em {COMPANY.city}. Frota nova, suporte 24h e os
            melhores planos para o seu dia a dia.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-brand hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-brand hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Navegação
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition hover:text-brand">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Categorias
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c}>
                <a href="#frota" className="transition hover:text-brand">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contato
          </h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={`tel:+${COMPANY.phoneRaw}`} className="hover:text-brand">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-brand">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {COMPANY.name} • CNPJ {COMPANY.cnpj}
          </p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
