import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, WHATSAPP, COMPANY } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-ink/80"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3" aria-label={COMPANY.name}>
          <img
            src="/brand/logo-mcm.jpg"
            alt={COMPANY.name}
            className="h-11 w-auto rounded-md ring-1 ring-white/10"
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:+${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-brand"
          >
            <Phone className="h-4 w-4 text-brand" />
            {COMPANY.phone}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary">
            Reservar agora
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-ink/98 backdrop-blur transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[420px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-brand"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-2 w-full"
          >
            Reservar agora
          </a>
        </div>
      </div>
    </header>
  );
}
