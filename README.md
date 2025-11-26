# ArtistPro - Plataforma Web Multiplataforma para Artistas e Contratantes

Uma plataforma moderna e responsiva que conecta artistas e contratantes, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 19** - Framework front-end
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React Router** - Roteamento
- **Lucide React** - Ícones

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Instale o plugin do React para Vite (se necessário):
```bash
npm install -D @vitejs/plugin-react
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no navegador

## 🎯 Funcionalidades

### Para Artistas

- **Plano Básico (Gratuito)**
  - Cadastro e gerenciamento de perfil
  - Publicação de até 5 habilidades
  - Visualização de eventos
  - Marcar interesse em até 10 eventos/mês
  - Receber contato de contratantes

- **Plano Avançado (Pago)**
  - Todos os recursos do Básico
  - Portfólio com até 10 fotos e 3 vídeos
  - Habilidades ilimitadas
  - Agenda de disponibilidade
  - Maior destaque nas buscas
  - Curtir, compartilhar e comentar eventos

- **Plano Pro (Premium)**
  - Todos os recursos do Avançado
  - Perfil verificado e em destaque
  - Feed pessoal de atividades
  - Contato direto com outros Pro e Contratantes Avançados
  - Métricas de visualizações

### Para Contratantes

- **Plano Básico (Gratuito)**
  - Cadastro de perfil
  - Publicar até 2 eventos/mês
  - Visualizar perfis básicos
  - Contatar até 5 artistas/mês

- **Plano Avançado (Pago)**
  - Todos os recursos do Básico
  - Eventos ilimitados
  - Filtros avançados de busca
  - Acesso completo a perfis
  - Gerenciamento de candidatos

### Para Administradores

- Painel de controle completo
- Gerenciamento de usuários
- Moderação de conteúdo
- Estatísticas da plataforma
- Gerenciamento de planos

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── layouts/       # Layouts de página
├── context/       # Context API (estado global)
├── services/      # Serviços (localStorage, etc)
├── hooks/         # Custom hooks
├── types/         # Definições TypeScript
├── data/          # Dados mockados
└── utils/         # Funções utilitárias
```

## 🔐 Credenciais de Teste

### Artista
- Email: `ana@example.com`
- Tipo: `artist`

### Contratante
- Email: `pulse@example.com`
- Tipo: `contractor`

### Admin
- Email: `marina@artistpro.com`
- Tipo: `admin`

## 🎨 Design

O design segue uma abordagem **mobile-first**, com interface limpa e moderna. As cores principais são:
- **Brand**: Azul (#1874e6)
- **Accent**: Laranja (#ff7a18)
- **Neutral**: Tons de cinza/slate

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

## 🔄 Dados

Os dados são armazenados no **localStorage** do navegador, permitindo persistência entre sessões sem necessidade de backend.

## 📱 Responsividade

A aplicação é totalmente responsiva, otimizada para:
- 📱 Smartphones (mobile-first)
- 📱 Tablets
- 💻 Desktops

## 🚧 Próximos Passos

- [ ] Sistema de mensagens diretas (chat)
- [ ] Sistema de avaliações e reviews
- [ ] Mapa interativo de eventos
- [ ] Notificações em tempo real
- [ ] Upload de arquivos (fotos/vídeos)
- [ ] Integração com backend real

---

Desenvolvido com ❤️ para conectar artistas e oportunidades

