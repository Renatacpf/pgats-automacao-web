/// <reference types="cypress" />

import CadastroPage from '../modules/cadastro/index.js'
import ContatoPage from '../modules/contato/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'

describe('Automation Exercise - Modular', () => {
  let cadastroPage
  let contatoPage
  let loginPage
  let menuPage

  beforeEach(() => {
    // Instanciar os page objects antes de cada teste
    cadastroPage = new CadastroPage()
    contatoPage = new ContatoPage()
    loginPage = new LoginPage()
    menuPage = new MenuPage()
  })

  it('Cadastrar um usuário - usando módulo', () => {
    // Executar o cadastro completo usando o módulo
    const userData = cadastroPage.cadastrarUsuario()
    
    // Log dos dados gerados para debug
    cy.log('Usuário cadastrado:', userData.name)
    cy.log('Email:', userData.email)
  })

  it('Enviar formulário de contato com upload de arquivo - usando módulo', () => {
    // Executar o envio do formulário de contato usando o módulo
    const contactData = contatoPage.enviarFormularioContato()
    
    // Log dos dados gerados para debug
    cy.log('Contato enviado por:', contactData.name)
    cy.log('Assunto:', contactData.subject)
  })

  it('Verificar navegação do menu principal', () => {
    // Verificar o menu principal usando o módulo
    menuPage.verificarMenuPrincipal()
    
    // Testar navegação para diferentes seções
    menuPage.navigateToProducts()
    cy.log('Navegação para produtos realizada')
    
    menuPage.navigateToContact()
    cy.log('Navegação para contato realizada')
    
    menuPage.visitHomePage()
    cy.log('Retorno para página inicial realizado')
  })

  // Exemplo de teste que combina múltiplos módulos
  it('Fluxo completo: Cadastrar usuário e enviar contato', () => {
    // Primeiro, cadastrar um usuário
    const userData = cadastroPage.cadastrarUsuario()
    cy.log('Usuário cadastrado:', userData.name)
    
    // Verificar se o usuário está logado no menu
    menuPage.verifyUserLoggedIn(userData.name)
    
    // Em seguida, enviar um formulário de contato
    const contactData = contatoPage.enviarFormularioContato()
    cy.log('Contato enviado:', contactData.subject)
  })

  it('Fluxo avançado: Cadastro, logout, login e contato', () => {
    // 1. Cadastrar um novo usuário
    const userData = cadastroPage.cadastrarUsuario()
    cy.log('Etapa 1: Usuário cadastrado -', userData.name)
    
    // 2. Realizar logout
    loginPage.realizarLogout()
    cy.log('Etapa 2: Logout realizado')
    
    // 3. Realizar login novamente
    loginPage.realizarLogin(userData.email, userData.password)
    loginPage.verifySuccessfulLogin(userData.name)
    cy.log('Etapa 3: Login realizado com sucesso')
    
    // 4. Enviar formulário de contato
    const contactData = contatoPage.enviarFormularioContato()
    cy.log('Etapa 4: Contato enviado -', contactData.subject)
  })
});