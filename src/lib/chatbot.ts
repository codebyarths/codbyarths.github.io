// Motor do chatbot local da MCM Rent a Car.
// Base de conhecimento + correspondência de intenções (sem backend / sem IA externa)
// e a definição do fluxo conversacional de cadastro do cliente.

import { COMPANY, FLEET, PLANS } from "./data";

export const CATEGORIES = Array.from(new Set(FLEET.map((v) => v.category)));

/** Normaliza texto: minúsculas, sem acentos, sem espaços nas pontas. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

export type Intent = {
  id: string;
  keywords: string[];
  answer: string;
  suggestions?: string[];
};

const precosLista = FLEET.map(
  (v) => `• ${v.category} — a partir de R$ ${v.pricePerDay}/dia`
).join("\n");

const planosLista = PLANS.map((p) => `• ${p.name}: ${p.priceLabel}${p.unit}`).join("\n");

/** Frases que disparam o início do cadastro em vez de uma resposta de FAQ. */
export const CADASTRO_TRIGGERS = [
  "quero alugar",
  "fazer cadastro",
  "fazer um cadastro",
  "quero me cadastrar",
  "cadastrar",
  "cadastro",
  "reservar",
  "fazer reserva",
  "quero reservar",
  "alugar um carro",
  "alugar uma moto",
  "contratar",
  "quero um carro",
];

export const INTENTS: Intent[] = [
  {
    id: "saudacao",
    keywords: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "eai", "e ai", "hey", "opa"],
    answer:
      "Olá! 👋 Seja bem-vindo(a) à MCM Rent a Car. Posso te ajudar com aluguel de carros e motos, preços, documentos e cadastro. O que você precisa?",
    suggestions: ["Quero alugar", "Preços", "Documentos", "Como funciona"],
  },
  {
    id: "precos",
    keywords: [
      "preco",
      "precos",
      "valor",
      "valores",
      "quanto custa",
      "quanto fica",
      "quanto e",
      "tabela",
      "diaria",
      "custa",
      "orcamento",
    ],
    answer: `Nossos valores começam assim 👇\n\n${precosLista}\n\nE temos planos sob medida:\n${planosLista}\n\nQuer que eu já inicie seu cadastro para uma cotação?`,
    suggestions: ["Quero alugar", "Planos e assinatura", "Falar no WhatsApp"],
  },
  {
    id: "documentos",
    keywords: [
      "documento",
      "documentos",
      "preciso de",
      "requisito",
      "requisitos",
      "cnh",
      "habilitacao",
      "carteira",
      "exige",
      "exigencia",
    ],
    answer:
      "Para alugar você precisa de:\n\n• **CNH válida**\n• Documento de identidade\n• Comprovante de residência\n• Cartão de crédito (para a caução)\n\nIdade mínima de **21 anos** e pelo menos 2 anos de habilitação. Para motoristas de aplicativo o processo é simplificado. 😉",
    suggestions: ["Idade mínima", "Quero alugar", "Motorista de app"],
  },
  {
    id: "idade",
    keywords: ["idade", "anos", "idade minima", "menor", "21", "tenho 18"],
    answer:
      "A idade mínima é de **21 anos**, com no mínimo 2 anos de habilitação para a maioria das categorias. Algumas categorias premium podem ter exigências adicionais.",
    suggestions: ["Documentos", "Quero alugar"],
  },
  {
    id: "como_funciona",
    keywords: [
      "como funciona",
      "como faco",
      "como alugar",
      "passo a passo",
      "como pego",
      "como e",
      "funciona",
    ],
    answer:
      "É bem simples, em 3 passos: 🚗\n\n**1.** Escolha o veículo (carro ou moto)\n**2.** Faça o cadastro aqui comigo ou pelo WhatsApp\n**3.** Retire na loja ou receba no local combinado\n\nQuer começar agora?",
    suggestions: ["Quero alugar", "Documentos", "Entrega no local"],
  },
  {
    id: "app",
    keywords: [
      "aplicativo",
      "app",
      "uber",
      "99",
      "motorista",
      "trabalhar",
      "rodar",
      "entregador",
      "ifood",
    ],
    answer:
      "Temos planos especiais para **motoristas de aplicativo** (Uber, 99 e entregadores)! 🚀\n\n• Diárias e semanais que cabem no bolso\n• Carros econômicos prontos para rodar\n• Manutenção e troca de óleo por nossa conta\n• Sem comprovação de renda complicada\n\nA partir de R$ 119/dia. Quer fazer seu cadastro?",
    suggestions: ["Quero alugar", "Preços", "Falar no WhatsApp"],
  },
  {
    id: "seguro",
    keywords: ["seguro", "cobertura", "protecao", "bati", "acidente", "sinistro"],
    answer:
      "Sim! Todos os nossos planos já vêm com **cobertura/seguro incluso** para você rodar tranquilo. Também é possível contratar proteções adicionais para ainda mais segurança.",
    suggestions: ["Documentos", "Quero alugar"],
  },
  {
    id: "entrega",
    keywords: ["entrega", "entregar", "leva", "levam", "buscar", "domicilio", "no local", "aeroporto"],
    answer:
      "Sim, nós **entregamos e retiramos** o veículo no local combinado em toda a região metropolitana de Manaus, incluindo o aeroporto. 📍",
    suggestions: ["Quero alugar", "Endereço da loja", "Falar no WhatsApp"],
  },
  {
    id: "planos",
    keywords: ["plano", "planos", "assinatura", "mensal", "mensalidade", "anual", "longo prazo", "assinar"],
    answer: `Temos formatos para cada necessidade:\n\n${PLANS.map(
      (p) => `• **${p.name}** — ${p.priceLabel}${p.unit}: ${p.description}`
    ).join("\n")}\n\nQuer que eu te ajude a escolher?`,
    suggestions: ["Quero alugar", "Preços", "Falar no WhatsApp"],
  },
  {
    id: "motos",
    keywords: ["moto", "motos", "motocicleta", "duas rodas", "cb", "honda"],
    answer:
      "Sim, alugamos **motos** também! 🏍️ Ideais para o dia a dia e para quem trabalha com entregas. A partir de R$ 69/dia. Quer fazer o cadastro?",
    suggestions: ["Quero alugar", "Motorista de app", "Preços"],
  },
  {
    id: "pagamento",
    keywords: ["pagamento", "pagar", "cartao", "pix", "forma de pagamento", "parcela", "credito", "debito"],
    answer:
      "Aceitamos **cartão de crédito** (também usado para a caução), além de outras formas combinadas com a equipe. Os detalhes do pagamento são confirmados no momento da reserva.",
    suggestions: ["Quero alugar", "Documentos", "Falar no WhatsApp"],
  },
  {
    id: "quilometragem",
    keywords: ["quilometragem", "km", "limite", "rodar quanto", "kilometragem"],
    answer:
      "Nossos planos contam com **quilometragem livre** na cidade — você roda sem se preocupar com limites. Para viagens longas, é só combinar com a equipe. 🛣️",
    suggestions: ["Quero alugar", "Preços"],
  },
  {
    id: "cancelamento",
    keywords: ["cancelar", "cancelamento", "desistir", "estorno", "fidelidade", "multa"],
    answer:
      "As diárias são **sem fidelidade**. Para cancelamentos de reservas ou planos, nossa equipe te orienta certinho — quer que eu te conecte no WhatsApp?",
    suggestions: ["Falar no WhatsApp", "Quero alugar"],
  },
  {
    id: "horario",
    keywords: ["horario", "hora", "funcionamento", "aberto", "atendimento", "que horas"],
    answer: `Nosso atendimento: ⏰\n\n${COMPANY.hours}\n\nQuer fazer seu cadastro? Posso adiantar agora mesmo.`,
    suggestions: ["Quero alugar", "Endereço da loja", "Falar no WhatsApp"],
  },
  {
    id: "endereco",
    keywords: ["endereco", "onde fica", "localizacao", "loja", "mapa", "como chego", "fica onde"],
    answer: `Estamos em: 📍\n\n${COMPANY.address}\n\n${COMPANY.hours}`,
    suggestions: ["Entrega no local", "Quero alugar", "Falar no WhatsApp"],
  },
  {
    id: "contato",
    keywords: ["contato", "telefone", "whatsapp", "falar", "atendente", "humano", "ligar", "numero"],
    answer: `Claro! Você pode falar direto com a nossa equipe:\n\n📱 WhatsApp/Telefone: **${COMPANY.phone}**\n✉️ E-mail: ${COMPANY.email}\n\nÉ só tocar no botão abaixo.`,
    suggestions: ["Falar no WhatsApp", "Quero alugar"],
  },
  {
    id: "agradecimento",
    keywords: ["obrigado", "obrigada", "valeu", "vlw", "agradecido", "show", "perfeito", "otimo"],
    answer:
      "Por nada! 😊 Estou por aqui se precisar de mais alguma coisa. Boa estrada com a MCM Rent a Car! 🚗💨",
    suggestions: ["Quero alugar", "Preços", "Falar no WhatsApp"],
  },
];

/** Pontua um intent contra a pergunta normalizada do usuário. */
function scoreIntent(query: string, intent: Intent): number {
  const q = ` ${norm(query)} `;
  const tokens = q.trim().split(/\s+/);
  let score = 0;
  for (const kw of intent.keywords) {
    const k = norm(kw);
    if (k.includes(" ")) {
      if (q.includes(` ${k} `) || q.includes(k)) score += 3;
    } else if (tokens.includes(k)) {
      score += 2;
    } else if (k.length >= 5 && tokens.some((t) => t.startsWith(k))) {
      score += 1;
    }
  }
  return score;
}

/** Retorna o melhor intent para a pergunta, ou null se nada relevante. */
export function matchIntent(query: string): Intent | null {
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = scoreIntent(query, intent);
    if (s > bestScore) {
      bestScore = s;
      best = intent;
    }
  }
  return bestScore > 0 ? best : null;
}

/** Detecta se a mensagem é um pedido para iniciar o cadastro. */
export function isCadastroTrigger(query: string): boolean {
  const q = norm(query);
  return CADASTRO_TRIGGERS.some((t) => q.includes(norm(t)));
}

export const FALLBACK_ANSWER =
  "Hmm, não tenho certeza se entendi. 🤔 Posso te ajudar com **preços**, **documentos**, **como alugar**, **planos** ou iniciar seu **cadastro**. Se preferir, te conecto com a equipe no WhatsApp.";

export const WELCOME =
  "Olá! 👋 Eu sou o assistente virtual da **MCM Rent a Car**.\n\nPosso tirar dúvidas sobre nossos carros e motos ou fazer o seu **cadastro** para alugar. Como posso ajudar?";

export const INITIAL_SUGGESTIONS = [
  "Quero alugar",
  "Preços",
  "Documentos necessários",
  "Como funciona",
];

// ---------------------------------------------------------------------------
// Fluxo de cadastro do cliente
// ---------------------------------------------------------------------------

export type CadastroStep = {
  key: string;
  label: string;
  question: string;
  type: "text" | "tel" | "email" | "options";
  options?: string[];
  inputMode?: "text" | "tel" | "email";
  validate?: (v: string) => string | null;
};

export const CADASTRO_STEPS: CadastroStep[] = [
  {
    key: "nome",
    label: "Nome",
    question:
      "Perfeito! Vou fazer seu cadastro rapidinho. 📝\n\nPara começar, qual é o seu **nome completo**?",
    type: "text",
    validate: (v) => (v.trim().length < 3 ? "Por favor, digite seu nome completo." : null),
  },
  {
    key: "telefone",
    label: "WhatsApp",
    question: "Qual o seu **WhatsApp** com DDD? (ex: (92) 98888-7777)",
    type: "tel",
    inputMode: "tel",
    validate: (v) => {
      const d = v.replace(/\D/g, "");
      return d.length < 10 || d.length > 11 ? "Digite um telefone válido com DDD. 📱" : null;
    },
  },
  {
    key: "email",
    label: "E-mail",
    question: "Qual o seu melhor **e-mail**?",
    type: "email",
    inputMode: "email",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? null
        : "Esse e-mail não parece válido. Pode conferir? ✉️",
  },
  {
    key: "cnh",
    label: "Possui CNH",
    question: "Você possui **CNH válida**?",
    type: "options",
    options: ["Sim", "Não"],
  },
  {
    key: "categoria",
    label: "Categoria",
    question: "Qual **categoria** de veículo você quer alugar?",
    type: "options",
    options: CATEGORIES,
  },
  {
    key: "periodo",
    label: "Período",
    question: "Por quanto **tempo** pretende alugar? (ex: 3 diárias, 1 semana, mensal)",
    type: "text",
    validate: (v) => (v.trim().length < 1 ? "Me diga o período, por favor." : null),
  },
  {
    key: "obs",
    label: "Observação",
    question:
      "Quer adicionar alguma **observação**? (modelo específico, data de retirada, etc.) Se não, é só digitar *não*.",
    type: "text",
  },
];

export type CadastroData = Record<string, string>;

/** Monta a mensagem de WhatsApp com os dados do cadastro. */
export function cadastroToWhats(d: CadastroData): string {
  const linhas = [
    "Olá! Quero fazer um cadastro/reserva na MCM Rent a Car. 🚗",
    "",
    `*Nome:* ${d.nome}`,
    `*WhatsApp:* ${d.telefone}`,
    `*E-mail:* ${d.email}`,
    `*Possui CNH:* ${d.cnh}`,
    `*Categoria desejada:* ${d.categoria}`,
    `*Período:* ${d.periodo}`,
  ];
  if (d.obs && norm(d.obs) !== "nao" && norm(d.obs) !== "nao.") {
    linhas.push(`*Observação:* ${d.obs}`);
  }
  return linhas.join("\n");
}

export function whatsLink(text: string): string {
  return `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(text)}`;
}

/** Resumo amigável exibido no chat antes de enviar. */
export function cadastroResumo(d: CadastroData): string {
  const primeiroNome = d.nome.trim().split(/\s+/)[0];
  const linhas = [
    `Prontinho, ${primeiroNome}! ✅ Confira seus dados:`,
    "",
    `• **Nome:** ${d.nome}`,
    `• **WhatsApp:** ${d.telefone}`,
    `• **E-mail:** ${d.email}`,
    `• **Possui CNH:** ${d.cnh}`,
    `• **Categoria:** ${d.categoria}`,
    `• **Período:** ${d.periodo}`,
  ];
  if (d.obs && norm(d.obs) !== "nao" && norm(d.obs) !== "nao.") {
    linhas.push(`• **Observação:** ${d.obs}`);
  }
  linhas.push("", 'Toque em **"Enviar para o WhatsApp"** que nossa equipe finaliza sua reserva. 🚀');
  return linhas.join("\n");
}

/** Salva uma cópia do cadastro no navegador (localStorage). */
export function salvarCadastro(d: CadastroData): void {
  try {
    const raw = localStorage.getItem("mcm_cadastros");
    const arr = raw ? JSON.parse(raw) : [];
    arr.push({ ...d, criadoEm: new Date().toISOString() });
    localStorage.setItem("mcm_cadastros", JSON.stringify(arr));
  } catch {
    /* ignora falha de storage (modo privado, etc.) */
  }
}
