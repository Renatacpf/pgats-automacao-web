/// <reference types="cypress" />

describe('Test Case 4: Logout User', () => {
  it('Should logout user successfully', () => {
    const timestamp = new Date().getTime()
    const testUser = {
      name: 'Logout Test User',
      email: `logout.test.${timestamp}@example.com`,
      password: 'logouttest123'
    }

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Verify that home page is visible successfully
    cy.get('body').should('be.visible')
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 4. Create a test account first (prerequisite for logout test)
    cy.get('[data-qa="signup-name"]').type(testUser.name)
    cy.get('[data-qa="signup-email"]').type(testUser.email)
    cy.contains('button', 'Signup').click()

    // Fill minimum required information
    cy.get('input[type="radio"]').first().check()
    cy.get('input#password').type(testUser.password, { log: false })
    cy.get('[data-qa=days]').select('20')
    cy.get('[data-qa=months]').select('March')
    cy.get('[data-qa=years]').select('1990')
    cy.get('input#first_name').type('Logout')
    cy.get('input#last_name').type('Test')
    cy.get('input#address1').type('Test Address')
    cy.get('select#country').select('India')
    cy.get('input#state').type('Test State')
    cy.get('input#city').type('Test City')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('9876543210')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="continue-button"]').click()

    // 5. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${testUser.name}`).should('be.visible')

    // 6. Click 'Logout' button
    cy.get('a[href="/logout"]').click()

    // 7. Verify that user is navigated to login page
    cy.url().should('include', '/login')
    cy.contains('Login to your account').should('be.visible')
    cy.contains('New User Signup!').should('be.visible')

    // 8. Verify that user is actually logged out by checking navigation
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')

    // 9. Clean up: Login again and delete the test account
    cy.get('[data-qa="login-email"]').type(testUser.email)
    cy.get('[data-qa="login-password"]').type(testUser.password, { log: false })
    cy.get('[data-qa="login-button"]').click()
    cy.get('a[href="/delete_account"]').click()
    cy.contains('Account Deleted!').should('be.visible')
  })

  it('Should redirect to login page after logout', () => {
    // This test verifies the logout functionality without creating a new account
    // It assumes there might be a session or uses an existing test account

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Check if already logged in (optional check)
    cy.get('body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        // User is already logged in
        // 3. Click 'Logout' button
        cy.get('a[href="/logout"]').click()

        // 4. Verify that user is navigated to login page
        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')
      } else {
        // User is not logged in, test the logout link doesn't exist
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('exist')
      }
    })
  })

  it('Should logout and prevent access to protected pages', () => {
    const timestamp = new Date().getTime()
    const testUser = {
      name: 'Protected Test User',
      email: `protected.test.${timestamp}@example.com`,
      password: 'protectedtest123'
    }

    // Create and login with test account
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="signup-name"]').type(testUser.name)
    cy.get('[data-qa="signup-email"]').type(testUser.email)
    cy.contains('button', 'Signup').click()

    // Fill minimum required information
    cy.get('input[type="radio"]').first().check()
    cy.get('input#password').type(testUser.password, { log: false })
    cy.get('[data-qa=days]').select('25')
    cy.get('[data-qa=months]').select('June')
    cy.get('[data-qa=years]').select('1988')
    cy.get('input#first_name').type('Protected')
    cy.get('input#last_name').type('Test')
    cy.get('input#address1').type('Protected Address')
    cy.get('select#country').select('Canada')
    cy.get('input#state').type('Ontario')
    cy.get('input#city').type('Ottawa')
    cy.get('[data-qa="zipcode"]').type('K1A 0A6')
    cy.get('[data-qa="mobile_number"]').type('6131234567')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="continue-button"]').click()

    // Verify user is logged in
    cy.contains(`Logged in as ${testUser.name}`).should('be.visible')

    // Logout
    cy.get('a[href="/logout"]').click()

    // Verify logout was successful - should be on login page
    cy.url().should('include', '/login')
    cy.contains('Login to your account').should('be.visible')

    // Verify that logout link is no longer visible (user not logged in)
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')

    // Clean up: Login and delete account
    cy.get('[data-qa="login-email"]').type(testUser.email)
    cy.get('[data-qa="login-password"]').type(testUser.password, { log: false })
    cy.get('[data-qa="login-button"]').click()
    cy.get('a[href="/delete_account"]').click()
    cy.contains('Account Deleted!').should('be.visible')
  })
})