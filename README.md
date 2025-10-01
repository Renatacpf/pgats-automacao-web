# PGATS - Automação Web com Cypress

Este projeto contém testes automatizados de interface web desenvolvidos com Cypress como parte do curso de Pós-Graduação em Automação de Testes de Software (PGATS).

## 📋 Sobre o Projeto

O projeto utiliza o framework Cypress para automatizar testes de interface web, incluindo cenários de teste para o site [Automation Exercise](https://automationexercise.com/). O objetivo é demonstrar boas práticas de automação de testes e implementar cenários realistas de teste.

## 🛠️ Tecnologias Utilizadas

- **Cypress** (v13.7.3) - Framework de teste end-to-end
- **JavaScript** - Linguagem de programação
- **Node.js** - Ambiente de execução

## 📁 Estrutura do Projeto

```
pgats-automacao-web/
├── cypress/
│   ├── e2e/                          # Testes end-to-end
│   │   ├── automation-exercise.cy.js  # Testes do Automation Exercise
│   │   ├── 1-getting-started/        # Exemplos básicos do Cypress
│   │   └── 2-advanced-examples/      # Exemplos avançados do Cypress
│   ├── fixtures/                     # Dados de teste (JSON)
│   └── support/                      # Comandos customizados e configurações
├── cypress.config.js                 # Configuração do Cypress
├── package.json                      # Dependências e scripts
└── README.md                         # Documentação do projeto
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn instalado

### Instalação

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd pgats-automacao-web
```

2. Instale as dependências
```bash
npm install
```

### Comandos para Executar o Cypress

#### 1. Abrir o Cypress Test Runner (Interface Gráfica)
```bash
npx cypress open
```
Este comando abre a interface gráfica do Cypress, onde você pode:
- Visualizar todos os testes disponíveis
- Executar testes individualmente
- Ver a execução em tempo real
- Debuggar testes facilmente

#### 2. Executar Testes em Modo Headless (Terminal)
```bash
npx cypress run
```
Este comando executa todos os testes no terminal sem interface gráfica, ideal para:
- Integração contínua (CI/CD)
- Execução rápida de todos os testes
- Geração de relatórios

#### 3. Executar um Teste Específico
```bash
npx cypress run --spec "cypress/e2e/automation-exercise.cy.js"
```

#### 4. Executar Testes em um Browser Específico
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

#### 5. Executar Testes com Interface Gráfica em Browser Específico
```bash
npx cypress open --browser chrome
```

## 📝 Scripts Personalizados

Você pode adicionar os seguintes scripts no `package.json` para facilitar a execução:

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "test": "cypress run",
    "test:chrome": "cypress run --browser chrome",
    "test:firefox": "cypress run --browser firefox"
  }
}
```

Após adicionar os scripts, use:
```bash
npm run cypress:open    # Abre interface gráfica
npm run cypress:run     # Executa no terminal
npm test               # Executa todos os testes
npm run test:chrome    # Executa no Chrome
```

## 🧪 Cenários de Teste

### Automation Exercise
- **Cadastro de usuário**: Teste de criação de nova conta
- **Login**: Validação de autenticação
- **Navegação**: Testes de fluxo da aplicação

### Exemplos Cypress
O projeto inclui exemplos oficiais do Cypress organizados em:
- **Getting Started**: Conceitos básicos
- **Advanced Examples**: Funcionalidades avançadas como actions, assertions, network requests, etc.

## 📊 Relatórios

O Cypress gera automaticamente:
- Screenshots de falhas (pasta `cypress/screenshots/`)
- Vídeos de execução (pasta `cypress/videos/`)
- Relatórios em HTML (quando configurado)

## 🎯 Boas Práticas Implementadas

- Uso de data attributes para seletores mais estáveis
- Organização clara da estrutura de testes
- Comandos customizados para reutilização
- Configuração adequada para diferentes ambientes

## 🔧 Configuração Adicional

### Configurar Base URL
Edite o arquivo `cypress.config.js`:
```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

### Viewport e Timeouts
```javascript
module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

## 📖 Documentação Útil

- [Documentação Oficial do Cypress](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

## 👨‍💻 Autor

**Renata** - Estudante PGATS  
Projeto desenvolvido como parte do curso de Pós-Graduação em Automação de Testes de Software.

---

## 📝 Notas de Desenvolvimento

Para contribuir com o projeto:
1. Crie uma branch para sua feature
2. Implemente os testes seguindo os padrões estabelecidos
3. Execute os testes para garantir que estão passando
4. Submeta um pull request

**Última atualização**: Outubro 2025