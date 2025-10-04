import {
  generateUserData,
  getRandomBirthDate
} from '../../support/helpers.js'

class CadastroPage {
  
  visitHomePage() {
    cy.visit('https://automationexercise.com/')
  }

  accessSignupPage() {
    cy.get('a[href="/login"]').click()
  }

  fillSignupForm(userData) {
    cy.get('[data-qa="signup-name"]').type(userData.name)
    cy.get('[data-qa="signup-email"]').type(userData.email)
    cy.contains('button', 'Signup').click()
  }

  fillAccountForm(userData, birthDate) {
    // Selecionar gênero
    cy.get('input[type="radio"]').check('Mrs')
    
    // Definir senha
    cy.get('input#password').type(userData.password, { log: false })

    // Selecionar data de nascimento
    cy.get('[data-qa=days]').select(birthDate.day)
    cy.get('[data-qa=months]').select(birthDate.month)
    cy.get('[data-qa=years]').select(birthDate.year)

    // Marcar checkboxes
    cy.get('input[type="checkbox"]#newsletter').check()
    cy.get('input[type="checkbox"]#optin').check()

    // Preencher informações pessoais
    cy.get('input#first_name').type(userData.firstName)
    cy.get('input#last_name').type(userData.lastName)
    cy.get('input#company').type(userData.company)
    cy.get('input#address1').type(userData.address)
    cy.get('select#country').select(userData.country)
    cy.get('input#state').type(userData.state)
    cy.get('input#city').type(userData.city)
    cy.get('[data-qa="zipcode"]').type(userData.zipcode)
    cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber)
  }

  createAccount() {
    cy.get('[data-qa="create-account"]').click()
  }

  continueToAccount() {
    cy.get('[data-qa="continue-button"]').click()
  }

  /**
   * Método principal para realizar o cadastro completo de um usuário (apenas ações)
   */
  cadastrarUsuario() {
    // Gerar dados dinâmicos para o usuário
    const userData = generateUserData()
    const birthDate = getRandomBirthDate()

    this.visitHomePage()
    this.accessSignupPage()
    this.fillSignupForm(userData)
    this.fillAccountForm(userData, birthDate)
    this.createAccount()
    this.continueToAccount()

    // Retornar dados do usuário para uso posterior
    return userData
  }
}

export default CadastroPage
