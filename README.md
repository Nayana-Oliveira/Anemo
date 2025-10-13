# Anêmo E-commerce de Plantas

Bem-vindo ao repositório do Anêmo, um e-commerce completo focado na venda de plantas, sementes e acessórios de jardinagem. Este projeto foi desenvolvido como parte do Projeto Integrador II, utilizando tecnologias modernas de front-end para criar uma experiência de usuário fluida e responsiva.

-----

### Sobre o Projeto

Anêmo é uma plataforma de e-commerce que conecta amantes de plantas a uma vasta gama de produtos. A aplicação foi construída com uma arquitetura baseada em componentes reutilizáveis, simulando um ambiente de loja virtual real, com páginas dinâmicas, navegação entre seções, e painéis de controle distintos para clientes e administradores.

O projeto demonstra a aplicação prática de conceitos de desenvolvimento web, incluindo:

  - **Componentização com React**: Criação de uma interface modular e de fácil manutenção.
  - **Roteamento SPA (Single Page Application)**: Navegação rápida e sem recarregamento de página.
  - **Estilização com CSS Variáveis**: Um sistema de temas (claro/escuro) customizável e moderno.
  - **Responsividade**: Layout adaptável para diferentes tamanhos de tela (desktop, tablet e mobile).

-----

### Funcionalidades

O e-commerce Anêmo possui as seguintes funcionalidades implementadas:

  - **Página Inicial (`HomePage`)**:
      - Banner principal de boas-vindas.
      - Grid de categorias de produtos com ícones visuais.
      - Listagem de produtos em destaque.
  - **Pesquisa de Produtos**:
      - Barra de pesquisa no cabeçalho para encontrar produtos por nome.
  - **Autenticação**:
      - Telas separadas de Login para **Usuários** (`LoginUser`) e **Administradores** (`LoginAdmin`).
      - Formulários de Cadastro para **Usuários** (`RegisterUser`) e **Administradores** (`RegisterAdmin`).
      - Funcionalidade de "mostrar/esconder" senha.
  - **Visualização de Produto (`ProductDetail`)**:
      - Página detalhada com galeria de imagens do produto.
      - Controle de quantidade.
      - Botão "Adicionar ao Carrinho".
  - **Painel do Usuário (`UserDashboard`)**:
      - Seções para "Minha Conta", "Meus Dados", "Pedidos" e "Sair".
      - Gerenciamento de endereços (adicionar, editar e excluir) integrado ao painel.
  - **Painel do Administrador (`AdminDashboard`)**:
      - Gerenciamento de produtos ("Meus Produtos") com opções para editar e excluir.
      - Atalho para o formulário de cadastro de novos produtos.
      - Visualização de dados de clientes e pedidos.
  - **Cadastro de Produto (`ProductRegistration`)**:
      - Formulário completo para administradores adicionarem novos produtos ao catálogo.
  - **Notificações**:
      - Alertas de feedback (toast) para ações como login, cadastro, e gerenciamento de produtos.

-----

### Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

  - **[Vite](https://vitejs.dev/)**: Ferramenta de build moderna e ultrarrápida para desenvolvimento front-end.
  - **[React.js](https://reactjs.org/)**: Biblioteca para construir interfaces de usuário componentizadas.
  - **CSS Moderno**:
      - CSS Variáveis para theming.
      - Flexbox e CSS Grid para layouts complexos e responsivos.
  - **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)**: Para notificações e alertas.
  - **[React Icons](https://react-icons.github.io/react-icons/)**: Para ícones.
  - **Fonte**: [Poppins](https://fonts.google.com/specimen/Poppins) (importada via Google Fonts).
  - **Linting**: [ESLint](https://eslint.org/) para manter a qualidade e padronização do código.

-----

### Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/Nayana-Oliveira/Anemo.git](https://github.com/Nayana-Oliveira/Anemo.git)
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd Anemo
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

-----

### Estrutura de Estilo

A estilização do projeto é centralizada no arquivo `src/index.css`, que contém:

  - **Variáveis CSS (`:root` e `.dark`)**: Define a paleta de cores para os temas claro e escuro.
  - **Estilos Globais**: Regras para elementos como `body`, containers e botões.
  - **Componentes Individuais**: Cada componente possui seu próprio arquivo `.css`, mantendo os estilos organizados.

-----

### Estrutura de Pastas

O projeto segue uma estrutura organizada para separar responsabilidades:

Anemo/
├── public/
│   └── assets/       # Imagens estáticas, ícones e logos
├── src/
│   ├── assets/       # Imagens que podem ser importadas como módulos
│   ├── components/   # Componentes reutilizáveis (Header, Footer, etc.)
│   │   ├── AdmDashboard/
│   │   ├── Footer/
│   │   ├── ...
│   ├── pages/        # Componentes que representam páginas inteiras
│   │   └── Home/
│   ├── App.jsx       # Componente principal que gerencia a navegação
│   ├── index.css     # Estilos globais e variáveis de cores
│   └── main.jsx      # Ponto de entrada da aplicação React
├── .gitignore
├── index.html
├── package.json
└── README.md
```

###  Desenvolvedoras

Este projeto foi desenvolvido com dedicação por:

- **Nayana Oliveira** - [GitHub](https://github.com/Nayana-Oliveira)
- **Gabriela Rodrigues** - [GitHub](https://github.com/Nickycaribou)
