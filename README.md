# ADM DASBOARD E-COMMERCE
- [Documentation](#documentation)
- [Documentação](#documentação)

## Documentation

### About the Project

Project of an administrative dashboard for multiple e-commerce platforms.

### Features

- [x] Authentication system with private and public routes;
- [x] Administration system for multiple e-commerce platforms, allowing creation, updating, and deletion of e-stores linked to the same user;
- [x] Provision of API endpoints for each e-store to be consumed in another project.

### How to use

1. Download the project and open the terminal in the project's root directory (main folder), then type the command `npm install`;

2.  Next, configure the following environment variables:
```
# Clerk Variables (for authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary Variables
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_SECRET=

# Stripe Variables (for the payment system)
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

# Frontend Store URL that will consume the API
FRONTEND_STORE_URL=

# Database URL
DATABASE_URL=
```
3. Go to the file `/app/(auth)/(routes)/sign-in/[[...sign-in]]/page.tsx` and remove the line related to the `DemoButton`:
```
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <SignIn />
        </>
    );
}

```
4. Type the command `npm run dev` or `npm start`.

## Documentação

### Sobre o Projeto

Projeto de um dashboard administrativo de vários e-commerces

### Funcionalidades
- [x] Sistema de autenticação com rotas privados e públicas;
- [x] Sistema de administração de múltiplos e-commerces com criação, atualização e deleção, de e-stores vinculados a um mesmo usuário;
- [x] Disponibilização dos end-points da API de cada e-store para o consumo em outro projeto;

### Como usar

1. Baixe o projeto e abra o terminal na root do projeto (na pasta principal) e digite o comando `npm install`;
2. Em seguida configure as seguintes variáveis de ambiente:
```
# Variáveis de Clerk (para a autenticação)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Variáveis do Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_SECRET=

# Variáveis do Stripe (para o sistema de pagamento)
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

# Variáveis do frontend da loja que vai consumir a API
FRONTEND_STORE_URL=

# URL do banco de dados
DATABASE_URL=
```
3. Vá ao arquivo `/app/(auth)/(routes)/sign-in/[[...sign-in]]/page.tsx` e apague a linha relativa ao ``DemoButton`:
```
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <SignIn />
        </>
    );
}

```
4. Digite o comando `npm run dev` ou `npm start`.

## [DEMO](https://adm-e-commerce.vercel.app)