# Lista de Compras Inteligente

Aplicação web moderna para controle pessoal de compras, com visual SaaS premium, responsividade real, cálculos automáticos e persistência em PostgreSQL com Neon.

![Preview da Lista de Compras Inteligente](docs/images/lista-compras-inteligente.png)

![Next.js](https://img.shields.io/badge/Next.js-15.5.18-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## Links

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bruno%20Buchardt-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bruno-buchardt-721643246)
[![GitHub](https://img.shields.io/badge/GitHub-BrunoDev--2026-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BrunoDev-2026)

## Funcionalidades

- Cadastro, edição e remoção de produtos.
- Cálculo automático de subtotal por item.
- Total geral atualizado em tempo real.
- Bloco de notas livre para lembrar itens, marcas, cupons e observações.
- Busca instantânea de produtos.
- Filtros e ordenação.
- Tema claro e escuro com persistência local.
- Toasts de feedback com Sonner.
- Loading skeleton e estados vazios elegantes.
- Layout responsivo para desktop, tablet e mobile.
- API REST com persistência em PostgreSQL.

## Ferramentas Utilizadas

- Next.js 15+
- React 19
- TypeScript
- TailwindCSS
- Prisma ORM
- PostgreSQL
- Neon
- Lucide React
- Framer Motion
- React Hook Form
- Zod
- Sonner
- next/font/google com fonte Inter
- ESLint

## Como Executar Localmente

Crie uma conta gratuita no Neon, crie um banco PostgreSQL e copie a connection string. Depois crie o arquivo `.env` com:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DATABASE?sslmode=require"
```

Instale as dependências:

```bash
npm install
```

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Aplique as migrations no Neon:

```bash
npm run db:deploy
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```

No Windows, caso o PowerShell bloqueie `npm`, use `npm.cmd`.

## Deploy Gratuito no Render + Neon

No Render, crie um **Web Service** conectado ao repositório GitHub.

Configure:

```text
Runtime: Node
Build Command: npm install && npm run render-build
Start Command: npm start
```

Adicione as variáveis de ambiente:

```text
DATABASE_URL=sua_connection_string_do_neon
NODE_VERSION=20
```

O comando `render-build` gera o Prisma Client, aplica as migrations no Neon e cria o build de produção do Next.js.

O projeto também inclui um `render.yaml` com essa configuração pronta para Blueprint. Mesmo usando Blueprint, você ainda precisa adicionar a `DATABASE_URL` do Neon como variável secreta.

## Banco de Dados

O projeto usa PostgreSQL com Prisma. Os modelos principais ficam em `prisma/schema.prisma`.

```prisma
model ShoppingItem {
  id        Int      @id @default(autoincrement())
  name      String
  quantity  Int
  price     Float
  createdAt DateTime @default(now())
}

model ShoppingNote {
  id        Int      @id @default(1)
  content   String   @default("")
  updatedAt DateTime @updatedAt
}
```

## Estrutura do Projeto

```text
prisma/
src/app/
src/components/
src/hooks/
src/lib/
src/types/
src/validations/
public/brand/
docs/images/
```

## Autor

Desenvolvido por Bruno Buchardt.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bruno-buchardt-721643246)
[![GitHub](https://img.shields.io/badge/GitHub-Repositório-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/BrunoDev-2026)
