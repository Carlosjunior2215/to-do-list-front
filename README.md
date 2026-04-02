# To-Do List (Frontend)

Este é o frontend da aplicação de lista de tarefas (To-Do List), construído com as tecnologias mais modernas do ecossistema React.

## 🚀 Como rodar o projeto localmente

Para rodar este projeto na sua máquina, certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. **Instale as dependências**

   Abra o terminal na pasta do projeto e execute:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**

   Após a instalação das dependências, inicie a aplicação com o comando:
   ```bash
   npm run dev
   ```

3. **Acesse no navegador**
   
   A aplicação estará rodando na porta **4000**. Acesse [http://localhost:4000](http://localhost:4000) no seu navegador.
   *(Nota: Se houver variáveis de ambiente necessárias, certifique-se de configurar um `.env` antes).*

---

## 🏗 Arquitetura do Projeto

A arquitetura do frontend foi projetada visando modularidade, escalabilidade e separação de responsabilidades. A aplicação utiliza o **Next.js** com a convenção do **App Router**.

### Tecnologias Principais
- **Framework:** [Next.js (v16)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Linguagem:** TypeScript
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) integrado com [Bootstrap](https://getbootstrap.com/) & React-Bootstrap
- **Requisições HTTP:** [Axios](https://axios-http.com/)

### Estrutura de Diretórios

O projeto segue a seguinte estrutura de responsabilidades:

- `/app`  
  Contém as rotas e páginas da aplicação utilizando o modelo de roteamento do Next.js (App Router). Inclui as páginas principais como `login/`, `signup/` e o `dashboard/`.

- `/components`  
  Guarda os componentes visuais e reutilizáveis do React. Em especial, a estrutura de montagem visual das tarefas:
  - `taskColumn/`: Colunas para organizar os status das tarefas (estilo Kanban).
  - `taskItem/`: O visual e comportamento de um item de tarefa individual.
  - `taskModal/`: Modais para criação e edição de formulários.
  - `authGuard/`: Componente provedor de segurança para proteger rotas autenticadas.

- `/services`  
  Camada responsável pela comunicação exclusiva com a API backend (usando o Axios). Ela isola toda a regra de negócio de rede de dentro dos componentes. 
  - `auth.service.ts`: Autenticação (Login/Registro).
  - `task.service.ts`: CRUD das tarefas.
  - `user.service.ts`: Tratamento de dados informativos do usuário.

- `/config` & `/hooks`  
  - `config/`: Serve para setup de instâncias e interceptadores globais de autenticação.
  - `hooks/`: Contém regras complexas e de estados locais que são consumíveis pelos componentes.
