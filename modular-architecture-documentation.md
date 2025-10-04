# Documentação da Estrutura Modular - Cypress

## Visão Geral

Este projeto foi refatorado para utilizar uma arquitetura modular baseada no padrão **Page Object Model (POM)**. Cada módulo representa uma área específica da aplicação e contém métodos relacionados àquela funcionalidade.

## Estrutura dos Módulos

### 📁 cypress/modules/

```
modules/
├── cadastro/
│   └── index.js          # Módulo de cadastro de usuários
├── contato/
│   └── index.js          # Módulo de formulário de contato
├── login/
│   └── index.js          # Módulo de autenticação
├── menu/
│   └── index.js          # Módulo de navegação
└── carrinho/
    └── index.js          # Módulo de carrinho de compras
```

## Módulos Implementados

### 🔐 Módulo de Cadastro (`cadastro/index.js`)

**Classe:** `CadastroPage`

**Funcionalidades:**
- Cadastro completo de usuários
- Preenchimento automático de formulários
- Validação de dados
- Geração de dados dinâmicos usando faker.js

**Métodos Principais:**
- `cadastrarUsuario()` - Executa o fluxo completo de cadastro
- `fillSignupForm(userData)` - Preenche dados iniciais de signup
- `fillAccountForm(userData, birthDate)` - Preenche dados da conta
- `verifyAccountCreated()` - Valida criação da conta

**Exemplo de Uso:**
```javascript
const cadastroPage = new CadastroPage()
const userData = cadastroPage.cadastrarUsuario()
```

### 📧 Módulo de Contato (`contato/index.js`)

**Classe:** `ContatoPage`

**Funcionalidades:**
- Envio de formulário de contato
- Upload de arquivos
- Validação de envio
- Geração de dados dinâmicos

**Métodos Principais:**
- `enviarFormularioContato()` - Executa o fluxo completo de contato
- `fillContactForm(contactData)` - Preenche formulário
- `uploadFile()` - Realiza upload de arquivo
- `verifySuccessMessage()` - Valida mensagem de sucesso

**Exemplo de Uso:**
```javascript
const contatoPage = new ContatoPage()
const contactData = contatoPage.enviarFormularioContato()
```

### 🔑 Módulo de Login (`login/index.js`)

**Classe:** `LoginPage`

**Funcionalidades:**
- Login de usuários
- Logout
- Validação de credenciais
- Verificação de estados de autenticação

**Métodos Principais:**
- `realizarLogin(email, password)` - Executa login
- `realizarLogout()` - Executa logout
- `verifySuccessfulLogin(userName)` - Valida login
- `verifyLoginError()` - Valida erro de login

**Exemplo de Uso:**
```javascript
const loginPage = new LoginPage()
loginPage.realizarLogin(email, password)
```

### 🧭 Módulo de Menu (`menu/index.js`)

**Classe:** `MenuPage`

**Funcionalidades:**
- Navegação entre páginas
- Verificação de menu principal
- Validação de links
- Controle de navegação

**Métodos Principais:**
- `verificarMenuPrincipal()` - Valida menu principal
- `navigateToProducts()` - Navega para produtos
- `navigateToContact()` - Navega para contato
- `verifyUserLoggedIn(userName)` - Verifica usuário logado

**Exemplo de Uso:**
```javascript
const menuPage = new MenuPage()
menuPage.verificarMenuPrincipal()
```

### 🛒 Módulo de Carrinho (`carrinho/index.js`)

**Classe:** `CarrinhoPage`

**Funcionalidades:**
- Adição de produtos ao carrinho
- Remoção de produtos
- Verificação de carrinho
- Atualização de quantidades

**Métodos Principais:**
- `adicionarProdutoAoCarrinho(productName)` - Adiciona produto
- `verificarCarrinho()` - Valida carrinho
- `limparCarrinho()` - Remove todos os produtos
- `updateProductQuantity(newQuantity)` - Atualiza quantidade

**Exemplo de Uso:**
```javascript
const carrinhoPage = new CarrinhoPage()
carrinhoPage.adicionarProdutoAoCarrinho('T-shirt')
```

## Arquivo de Teste Principal

### 📄 `automation-exercise.-modules.cy.js`

Este arquivo demonstra o uso coordenado de todos os módulos:

**Testes Implementados:**
1. **Cadastro individual** - Teste do módulo de cadastro
2. **Contato individual** - Teste do módulo de contato  
3. **Navegação de menu** - Teste do módulo de menu
4. **Fluxo completo simples** - Combina cadastro e contato
5. **Fluxo avançado** - Cadastro + logout + login + contato

## Vantagens da Arquitetura Modular

### ✅ **Reutilização de Código**
- Métodos podem ser usados em múltiplos testes
- Reduz duplicação de código
- Facilita manutenção

### ✅ **Manutenibilidade**
- Alterações na UI requerem mudanças apenas no módulo correspondente
- Código organizado por funcionalidade
- Fácil localização de problemas

### ✅ **Escalabilidade**
- Novos módulos podem ser adicionados facilmente
- Estrutura consistente para toda a equipe
- Facilita colaboração

### ✅ **Testabilidade**
- Métodos específicos podem ser testados individualmente
- Fluxos complexos são compostos por métodos simples
- Debug mais eficiente

### ✅ **Legibilidade**
- Testes mais limpos e focados
- Métodos com nomes descritivos
- Separação clara de responsabilidades

## Como Usar os Módulos

### 1. **Importação**
```javascript
import CadastroPage from '../modules/cadastro/index.js'
import ContatoPage from '../modules/contato/index.js'
import LoginPage from '../modules/login/index.js'
```

### 2. **Instanciação**
```javascript
beforeEach(() => {
  cadastroPage = new CadastroPage()
  contatoPage = new ContatoPage()
  loginPage = new LoginPage()
})
```

### 3. **Uso nos Testes**
```javascript
it('Teste exemplo', () => {
  const userData = cadastroPage.cadastrarUsuario()
  loginPage.realizarLogout()
  loginPage.realizarLogin(userData.email, userData.password)
  const contactData = contatoPage.enviarFormularioContato()
})
```

## Boas Práticas

### 🎯 **Nomenclatura**
- Classes em PascalCase: `CadastroPage`
- Métodos em camelCase: `cadastrarUsuario()`
- Métodos descritivos: `verifySuccessfulLogin()`

### 🎯 **Estrutura de Métodos**
- Métodos atômicos para ações específicas
- Métodos compostos para fluxos completos
- Validações incluídas nos métodos
- Logs informativos para debug

### 🎯 **Retorno de Dados**
- Métodos principais retornam dados gerados
- Facilita reutilização de dados entre testes
- Permite validações cruzadas

### 🎯 **Tratamento de Erros**
- Verificações de estado da página
- Validações de elementos visíveis
- Timeouts apropriados

## Integração com Helpers

Os módulos utilizam o arquivo `helpers.js` para:
- Geração de dados dinâmicos com faker.js
- Funções utilitárias compartilhadas
- Padronização de dados de teste

## Execução dos Testes

Para executar os testes modulares:

```bash
# Executar todos os testes modulares
npx cypress run --spec "cypress/e2e/automation-exercise.-modules.cy.js"

# Executar em modo interativo
npx cypress open
```

## Resultados Esperados

✅ **5 testes passando**
- Cadastro individual: ~16s
- Contato individual: ~14s  
- Navegação menu: ~7s
- Fluxo completo: ~31s
- Fluxo avançado: ~40s

**Total: ~2 minutos**

---

Esta estrutura modular fornece uma base sólida e escalável para automação de testes, facilitando manutenção, reutilização e colaboração da equipe.