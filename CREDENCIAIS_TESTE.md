# Credenciais de Teste - ArtistPro

Este documento contém as credenciais dos usuários de teste criados para facilitar o desenvolvimento e validação das funcionalidades.

## Como fazer login

O sistema de login funciona apenas com **email** e **tipo de usuário** (sem senha). Basta:
1. Acessar a página de login (`/login`)
2. Selecionar o tipo de usuário (Artista, Contratante ou Admin)
3. Inserir o email correspondente
4. Clicar em "Entrar"

---

## Usuários de Teste

### 🎨 Artista de Teste
- **Email:** `artista@teste.com`
- **Tipo:** Artista
- **Plano:** Avançado
- **ID:** `artist-test`
- **Funcionalidades disponíveis:**
  - Visualizar eventos
  - Marcar interesse em eventos
  - Curtir eventos
  - Editar perfil
  - Ver mensagens e notificações
  - Gerenciar portfólio

### 🏢 Contratante de Teste
- **Email:** `contratante@teste.com`
- **Tipo:** Contratante
- **Plano:** Avançado
- **ID:** `contractor-test`
- **Funcionalidades disponíveis:**
  - Criar eventos
  - Gerenciar candidaturas (pipeline Kanban)
  - Visualizar perfis de artistas
  - Enviar mensagens
  - Editar perfil
  - Ver notificações

### 👤 Admin de Teste
- **Email:** `admin@teste.com`
- **Tipo:** Admin
- **ID:** `admin-test`
- **Funcionalidades disponíveis:**
  - Acessar painel administrativo
  - Gerenciar usuários
  - Moderar conteúdo
  - Editar planos
  - Gerenciar eventos

---

## Usuários Existentes (Mock Data)

Além dos usuários de teste, o sistema já possui usuários pré-configurados no mock data:

### Artistas
- **Ana Ribeiro** - `ana.ribeiro@artistpro.com` (Plano: PRO)
- **Lucas Prado** - `lucas.prado@artistpro.com` (Plano: Avançado)
- **Rita Carvalho** - `rita.carvalho@artistpro.com` (Plano: Básico)

### Contratantes
- **Pulse Live** - `talentos@pulselive.com` (Plano: Avançado)
- **Move Agency** - `contato@moveagency.com` (Plano: Básico)

### Admin
- **Marina Couto** - `marina@artistpro.com`

---

## Notas Importantes

1. **Sem senha:** O sistema atual não utiliza autenticação por senha. O login é feito apenas com email e tipo de usuário.

2. **Dados locais:** Os dados são armazenados no `localStorage` do navegador. Para resetar, limpe o localStorage ou use a função de reset (se disponível).

3. **Persistência:** As alterações feitas durante os testes são salvas localmente e persistem entre sessões.

4. **Criar novos usuários:** Você pode criar novos usuários através da página de registro (`/register`).

---

## Testando Funcionalidades

### Como testar o pipeline de candidaturas:
1. Faça login como **Contratante** (`contratante@teste.com`)
2. Crie um novo evento ou acesse um evento existente
3. Acesse `/events/:id/candidates` para ver o pipeline Kanban
4. Artistas que marcaram interesse aparecerão como candidatos

### Como testar o perfil de artista:
1. Faça login como **Artista** (`artista@teste.com`)
2. Acesse `/profile` para ver seu perfil
3. Clique em "Atualizar perfil" para editar informações
4. Explore as seções: Skills, Portfólio, Feed, Reviews

### Como testar o painel admin:
1. Faça login como **Admin** (`admin@teste.com`)
2. Acesse `/admin` para ver o painel administrativo
3. Visualize alertas e estatísticas do sistema

---

**Última atualização:** 2025-01-XX

