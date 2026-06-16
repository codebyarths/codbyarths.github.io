// Conteúdo central do site MCM Rent a Car.
// Dados de contato reais reaproveitados do site original.

export const COMPANY = {
  name: "MCM Rent a Car",
  short: "MCM",
  tagline: "Locação ágil de carros e motos",
  city: "Manaus / AM",
  phone: "(92) 98816-0415",
  phoneRaw: "5592988160415",
  email: "contato@mcmrentacar.com.br",
  address: "Av. Rodrigo Otávio, 2890 - Sala 11, Distrito Industrial, Manaus/AM",
  cnpj: "03.360.950/0001-15",
  hours: "Seg a Sex: 8h às 18h • Sáb: 8h às 12h • Suporte 24h",
};

export const WHATSAPP = `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(
  "Olá! Gostaria de fazer uma reserva na MCM Rent a Car."
)}`;

export const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Frota", href: "#frota" },
  { label: "Planos", href: "#planos" },
  { label: "Motoristas de App", href: "#app" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

export type Vehicle = {
  category: string;
  name: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuel: string;
  badge?: string;
  highlight?: boolean;
};

export const FLEET: Vehicle[] = [
  {
    category: "Compactos & Hatch",
    name: "VW Polo / similar",
    image: "/brand/compact.jpg",
    pricePerDay: 119,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    badge: "Econômico",
  },
  {
    category: "Hatch Esportivo",
    name: "Hyundai HB20S / similar",
    image: "/brand/sedan.jpg",
    pricePerDay: 159,
    seats: 5,
    transmission: "Automático",
    fuel: "Flex",
    badge: "Mais alugado",
    highlight: true,
  },
  {
    category: "Sedan & Executivo",
    name: "Mercedes CLS / similar",
    image: "/brand/road.jpg",
    pricePerDay: 289,
    seats: 5,
    transmission: "Automático",
    fuel: "Gasolina",
    badge: "Premium",
  },
  {
    category: "SUV & Premium",
    name: "Audi RS / similar",
    image: "/brand/suv.jpg",
    pricePerDay: 349,
    seats: 5,
    transmission: "Automático",
    fuel: "Gasolina",
    badge: "Top de linha",
  },
  {
    category: "Motos",
    name: "Honda CB / similar",
    image: "/brand/moto.jpg",
    pricePerDay: 69,
    seats: 2,
    transmission: "Manual",
    fuel: "Gasolina",
    badge: "Para trabalhar",
  },
];

export type Plan = {
  name: string;
  description: string;
  priceLabel: string;
  unit: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

export const PLANS: Plan[] = [
  {
    name: "Diária",
    description: "Perfeito para viagens rápidas e necessidades pontuais.",
    priceLabel: "R$ 119",
    unit: "/dia",
    features: [
      "Sem fidelidade",
      "Retirada no mesmo dia",
      "Quilometragem livre na cidade",
      "Seguro básico incluso",
    ],
    cta: "Alugar por diária",
  },
  {
    name: "Mensal",
    description: "Ideal para quem precisa de um carro no dia a dia.",
    priceLabel: "R$ 2.190",
    unit: "/mês",
    features: [
      "Economia de até 35%",
      "Manutenção por nossa conta",
      "Carro reserva em revisões",
      "Suporte prioritário 24h",
    ],
    highlight: true,
    cta: "Assinar plano mensal",
  },
  {
    name: "Assinatura",
    description: "Tenha um carro novo sem entrada e sem dor de cabeça.",
    priceLabel: "R$ 1.890",
    unit: "/mês",
    features: [
      "Contrato de 12 a 36 meses",
      "Documentação e IPVA inclusos",
      "Troca de veículo programada",
      "Seguro completo incluso",
    ],
    cta: "Quero assinar",
  },
];

export type Feature = {
  icon: string;
  title: string;
  text: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "ShieldCheck",
    title: "Seguro incluso",
    text: "Todos os planos acompanham cobertura para você rodar tranquilo.",
  },
  {
    icon: "Gauge",
    title: "Quilometragem livre",
    text: "Rode sem se preocupar com limites na cidade e na estrada.",
  },
  {
    icon: "Headset",
    title: "Suporte 24h",
    text: "Atendimento e assistência a qualquer hora, todos os dias.",
  },
  {
    icon: "FileCheck2",
    title: "Sem burocracia",
    text: "Reserva ágil, contrato digital e retirada no mesmo dia.",
  },
  {
    icon: "MapPin",
    title: "Entrega no local",
    text: "Levamos o veículo até você em toda a região de Manaus.",
  },
  {
    icon: "Wrench",
    title: "Manutenção em dia",
    text: "Frota revisada e higienizada antes de cada locação.",
  },
];

export type Step = {
  title: string;
  text: string;
};

export const STEPS: Step[] = [
  {
    title: "Escolha o veículo",
    text: "Selecione entre compactos, sedans, SUVs ou motos da nossa frota.",
  },
  {
    title: "Reserve em minutos",
    text: "Envie seus dados pelo WhatsApp ou pelo formulário e confirme.",
  },
  {
    title: "Retire e dirija",
    text: "Pegue o carro na loja ou receba no local combinado e caia na estrada.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ricardo Lima",
    role: "Motorista de aplicativo",
    quote:
      "Alugo carro com a MCM há mais de um ano para trabalhar. Nunca fiquei na mão e o suporte resolve tudo rápido.",
  },
  {
    name: "Camila Souza",
    role: "Empresária",
    quote:
      "Contratei a frota mensal para minha equipe. Processo sem burocracia e carros sempre impecáveis.",
  },
  {
    name: "André Martins",
    role: "Turista",
    quote:
      "Passei uma semana em Manaus e aluguei um SUV. Entregaram no hotel e o atendimento foi nota 10.",
  },
];

export type Faq = {
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    q: "Quais documentos preciso para alugar?",
    a: "CNH válida, documento de identidade, comprovante de residência e um cartão de crédito para a caução. Para motoristas de aplicativo o processo é simplificado.",
  },
  {
    q: "Qual a idade mínima para locação?",
    a: "É necessário ter no mínimo 21 anos e pelo menos 2 anos de habilitação para a maioria das categorias.",
  },
  {
    q: "Posso usar o carro para trabalhar com aplicativo?",
    a: "Sim! Temos planos específicos para motoristas de Uber, 99 e entregadores, com diárias e mensais que cabem no bolso.",
  },
  {
    q: "O seguro está incluso?",
    a: "Todos os planos contam com cobertura. Você também pode contratar proteções adicionais para rodar com ainda mais tranquilidade.",
  },
  {
    q: "Vocês entregam o veículo?",
    a: "Sim. Entregamos e retiramos o veículo no local combinado em toda a região metropolitana de Manaus.",
  },
];

export const STATS = [
  { value: "27", suffix: " anos", label: "de experiência no mercado" },
  { value: "5.700", suffix: "+", label: "clientes atendidos" },
  { value: "500", suffix: "+", label: "veículos na frota" },
  { value: "24", suffix: "h", label: "de suporte todos os dias" },
];
