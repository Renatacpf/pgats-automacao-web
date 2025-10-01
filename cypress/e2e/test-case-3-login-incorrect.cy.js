/// <reference types="cypress" />

describe('Test Case 3: Login User with incorrect email and password', () => {
  it('Should show error message for invalid email', () => {
    const invalidCredentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    }

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Verify that home page is visible successfully
    cy.get('body').should('be.visible')
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 4. Verify 'Login to your account' is visible
    cy.contains('Login to your account').should('be.visible')

    // 5. Enter incorrect email address and password
    cy.get('[data-qa="login-email"]').type(invalidCredentials.email)
    cy.get('[data-qa="login-password"]').type(invalidCredentials.password, { log: false })

    // 6. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 7. Verify error 'Your email or password is incorrect!' is visible
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })

  it('Should show error message for empty credentials', () => {
    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 3. Verify 'Login to your account' is visible
    cy.contains('Login to your account').should('be.visible')

    // 4. Leave email and password fields empty
    cy.get('[data-qa="login-email"]').should('be.empty')
    cy.get('[data-qa="login-password"]').should('be.empty')

    // 5. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 6. Verify error message or that login didn't proceed
    // Note: Different behaviors possible - staying on login page or showing error
    cy.url().should('include', '/login')
  })

  it('Should show error message for non-existent email', () => {
    const nonExistentCredentials = {
      email: 'nonexistent.email.12345@notreal.com',
      password: 'somepassword123'
    }

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 3. Verify 'Login to your account' is visible
    cy.contains('Login to your account').should('be.visible')

    // 4. Enter non-existent email and any password
    cy.get('[data-qa="login-email"]').type(nonExistentCredentials.email)
    cy.get('[data-qa="login-password"]').type(nonExistentCredentials.password, { log: false })

    // 5. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 6. Verify error 'Your email or password is incorrect!' is visible
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })

  it('Should show error message for incorrect password with valid email format', () => {
    const incorrectPassword = {
      email: 'test@example.com', // Valid format but wrong credentials
      password: 'wrongpassword123'
    }

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 3. Verify 'Login to your account' is visible
    cy.contains('Login to your account').should('be.visible')

    // 4. Enter valid email format but incorrect password
    cy.get('[data-qa="login-email"]').type(incorrectPassword.email)
    cy.get('[data-qa="login-password"]').type(incorrectPassword.password, { log: false })

    // 5. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 6. Verify error 'Your email or password is incorrect!' is visible
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
})