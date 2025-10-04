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
    cadastroPage = new CadastroPage()
    contatoPage = new ContatoPage()
  })

  it('Cadastrar um usuário', () => {
    const userData = generateUserData()
    const birthDate = getRandomBirthDate()
    
    cadastroPage.visitHomePage()
    cadastroPage.accessSignupPage()
    cadastroPage.fillSignupForm(userData)
    cadastroPage.fillAccountForm(userData, birthDate)
    cadastroPage.createAccount()
    
    cy.url().should('include', 'account_created')
    cy.contains('Account Created!')
    
    cadastroPage.continueToAccount()
    
    cy.contains(`Logged in as ${userData.name}`)
    
    cy.log('Usuário cadastrado:', userData.name)
    cy.log('Email:', userData.email)
  })

  it('Enviar formulário de contato com upload de arquivo', () => {
    const contactData = generateContactData()
    
    contatoPage.visitHomePage()
    contatoPage.accessContactPage()
    
    cy.url().should('include', '/contact_us')
    cy.contains('h2', 'Get In Touch')
    
    contatoPage.fillContactForm(contactData)
    contatoPage.uploadFile()
    contatoPage.submitForm()
    
    cy.get('.status')
      .should('contain', 'Success! Your details have been submitted successfully.')
    
    contatoPage.returnToHomePage()
    
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise')
    
    cy.log('Contato enviado por:', contactData.name)
    cy.log('Assunto:', contactData.subject)
  })
});