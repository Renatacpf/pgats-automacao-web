/// <reference types="cypress" />

/**
 * TestFlows - Módulo para fluxos complexos de teste
 * Contém operações que envolvem múltiplas etapas ou validações
 */
class TestFlows {
  /**
   * Completa o processo de registro após preenchimento do formulário
   * Inclui validações de URL e confirmações necessárias
   */
  completeRegistration() {
    cy.get('[data-qa="create-account"]').click()
    cy.url().should('include', 'account_created')
    cy.contains('h2', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
  }

  /**
   * Executa logout inteligente verificando o estado atual do usuário
   * Redireciona para login se necessário
   */
  performSmartLogout() {
    cy.get('body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        cy.get('a[href="/logout"]').click()
      } else {
        cy.get('a[href="/login"]').click()
        cy.contains('h2', 'Login to your account')
      }
    })
  }

  /**
   * Remove conta de usuário se estiver disponível
   * Inclui validações e navegação pós-exclusão
   */
  deleteUserAccount() {
    cy.get('body').then($body => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.get('a[href="/delete_account"]').click()
        cy.contains('h2', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
      }
    })
  }

  /**
   * Verifica se usuário está logado baseado no nome
   * @param {string} username - Nome do usuário para verificar
   */
  verifyUserLoggedIn(username) {
    cy.contains(`Logged in as ${username}`)
  }

  /**
   * Verifica se logout foi executado com sucesso
   * Confirma ausência de elementos de usuário logado
   */
  verifyLogoutSuccess() {
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')
  }

  /**
   * Navega para a página principal e verifica carregamento
   */
  navigateToHomePage() {
    cy.visit('https://automationexercise.com/')
    cy.contains('h2', 'Full-Fledged practice website for Automation Engineers')
  }

  /**
   * Processo completo de cleanup pós-teste
   * Faz login se necessário e remove a conta de teste
   * @param {string} email - Email da conta de teste
   * @param {string} password - Senha da conta de teste
   */
  cleanupTestAccount(email, password) {
    this.navigateToHomePage()
    cy.get('a[href="/login"]').click()
    
    cy.get('body').then($body => {
      if ($body.text().includes('Login to your account')) {
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()
      }
      
      this.deleteUserAccount()
    })
  }
}

export default TestFlows