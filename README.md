# MCM Rent a Car — Site Institucional

Landing page de uma locadora de carros e motos, reformulada a partir do site de referência
[mcmveiculos.com.br](https://mcmveiculos.com.br/), reaproveitando a **logo** e a **paleta de cores**
(charcoal + laranja pôr do sol) da marca MCM Rent a Car.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (tema da marca em `tailwind.config.ts`)
- **lucide-react** (ícones)
- Scroll-reveal próprio com `IntersectionObserver` (sem dependências de animação)

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (http://localhost:5180)
npm run build    # build de produção em /dist
npm run preview  # pré-visualiza o build
```

## Estrutura

```
public/brand/        Logo e imagens da frota
src/
  components/        Seções da página (Hero, Fleet, Plans, ...)
  lib/data.ts        Conteúdo central (frota, planos, FAQ, contato)
  index.css          Estilos base + utilitários da marca
```

## Seções

Início (hero + reserva rápida) · Indicadores · Frota com filtros · Diferenciais ·
Planos & Assinatura · Motoristas de aplicativo · Como funciona · Depoimentos · FAQ ·
Chamada final · Contato · Rodapé · Botão flutuante de WhatsApp.

## Personalização

- **Conteúdo / preços / contato:** `src/lib/data.ts`
- **Cores e fontes:** `tailwind.config.ts`
- **Imagens:** `public/brand/`

> Os botões de reserva e os formulários abrem o WhatsApp com a mensagem pré-preenchida —
> sem backend necessário.
