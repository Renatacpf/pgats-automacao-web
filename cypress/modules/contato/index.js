import { generateContactData } from '../../support/helpers.js'

class ContatoPage {
  
  visitHomePage() {
    cy.visit('https://automationexercise.com/')
  }

  accessContactPage() {
    cy.get('a[href="/contact_us"]').click()
  }

  // Método removido - verificação movida para o teste

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

  returnToHomePage() {
    cy.get('#form-section a[href="/"]').click()
  }

  /**
   * Método principal para enviar formulário de contato com upload de arquivo (apenas ações)
   */
  enviarFormularioContato() {
    // Gerar dados dinâmicos para o formulário de contato
    const contactData = generateContactData()
    
    this.visitHomePage()
    this.accessContactPage()
    this.fillContactForm(contactData)
    this.uploadFile()
    this.submitForm()
    this.returnToHomePage()

    // Retornar dados do contato para uso posterior
    return contactData
  }
}

export default ContatoPage
