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

  fillBasicSignupForm(name, email) {
    this.accessSignupPage()
    cy.contains('h2', 'New User Signup!')
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }

  fillSignupForm(userData) {
    cy.get('[data-qa="signup-name"]').type(userData.name)
    cy.get('[data-qa="signup-email"]').type(userData.email)
    cy.contains('button', 'Signup').click()
  }

  fillCompleteAccountForm(userData, birthDate = null) {
    if (!birthDate) {
      birthDate = getRandomBirthDate()
    }
    this.fillAccountForm(userData, birthDate)
  }

  fillAccountForm(userData, birthDate) {
    cy.get('input[type="radio"]').check('Mrs')
    cy.get('input#password').type(userData.password, { log: false })

    cy.get('[data-qa=days]').select(birthDate.day)
    cy.get('[data-qa=months]').select(birthDate.month)
    cy.get('[data-qa=years]').select(birthDate.year)

    cy.get('input[type="checkbox"]#newsletter').check()
    cy.get('input[type="checkbox"]#optin').check()

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

  cadastrarUsuario() {
    const userData = generateUserData()
    const birthDate = getRandomBirthDate()

    this.visitHomePage()
    this.accessSignupPage()
    this.fillSignupForm(userData)
    this.fillAccountForm(userData, birthDate)
    this.createAccount()
    this.continueToAccount()

    return userData
  }
}

export default CadastroPage
