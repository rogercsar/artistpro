# 🎭 Instruções para Executar o Projeto Danz

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com o Node.js)

## 🚀 Passos para Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
```bash
npm start
```

### 3. Acessar a Aplicação
Abra seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

## 🔐 Contas para Teste

### Bailarino Pro (Maria Silva)
- **Email**: maria@email.com
- **Senha**: 123456
- **Recursos**: Perfil verificado, portfólio completo, acesso a métricas

### Bailarino Avançado (João Santos)
- **Email**: joao@email.com
- **Senha**: 123456
- **Recursos**: Portfólio com fotos e vídeos, habilidades ilimitadas

### Bailarino Básico (Ana Costa)
- **Email**: ana@email.com
- **Senha**: 123456
- **Recursos**: Perfil básico, até 5 habilidades, visualização de eventos

### Contratante (Dança Produções)
- **Email**: contato@dancaproducoes.com
- **Senha**: 123456
- **Recursos**: Criação de eventos, busca avançada, gerenciamento de candidatos

## 🎯 Funcionalidades para Testar

### 1. Autenticação
- ✅ Cadastro de novos usuários (Bailarino/Contratante)
- ✅ Login com diferentes tipos de usuário
- ✅ Logout e navegação protegida

### 2. Página Inicial
- ✅ Hero section com call-to-action
- ✅ Estatísticas da plataforma
- ✅ Eventos em destaque
- ✅ Bailarinos em destaque

### 3. Feed de Eventos
- ✅ Listagem de eventos com filtros
- ✅ Busca por texto, localização e estilo de dança
- ✅ Cards de eventos com informações completas
- ✅ Navegação para detalhes do evento

### 4. Detalhes do Evento
- ✅ Informações completas do evento
- ✅ Galeria de imagens
- ✅ Lista de requisitos
- ✅ Informações do contratante
- ✅ Lista de bailarinos interessados
- ✅ Botão de interesse (para bailarinos)

### 5. Perfis de Usuário
- ✅ Perfil completo com biografia
- ✅ Sistema de abas (Sobre, Portfólio, Eventos)
- ✅ Informações de contato
- ✅ Redes sociais (para bailarinos)
- ✅ Sistema de avaliações
- ✅ Disponibilidade (para bailarinos)

### 6. Busca de Bailarinos
- ✅ Listagem de bailarinos com filtros
- ✅ Filtros por localização, estilo e nível
- ✅ Cards com informações resumidas
- ✅ Navegação para perfil completo

### 7. Criação de Eventos
- ✅ Formulário completo para contratantes
- ✅ Seleção de estilos de dança
- ✅ Adição de requisitos
- ✅ Upload de imagens (interface)

### 8. Design Responsivo
- ✅ Mobile-first design
- ✅ Navegação mobile com menu hambúrguer
- ✅ Cards adaptativos
- ✅ Formulários responsivos

## 🎨 Sistema de Níveis

### Bailarino Básico (Gratuito)
- Perfil básico com bio e foto
- Até 5 habilidades
- Visualização de eventos
- Até 10 interesses por mês

### Bailarino Avançado (Pago)
- Todos os recursos básicos
- Portfólio com fotos e vídeos
- Habilidades ilimitadas
- Agenda de disponibilidade
- Interações sociais

### Bailarino Pro (Premium)
- Todos os recursos avançados
- Perfil verificado
- Feed pessoal de atividades
- Contato direto com outros Pro
- Métricas de visualização

### Contratante Básico (Gratuito)
- Perfil da empresa
- Até 2 eventos por mês
- Visualização de perfis básicos
- Contato com até 5 bailarinos/mês

### Contratante Avançado (Pago)
- Todos os recursos básicos
- Eventos ilimitados
- Filtros avançados
- Acesso completo aos perfis
- Ferramentas de gerenciamento

## 🛠️ Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Ejetar configurações (não recomendado)
npm run eject
```

## 📱 Teste em Diferentes Dispositivos

### Desktop
- Chrome, Firefox, Safari, Edge
- Resoluções: 1920x1080, 1366x768, 1440x900

### Tablet
- iPad (768x1024)
- Android tablets (800x1280)

### Mobile
- iPhone (375x667, 414x896)
- Android (360x640, 412x915)

## 🐛 Solução de Problemas

### Erro de Porta em Uso
```bash
# Se a porta 3000 estiver ocupada, o React perguntará se quer usar outra porta
# Ou você pode especificar uma porta diferente:
PORT=3001 npm start
```

### Problemas com Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript
```bash
# Verificar tipos
npx tsc --noEmit
```

## 📊 Estrutura de Dados

O projeto usa dados mockados localizados em `src/data/mockData.ts`:

- **Usuários**: Bailarinos, contratantes e admin
- **Eventos**: Com informações completas e relacionamentos
- **Avaliações**: Sistema de reviews entre usuários
- **Posts de Atividade**: Feed social para usuários Pro

## 🎯 Próximas Funcionalidades

- [ ] Sistema de mensagens em tempo real
- [ ] Upload real de arquivos
- [ ] Sistema de pagamentos
- [ ] Notificações push
- [ ] Chat integrado
- [ ] Dashboard de analytics
- [ ] API REST completa

## 📞 Suporte

Se encontrar algum problema:

1. Verifique se todas as dependências foram instaladas
2. Confirme que está usando Node.js 16+
3. Limpe o cache do navegador
4. Verifique o console do navegador para erros

---

**Divirta-se explorando a plataforma Danz! 🎭✨**


