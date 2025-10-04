class MenuPage {
  
  visitHomePage() {
    cy.visit('https://automationexercise.com/')
  }

  verifyHomePageLoaded() {
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise').should('be.visible')
  }

  navigateToProducts() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
  }

  navigateToCart() {
    cy.get('a[href="/view_cart"]').click()
    cy.url().should('include', '/view_cart')
  }

  navigateToContact() {
    cy.get('a[href="/contact_us"]').click()
    cy.url().should('include', '/contact_us')
  }

  navigateToLogin() {
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
  }

  navigateToTestCases() {
    cy.get('a[href="/test_cases"]').click()
    cy.url().should('include', '/test_cases')
  }

  navigateToApiTesting() {
    cy.get('a[href="/api_list"]').click()
    cy.url().should('include', '/api_list')
  }

  verifyUserLoggedIn(userName) {
    cy.contains(`Logged in as ${userName}`).should('be.visible')
  }

  verifyLogoutLinkVisible() {
    cy.get('a[href="/logout"]').should('be.visible')
  }

  verifyLoginLinkVisible() {
    cy.get('a[href="/login"]').should('be.visible')
  }

  scrollToFooter() {
    cy.get('footer').scrollIntoView()
  }

  scrollToTop() {
    cy.scrollTo('top')
  }

  /**
   * Método para verificar se todos os links principais do menu estão visíveis
   */
  verificarMenuPrincipal() {
    this.visitHomePage()
    this.verifyHomePageLoaded()
    
    // Verificar se os links principais estão visíveis
    cy.get('a[href="/products"]').should('be.visible')
    cy.get('a[href="/view_cart"]').should('be.visible')
    cy.get('a[href="/contact_us"]').should('be.visible')
    cy.get('a[href="/login"]').should('be.visible')
    
    cy.log('Menu principal verificado com sucesso')
  }
}

export default MenuPage
