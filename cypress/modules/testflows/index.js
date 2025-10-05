/// <reference types="cypress" />

class TestFlows {
  completeRegistration() {
    cy.get('[data-qa="create-account"]').click()
    cy.url().should('include', 'account_created')
    cy.contains('h2', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
  }

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

  deleteUserAccount() {
    cy.get('body').then($body => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.get('a[href="/delete_account"]').click()
        cy.contains('h2', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
      }
    })
  }

  verifyUserLoggedIn(username) {
    cy.contains(`Logged in as ${username}`)
  }

  verifyLogoutSuccess() {
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')
  }

  navigateToHomePage() {
    cy.visit('https://automationexercise.com/')
    cy.contains('h2', 'Full-Fledged practice website for Automation Engineers')
  }

  cleanupTestAccount(email, password) {
    try {
      this.navigateToHomePage()
      
      cy.get('body').then($body => {
        if ($body.find('a[href="/login"]').length > 0) {
          cy.get('a[href="/login"]').click()
          
          cy.get('body').then($loginBody => {
            if ($loginBody.text().includes('Login to your account')) {
              cy.get('[data-qa="login-email"]').type(email)
              cy.get('[data-qa="login-password"]').type(password)
              cy.get('[data-qa="login-button"]').click()
            }
            
            this.deleteUserAccount()
          })
        }
      })
    } catch (error) {
      cy.log('Cleanup failed, continuing...')
    }
  }
}

export default TestFlows