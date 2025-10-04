class LoginPage {
  
  visitHomePage() {
    cy.visit('https://automationexercise.com/')
  }

  accessLoginPage() {
    cy.get('a[href="/login"]').click()
  }

  verifyLoginPageLoaded() {
    cy.url().should('include', '/login')
    cy.contains('h2', 'Login to your account').should('be.visible')
  }

  fillLoginForm(email, password) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })
  }

  submitLogin() {
    cy.get('[data-qa="login-button"]').click()
  }

  verifySuccessfulLogin(userName) {
    cy.contains(`Logged in as ${userName}`).should('be.visible')
    cy.url().should('not.include', '/login')
  }

  verifyLoginError() {
    cy.contains('Your email or password is incorrect!').should('be.visible')
  }

  logout() {
    cy.get('a[href="/logout"]').click()
  }

  verifyLogout() {
    cy.url().should('include', '/login')
    cy.contains('h2', 'Login to your account').should('be.visible')
  }

  /**
   * Método principal para realizar login com dados fornecidos
   */
  realizarLogin(email, password) {
    this.visitHomePage()
    this.accessLoginPage()
    this.verifyLoginPageLoaded()
    this.fillLoginForm(email, password)
    this.submitLogin()
  }

  /**
   * Método para realizar logout
   */
  realizarLogout() {
    this.logout()
    this.verifyLogout()
  }
}

export default LoginPage
