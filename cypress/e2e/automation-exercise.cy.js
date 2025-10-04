/// <reference types="cypress" />

import testData from '../fixtures/example.json'

describe('Automation Exercise', () => {
  it('Cadastrar um usuário', () => {
    const timestamp = new Date().getTime()

    cy.visit('https://automationexercise.com/')

    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="signup-name"]').type(testData.signupUser.name)
    cy.get('[data-qa="signup-email"]').type(`qa.tester.${timestamp}@example.com`)
    cy.contains('button', 'Signup').click()

    // radio ou checkbox -> check
    // cy.get('#id_gender1').check()
    cy.get('input[type="radio"]').check('Mrs')

    cy.get('input#password').type(testData.signupUser.password), { log: false }

    // para comboboxes ou selects -> select
    cy.get('[data-qa=days]').select('10')
    cy.get('[data-qa=months]').select('May')
    cy.get('[data-qa=years]').select('1990')

    // radio ou checkbox -> check
    // cy.get('#newsletter').check()
    // cy.get('#optin').check()
    cy.get('input[type="checkbox"]#newsletter').check()
    cy.get('input[type="checkbox"]#optin').check()

    cy.get('input#first_name').type(testData.signupUser.firstName)
    cy.get('input#last_name').type(testData.signupUser.lastName)
    cy.get('input#company').type(testData.signupUser.company)
    cy.get('input#address1').type(testData.signupUser.address)
    cy.get('select#country').select(testData.signupUser.country)
    cy.get('input#state').type(testData.signupUser.state)
    cy.get('input#city').type(testData.signupUser.city)
    cy.get('[data-qa="zipcode"]').type(testData.signupUser.zipcode)
    cy.get('[data-qa="mobile_number"]').type(testData.signupUser.mobileNumber)

    // Act
    cy.get('[data-qa="create-account"]').click()

    // Assert
    cy.url().should('include', 'account_created')
    cy.contains('Account Created!').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()
    cy.contains(`Logged in as ${testData.signupUser.name}`).should('be.visible')
  });

  it('Enviar formulário de contato com upload de arquivo', () => {
    cy.visit('https://automationexercise.com/')

    cy.get('a[href="/contact_us"]').click()
    
    cy.url().should('include', '/contact_us')
    cy.contains('h2', 'Get In Touch')

    cy.get('input[name="name"]').type(testData.contactForm.name)
    
    const timestamp = new Date().getTime()
    const emailContato = `qa.contact.${timestamp}@example.com`
    cy.get('input[name="email"]').type(emailContato)
    
    cy.get('input[name="subject"]').type(testData.contactForm.subject)
    
    cy.get('textarea[name="message"]').type(testData.contactForm.message)

    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/test-image.png')
    
    cy.get('input[name="submit"]').click()

    cy.get('.status')
      .should('contain', 'Success! Your details have been submitted successfully.')
      .should('be.visible')
    
    cy.get('#form-section a[href="/"]').click()
    
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise')
  });
});