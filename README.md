![image](https://your-image-link-aqui.com) <!-- Substitua por um print do sistema -->

# SCEO — Sistema de Controle de Estoque Online

## 📌 Introdução

O **SCEO** é um sistema web de controle de estoque desenvolvido para facilitar o gerenciamento de produtos, vendas, marcas e categorias de forma rápida, intuitiva e segura.

Com ele, é possível cadastrar produtos, controlar o fluxo de vendas com atualização automática de estoque, além de organizar os itens por marca e categoria — tudo vinculado a usuários autenticados com o Clerk.

### 🔐 Acesso Seguro

O sistema utiliza autenticação via **Clerk**, garantindo que cada ação esteja associada a um usuário único e autorizado.

---

## ⚙️ Funcionalidades Principais

- ✅ Cadastro, edição e exclusão de produtos  
- ✅ Registro de vendas com atualização automática do estoque  
- ✅ Associação de produtos com marcas e categorias  
- ✅ Listagem e filtragem por usuário autenticado  
- ✅ Autenticação com Clerk  
- ✅ Interface moderna e responsiva  

---

## 🧩 Estrutura do Projeto

```
/src
├── /app # Páginas do Next.js (main page, layouts, not-found, globals) e rotas API
├── /components # Componentes reutilizáveis da interface
├── /helpers # Funções utilitárias diversas
├── /hooks # Hooks React personalizados
├── /lib # Configuração do Prisma e utilitários do Tailwind
├── /styles # Estilos específicos dos componentes Clerk
└── /types # Tipagens TypeScript do projeto
```

---

## 🛠️ Tecnologias Utilizadas

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Prisma](https://img.shields.io/badge/prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
- ![Zod](https://img.shields.io/badge/zod-8E44AD?style=for-the-badge)
- ![React Hook Form](https://img.shields.io/badge/react_hook_form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
- ![Clerk](https://img.shields.io/badge/clerk-0A2540?style=for-the-badge&logo=clerk&logoColor=white)
- ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- **ShadCN UI** — biblioteca de componentes moderna baseada no Radix UI

---

## 💡 Pré-requisitos

- Node.js  
- Git  
- Uma IDE ou Editor de Código (ex: VSCode)  
- Conta configurada no [Clerk](https://clerk.com/)  
- Banco de dados PostgreSQL (Recomendado: [Neon](https://neon.tech))  

---

## 📦 Guia de Instalação

1. **Clone o repositório**

```
git clone https://github.com/gabrieldickman/sceo.git
```

2. **Instale as dependências**

```
cd sceo
npm install
```

3. Execute o prisma

```
npx prisma generate
```

4. Inicie o servidor
   
```
npm run dev
```
O projeto estará disponível em: http://localhost:3000

---

## 📄 Direitos Autorais

© 2024 Gabriel Dickman. Todos os direitos reservados.

Este sistema foi idealizado, desenvolvido e mantido exclusivamente por Gabriel Dickman.  
É proibido copiar, distribuir, modificar ou reutilizar qualquer parte deste projeto, no todo ou em partes, sem permissão expressa do autor.

O uso indevido deste sistema ou de trechos do seu código sem autorização poderá resultar em sanções legais conforme a legislação vigente.
