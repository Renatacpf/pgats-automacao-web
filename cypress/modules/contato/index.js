import { generateContactData } from '../../support/helpers.js'

class ContatoPage {
  
  visitHomePage() {
    cy.visit('https://automationexercise.com/')
  }

  accessContactPage() {
    cy.get('a[href="/contact_us"]').click()
  }

  verifyContactPageLoaded() {
    cy.url().should('include', '/contact_us')
    cy.contains('h2', 'Get In Touch')
  }

  fillContactForm(contactData) {
    cy.get('input[name="name"]').type(contactData.name)
    cy.get('input[name="email"]').type(contactData.email)
    cy.get('input[name="subject"]').type(contactData.subject)
    cy.get('textarea[name="message"]').type(contactData.message)
  }

  uploadFile() {
    cy.fixture('test-image.png').as('testImage')
    cy.get('input[name="upload_file"]').selectFile('@testImage')
  }

  submitForm() {
    cy.get('input[name="submit"]').click()
  }

  verifySuccessMessage() {
    cy.get('.status')
      .should('contain', 'Success! Your details have been submitted successfully.')
      .should('be.visible')
  }

  returnToHomePage() {
    cy.get('#form-section a[href="/"]').click()
  }

  verifyReturnedToHome() {
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise')
  }

  /**
   * Método principal para enviar formulário de contato com upload de arquivo
   */
  enviarFormularioContato() {
    // Gerar dados dinâmicos para o formulário de contato
    const contactData = generateContactData()
    
    this.visitHomePage()
    this.accessContactPage()
    this.verifyContactPageLoaded()
    this.fillContactForm(contactData)
    this.uploadFile()
    this.submitForm()
    this.verifySuccessMessage()
    this.returnToHomePage()
    this.verifyReturnedToHome()

    // Retornar dados do contato para uso posterior se necessário
    return contactData
  }
}

export default ContatoPage
