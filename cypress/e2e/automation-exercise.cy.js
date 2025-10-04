/// <reference types="cypress" />

import testData from '../fixtures/example.json'
import {
  generateUserData,
  generateContactData,
  getRandomBirthDate
} from '../support/helpers.js'

describe('Automation Exercise', () => {
  it('Cadastrar um usuário', () => {
    // Gerar dados dinâmicos para o usuário
    const userData = generateUserData()
    const birthDate = getRandomBirthDate()

    cy.visit('https://automationexercise.com/')

    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="signup-name"]').type(userData.name)
    cy.get('[data-qa="signup-email"]').type(userData.email)
    cy.contains('button', 'Signup').click()

    // radio ou checkbox -> check
    // cy.get('#id_gender1').check()
    cy.get('input[type="radio"]').check('Mrs')

    cy.get('input#password').type(userData.password), { log: false }

    // para comboboxes ou selects -> select - usando dados dinâmicos
    cy.get('[data-qa=days]').select(birthDate.day)
    cy.get('[data-qa=months]').select(birthDate.month)
    cy.get('[data-qa=years]').select(birthDate.year)

    // radio ou checkbox -> check
    // cy.get('#newsletter').check()
    // cy.get('#optin').check()
    cy.get('input[type="checkbox"]#newsletter').check()
    cy.get('input[type="checkbox"]#optin').check()

    // Preenchimento com dados dinâmicos gerados pelo faker
    cy.get('input#first_name').type(userData.firstName)
    cy.get('input#last_name').type(userData.lastName)
    cy.get('input#company').type(userData.company)
    cy.get('input#address1').type(userData.address)
    cy.get('select#country').select(userData.country)
    cy.get('input#state').type(userData.state)
    cy.get('input#city').type(userData.city)
    cy.get('[data-qa="zipcode"]').type(userData.zipcode)
    cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber)

    // Act
    cy.get('[data-qa="create-account"]').click()

    // Assert
    cy.url().should('include', 'account_created')
    cy.contains('Account Created!').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')
  });

  it('Enviar formulário de contato com upload de arquivo', () => {
    // Gerar dados dinâmicos para o formulário de contato
    const contactData = generateContactData()
    
    cy.visit('https://automationexercise.com/')

    cy.get('a[href="/contact_us"]').click()
    
    cy.url().should('include', '/contact_us')
    cy.contains('h2', 'Get In Touch')

    // Preenchimento com dados dinâmicos gerados pelo faker
    cy.get('input[name="name"]').type(contactData.name)
    cy.get('input[name="email"]').type(contactData.email)
    cy.get('input[name="subject"]').type(contactData.subject)
    cy.get('textarea[name="message"]').type(contactData.message)

    cy.fixture('test-image.png').as('testImage')
    cy.get('input[name="upload_file"]').selectFile('@testImage')

    cy.get('input[name="submit"]').click()

    cy.get('.status')
      .should('contain', 'Success! Your details have been submitted successfully.')
      .should('be.visible')
    
    cy.get('#form-section a[href="/"]').click()
    
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise')
  });
});