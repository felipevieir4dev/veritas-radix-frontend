# Veritas Radix - Frontend Only

Esta é a versão frontend-only da aplicação Veritas Radix, uma aplicação de etimologia com design inspirado em manuscritos medievais.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS v4** para estilização
- **Shadcn/ui** para componentes
- **Lucide React** para ícones

## 🎨 Características

- **Design Medieval/Renascentista** com pergaminhos e ornamentos dourados
- **Sistema de Gamificação** com XP, níveis e conquistas
- **Análise Morfológica** das palavras com prefixo, raiz e sufixo
- **Modo Professor/Aluno** com interfaces adaptadas
- **Totalmente Responsivo** para todas as telas
- **Paleta de Cores Autêntica** (#8b0000, #704214)
- **Tipografia EB Garamond** para autenticidade

## 📁 Estrutura

```
/
├── components/          # Componentes React
├── lib/                # Utilitários e configuração
├── styles/             # CSS global
├── src/                # Arquivos principais do Vite
└── public/             # Arquivos públicos
```

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Build para produção:**
   ```bash
   npm run build
   ```

## 🎮 Funcionalidades

### Para Alunos:
- 🔍 Pesquisa etimológica
- 📊 Análise morfológica detalhada
- 🏆 Sistema de gamificação
- 🌳 Árvore etimológica
- 🎯 Desafios interativos

### Para Professores:
- 👥 Dashboard administrativo
- 📈 Acompanhamento de progresso
- 🏫 Gerenciamento de turmas
- 📊 Relatórios pedagógicos

## 🎨 Design System

- **Cores principais:** #8b0000 (Deep Red), #704214 (Sepia)
- **Tipografia:** EB Garamond (corpo), Cinzel (títulos)
- **Tema:** Medieval/Renascentista com pergaminhos
- **Componentes:** Sistema de cards com bordas ornamentadas

## 📱 Responsividade

A aplicação é completamente responsiva com:
- Breakpoints otimizados para mobile/tablet/desktop
- Tipografia responsiva
- Navegação adaptativa
- Componentes flexíveis

## 🔧 Configuração

Todas as configurações estão em:
- `/lib/config.ts` - Configurações gerais
- `/styles/globals.css` - Estilos globais e variáveis CSS

## 📝 Dados Mock

A aplicação funciona com dados mock incluídos para:
- Análise etimológica de 6 palavras principais
- Sistema de gamificação completo
- Progresso de usuários simulado
- Turmas e professores de exemplo