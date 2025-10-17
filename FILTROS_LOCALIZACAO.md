# Filtros de Localização - Estados e Cidades Brasileiras

## Resumo das Implementações

Foi implementado um sistema completo de filtros de localização nas páginas de **Eventos** e **Bailarinos**, incluindo todos os estados brasileiros e suas principais cidades.

## Arquivos Criados/Modificados

### 1. `src/data/brazilianLocations.ts` (NOVO)
- **Função**: Arquivo de dados com todos os estados brasileiros e suas cidades
- **Conteúdo**:
  - Interface `State` para tipagem
  - Array `brazilianStates` com todos os 26 estados + DF
  - Funções utilitárias:
    - `getAllCities()`: Retorna todas as cidades do Brasil
    - `getCitiesByState(stateName)`: Retorna cidades de um estado específico
    - `getStates()`: Retorna lista de todos os estados

### 2. `src/pages/Events.tsx` (MODIFICADO)
- **Mudanças**:
  - Importação do arquivo de localizações brasileiras
  - Substituição do filtro simples de localização por filtros de Estado e Cidade
  - Lógica de filtro atualizada para considerar estado e cidade separadamente
  - Interface de filtros expandida para 3 colunas (Estado, Cidade, Estilo de Dança)
  - Reset automático da cidade quando o estado é alterado
  - Campo de cidade desabilitado quando nenhum estado está selecionado

### 3. `src/pages/Dancers.tsx` (MODIFICADO)
- **Mudanças**:
  - Importação do arquivo de localizações brasileiras
  - Substituição do filtro simples de localização por filtros de Estado e Cidade
  - Lógica de filtro atualizada para considerar estado e cidade separadamente
  - Interface de filtros expandida para 4 colunas (Estado, Cidade, Estilo de Dança, Nível)
  - Reset automático da cidade quando o estado é alterado
  - Campo de cidade desabilitado quando nenhum estado está selecionado

## Funcionalidades Implementadas

### Filtros de Localização
1. **Seleção de Estado**:
   - Dropdown com todos os 26 estados brasileiros + Distrito Federal
   - Opção "Todos os estados" para não filtrar por estado

2. **Seleção de Cidade**:
   - Dropdown dinâmico que mostra apenas as cidades do estado selecionado
   - Desabilitado quando nenhum estado está selecionado
   - Opção "Todas as cidades" para não filtrar por cidade
   - Reset automático quando o estado é alterado

3. **Comportamento Inteligente**:
   - Filtros funcionam em conjunto (estado E cidade)
   - Interface responsiva (1 coluna em mobile, 3-4 colunas em desktop)
   - Estados visuais para campos desabilitados

### Dados de Localização
- **26 Estados + DF**: Todos os estados brasileiros incluídos
- **Principais Cidades**: Cada estado inclui suas principais cidades (5-10 cidades por estado)
- **São Paulo**: Inclui mais de 100 cidades devido ao seu tamanho
- **Dados Realistas**: Cidades baseadas em dados reais de população e importância regional

## Melhorias na UX

1. **Filtros Hierárquicos**: Estado → Cidade (relacionamento lógico)
2. **Feedback Visual**: Campos desabilitados com estilo diferenciado
3. **Reset Automático**: Cidade é limpa quando estado muda
4. **Responsividade**: Layout adapta-se a diferentes tamanhos de tela
5. **Performance**: Filtros aplicados em tempo real

## Como Usar

1. **Na página de Eventos**:
   - Clique em "Filtros" para expandir os filtros
   - Selecione um estado (opcional)
   - Selecione uma cidade do estado escolhido (opcional)
   - Escolha um estilo de dança (opcional)
   - Os eventos são filtrados automaticamente

2. **Na página de Bailarinos**:
   - Clique em "Filtros" para expandir os filtros
   - Selecione um estado (opcional)
   - Selecione uma cidade do estado escolhido (opcional)
   - Escolha um estilo de dança (opcional)
   - Escolha um nível (opcional)
   - Os bailarinos são filtrados automaticamente

## Benefícios

- **Busca Mais Precisa**: Usuários podem encontrar eventos/bailarinos em localizações específicas
- **Experiência Nacional**: Cobertura completa do território brasileiro
- **Interface Intuitiva**: Filtros hierárquicos seguem a lógica geográfica
- **Performance**: Filtros aplicados localmente, sem necessidade de requisições ao servidor
- **Escalabilidade**: Fácil adicionar mais cidades ou modificar dados existentes

## Próximos Passos Sugeridos

1. **Integração com API**: Conectar com serviços de geolocalização
2. **Busca por CEP**: Permitir busca por código postal
3. **Mapa Interativo**: Adicionar visualização em mapa
4. **Histórico de Busca**: Salvar filtros utilizados recentemente
5. **Sugestões**: Auto-complete baseado em digitação

