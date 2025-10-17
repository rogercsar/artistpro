# Danz - Plataforma para Bailarinos e Contratantes

Uma plataforma web moderna e responsiva que conecta bailarinos talentosos com contratantes em busca de excelência na dança.

## 🎭 Características Principais

### Para Bailarinos
- **Perfis Personalizados**: Crie seu perfil com biografia, habilidades, portfólio e disponibilidade
- **Níveis de Assinatura**: Básico (gratuito), Avançado e Pro com diferentes benefícios
- **Feed de Eventos**: Descubra oportunidades de trabalho e audições
- **Sistema de Interesse**: Marque interesse em eventos relevantes
- **Portfólio Digital**: Upload de fotos e vídeos para mostrar seu trabalho

### Para Contratantes
- **Criação de Eventos**: Publique oportunidades de trabalho
- **Busca Avançada**: Encontre bailarinos por habilidades, localização e disponibilidade
- **Gerenciamento de Candidatos**: Visualize bailarinos interessados em seus eventos
- **Perfis de Empresa**: Mostre sua empresa e histórico de eventos

### Funcionalidades Gerais
- **Design Responsivo**: Mobile-first, funciona perfeitamente em todos os dispositivos
- **Sistema de Avaliações**: Avalie e seja avaliado após trabalhos
- **Chat Integrado**: Comunicação direta entre usuários
- **Notificações**: Fique por dentro de novas oportunidades e mensagens

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Ícones**: Lucide React
- **Estado**: Context API + Hooks personalizados
- **Dados**: Supabase (com fallback para mock data)

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd danz-platform
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🔌 Configuração do Supabase

1. Crie um projeto no Supabase e copie a `Project URL` e a `Anon Key`.
2. Crie um arquivo `.env` na raiz baseado no `.env.example`:
   ```env
   REACT_APP_SUPABASE_URL=<<SUA_URL_DO_SUPABASE>>
   REACT_APP_SUPABASE_ANON_KEY=<<SUA_ANON_KEY>>

   # Apenas para scripts Node (não expor no frontend)
   SUPABASE_SERVICE_ROLE_KEY=<<SERVICE_ROLE_KEY>>
   SUPABASE_PROJECT_URL=<<SUA_URL_DO_SUPABASE>>
   ```
3. Aplique o schema e (opcionalmente) o seed:
   - Execute o conteúdo de `supabase/schema.sql` no SQL Editor do Supabase.
   - Opcional: execute `supabase/seed.sql` para dados de exemplo.
4. (Opcional) Crie um usuário admin via script Node:
   ```bash
   # Requer SUPABASE_SERVICE_ROLE_KEY e SUPABASE_PROJECT_URL definidos no .env
   node scripts/createAdminUser.cjs
   ```
5. Inicie a aplicação normalmente com `npm start`.

Quando as variáveis do Supabase estiverem corretamente definidas, a aplicação usará os dados reais (eventos, perfis, favoritos e interesses). Caso contrário, o app funciona com dados mockados para desenvolvimento.

## 🎯 Como Usar

### Primeiro Acesso
1. Acesse a página inicial
2. Clique em "Cadastrar" e escolha seu tipo de usuário (Bailarino ou Contratante)
3. Preencha suas informações básicas
4. Faça login com suas credenciais

### Para Bailarinos
1. **Complete seu perfil**: Adicione biografia, habilidades e estilos de dança
2. **Configure disponibilidade**: Marque os dias da semana em que está disponível
3. **Explore eventos**: Navegue pelo feed de eventos e marque interesse nos relevantes
4. **Atualize portfólio**: Adicione fotos e vídeos do seu trabalho (planos Avançado e Pro)

### Para Contratantes
1. **Complete perfil da empresa**: Adicione informações sobre sua empresa
2. **Crie eventos**: Use o botão "Criar Evento" para publicar oportunidades
3. **Gerencie candidatos**: Visualize bailarinos interessados em seus eventos
4. **Entre em contato**: Use o sistema de mensagens para comunicar-se com bailarinos

## 🔐 Contas de Demonstração

Para testar a aplicação, use estas credenciais:

### Bailarino Pro
- **Email**: maria@email.com
- **Senha**: 123456

### Bailarino Avançado
- **Email**: joao@email.com
- **Senha**: 123456

### Contratante
- **Email**: contato@dancaproducoes.com
- **Senha**: 123456

## 📱 Design Responsivo

A aplicação foi desenvolvida com abordagem mobile-first:
- **Mobile**: Interface otimizada para smartphones
- **Tablet**: Layout adaptado para tablets
- **Desktop**: Experiência completa em telas maiores

## 🎨 Sistema de Design

- **Cores**: Paleta baseada em azul (primary) e roxo (secondary)
- **Tipografia**: Inter para texto e Poppins para títulos
- **Componentes**: Sistema de componentes reutilizáveis
- **Animações**: Transições suaves e micro-interações

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface
│   └── layout/         # Componentes de layout
├── pages/              # Páginas da aplicação
│   └── auth/           # Páginas de autenticação
├── hooks/              # Hooks personalizados
├── types/              # Definições TypeScript
├── data/               # Dados mockados
└── utils/              # Utilitários
```

## 🚀 Próximos Passos

- [ ] Integração com API real
- [ ] Sistema de pagamentos para assinaturas
- [ ] Chat em tempo real
- [ ] Upload de arquivos
- [ ] Sistema de notificações push
- [ ] App mobile (React Native)
- [ ] Dashboard de analytics
- [ ] Sistema de reviews e avaliações

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para contato@danz.com ou abra uma issue no repositório.

---

Desenvolvido com ❤️ para a comunidade da dança

## Deploy no Netlify (SPA + Functions)

Este projeto usa React Router (SPA). Para evitar 404 ao acessar rotas diretamente (ex.: `/login`), já incluímos:

- `public/_redirects` com `/* /index.html 200`
- `netlify.toml` com build, publish, functions e redirect SPA

Configuração usada em `netlify.toml`:

```
[build]
  command = "npm run build"
  publish = "build"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Passos para publicar:

- Build command: `npm run build`
- Publish directory: `build`
- Após o deploy, acesse `https://SEUSITE.netlify.app/login` (deve carregar sem 404)

### Function de teste (logs)

Adicionada function `netlify/functions/hello.js` para validar logs no painel do Netlify.

- Endpoint: `/.netlify/functions/hello`
- Logs: Deploys → Functions → hello

### Variáveis de ambiente

- Para o cliente (CRA): use prefixo `REACT_APP_` (ex.: `REACT_APP_SUPABASE_URL`)
- Para scripts Node (ex.: `scripts/createAdminUser.cjs`):
  - `SUPABASE_PROJECT_URL` ou `REACT_APP_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - (opcionais) `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`

Execução do script admin:

```
node scripts/createAdminUser.cjs
```
