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
   * Login simples sem navegação (assumindo que já está na página)
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  performQuickLogin(email, password) {
    this.fillLoginForm(email, password)
    this.submitLogin()
  }

  /**
   * Logout inteligente que verifica se o usuário está logado
   */
  performSmartLogout() {
    cy.get('body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        this.logout()
      } else {
        this.accessLoginPage()
        this.verifyLoginPageLoaded()
      }
    })
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
