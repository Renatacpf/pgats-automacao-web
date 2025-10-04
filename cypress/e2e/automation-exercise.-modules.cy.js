/// <reference types="cypress" />

import CadastroPage from '../modules/cadastro/index.js'
import ContatoPage from '../modules/contato/index.js'
import {
  generateUserData,
  generateContactData,
  getRandomBirthDate
} from '../support/helpers.js'

describe('Automation Exercise', () => {
  let cadastroPage
  let contatoPage

  beforeEach(() => {
    // Instanciar os page objects antes de cada teste
    cadastroPage = new CadastroPage()
    contatoPage = new ContatoPage()
  })

  it('Cadastrar um usuário', () => {
    // Gerar dados dinâmicos
    const userData = generateUserData()
    const birthDate = getRandomBirthDate()
    
    // Executar ações passo a passo para permitir validações
    cadastroPage.visitHomePage()
    cadastroPage.accessSignupPage()
    cadastroPage.fillSignupForm(userData)
    cadastroPage.fillAccountForm(userData, birthDate)
    cadastroPage.createAccount()
    
    // Validar conta criada
    cy.url().should('include', 'account_created')
    cy.contains('Account Created!')
    
    cadastroPage.continueToAccount()
    
    // Validar usuário logado
    cy.contains(`Logged in as ${userData.name}`)
    
    // Log dos dados gerados para debug
    cy.log('Usuário cadastrado:', userData.name)
    cy.log('Email:', userData.email)
  })

  it('Enviar formulário de contato com upload de arquivo', () => {
    // Gerar dados dinâmicos
    const contactData = generateContactData()
    
    // Executar ações passo a passo para permitir validações
    contatoPage.visitHomePage()
    contatoPage.accessContactPage()
    
    // Validar página de contato carregada
    cy.url().should('include', '/contact_us')
    cy.contains('h2', 'Get In Touch')
    
    contatoPage.fillContactForm(contactData)
    contatoPage.uploadFile()
    contatoPage.submitForm()
    
    // Validar mensagem de sucesso
    cy.get('.status')
      .should('contain', 'Success! Your details have been submitted successfully.')
    
    contatoPage.returnToHomePage()
    
    // Validar retorno à página inicial
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise')
    
    // Log dos dados gerados para debug
    cy.log('Contato enviado por:', contactData.name)
    cy.log('Assunto:', contactData.subject)
  })
});