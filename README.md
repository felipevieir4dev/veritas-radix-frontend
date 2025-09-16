# Veritas Radix - Frontend Only

Aplicação de etimologia desenvolvida com React, Vite e Tailwind CSS, preservando o design original do Figma.

## 🎨 Design Preservado

- **Fonte principal**: EB Garamond
- **Cor padrão**: #8b0000 (vermelho profundo)
- **Fundo**: Pergaminho envelhecido com texturas
- **Paleta**: Bronze/dourada inspirada em manuscritos medievais

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utilitário
- **TypeScript** - Tipagem estática
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Motion** - Animações

## 📱 Funcionalidades

### 6 Telas Principais:
1. **Login** - Autenticação de estudantes e professores
2. **Pesquisa** - Busca e análise de palavras
3. **Análise Morfológica** - Decomposição de palavras
4. **Desafios** - Sistema gamificado de exercícios
5. **Perfil** - Dashboard do usuário com progresso
6. **Árvore Etimológica** - Visualização das origens das palavras

### Sistema de Gamificação:
- Sistema completo de XP e níveis
- Medalhas e conquistas
- Desafios criativos com storytelling
- Ranking entre estudantes
- Dashboard gamificado

### Dashboard do Professor:
- Gestão de alunos e turmas
- Relatórios de progresso
- Estatísticas detalhadas
- Controle de desafios

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js ≥ 18.0.0
- npm ≥ 8.0.0

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/veritas-radix-frontend.git
cd veritas-radix-frontend

# Instale as dependências
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
npm run preview
```

## 📂 Estrutura do Projeto

```
├── App.tsx                 # Componente principal da aplicação
├── main.tsx               # Entry point
├── index.html             # HTML base
├── components/            # Componentes React
│   ├── ui/               # Componentes da UI (Radix)
│   ├── ChallengesScreen.tsx
│   ├── EtymologyTreeScreen.tsx
│   ├── GamificationSystem.tsx
│   ├── LoginScreen.tsx
│   ├── MainScreen.tsx
│   ├── MorphologyScreen.tsx
│   ├── Navigation.tsx
│   ├── ProfileScreen.tsx
│   └── TeacherDashboard.tsx
├── lib/                  # Utilitários e configurações
│   ├── api.ts           # Cliente da API (mock)
│   └── config.ts        # Configurações
├── styles/              # Estilos globais
│   └── globals.css      # CSS do Tailwind
└── public/              # Assets estáticos
```

## 🎯 Recursos de Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa o ESLint
- `npm run type-check` - Verifica tipos TypeScript

### Dados Mock Incluídos
- **6 palavras** com análise etimológica completa
- **Sistema de usuários** (professores e alunos)
- **Gamificação** funcional com XP, níveis e conquistas
- **Sistema de turmas** com códigos de entrada

## 🌟 Vantagens da Versão Frontend-Only

- ✅ **Deploy Simples** - Apenas frontend estático
- ✅ **Zero Dependências Backend** - Funciona offline
- ✅ **Demo Completa** - Todas as funcionalidades visíveis
- ✅ **Prototipagem Rápida** - Ideal para validação de conceitos
- ✅ **Manutenção Mínima** - Sem servidor para gerenciar
- ✅ **Performance Alta** - Sem latência de API
- ✅ **Design Preservado** - Mantém fidelidade ao Figma

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Veritas Radix** - Descobrindo as raízes das palavras através da tecnologia.