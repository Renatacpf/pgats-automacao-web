/// <reference types="cypress" />

describe('Test Case 2: Login User with correct email and password', () => {
  it('Should login user with correct credentials', () => {
    // Este teste cria uma conta primeiro e depois testa o login
    const timestamp = new Date().getTime()
    const userData = {
      name: 'Login Test User',
      email: `login.test.${timestamp}@example.com`,
      password: 'logintest123'
    }

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Verify that home page is visible successfully
    cy.get('body').should('be.visible')
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 4. Create account first
    cy.get('[data-qa="signup-name"]').type(userData.name)
    cy.get('[data-qa="signup-email"]').type(userData.email)
    cy.contains('button', 'Signup').click()

    // Fill minimum required information
    cy.get('input[type="radio"]').first().check()
    cy.get('input#password').type(userData.password, { log: false })
    cy.get('[data-qa=days]').select('5')
    cy.get('[data-qa=months]').select('May')
    cy.get('[data-qa=years]').select('1990')
    cy.get('input#first_name').type('Login')
    cy.get('input#last_name').type('Test')
    cy.get('input#address1').type('Test Address')
    cy.get('select#country').select('India')
    cy.get('input#state').type('Test State')
    cy.get('input#city').type('Test City')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('9876543210')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="continue-button"]').click()

    // 5. Logout to test login
    cy.get('a[href="/logout"]').click()

    // 6. Verify 'Login to your account' is visible
    cy.contains('Login to your account').should('be.visible')

    // 7. Enter correct email address and password
    cy.get('[data-qa="login-email"]').type(userData.email)
    cy.get('[data-qa="login-password"]').type(userData.password, { log: false })

    // 8. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 9. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')

    // 10. Clean up: Delete account
    cy.get('a[href="/delete_account"]').click()
    cy.contains('Account Deleted!').should('be.visible')
  })

  it('Should login user with valid test account', () => {
    // Este teste usa uma conta previamente criada
    // Primeiro precisamos criar uma conta válida para usar nos testes
    const timestamp = new Date().getTime()
    const testUser = {
      name: 'Test User Login',
      email: `testlogin.${timestamp}@example.com`,
      password: 'testpass123'
    }

    // Criar conta para teste
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="signup-name"]').type(testUser.name)
    cy.get('[data-qa="signup-email"]').type(testUser.email)
    cy.contains('button', 'Signup').click()
    
    // Preencher informações mínimas necessárias
    cy.get('input[type="radio"]').first().check()
    cy.get('input#password').type(testUser.password, { log: false })
    cy.get('[data-qa=days]').select('15')
    cy.get('[data-qa=months]').select('January')
    cy.get('[data-qa=years]').select('1995')
    cy.get('input#first_name').type('Test')
    cy.get('input#last_name').type('User')
    cy.get('input#address1').type('Test Address')
    cy.get('select#country').select('United States')
    cy.get('input#state').type('California')
    cy.get('input#city').type('Los Angeles')
    cy.get('[data-qa="zipcode"]').type('90210')
    cy.get('[data-qa="mobile_number"]').type('1234567890')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="continue-button"]').click()

    // Fazer logout
    cy.get('a[href="/logout"]').click()

    // Agora testar o login
    // 1. Verify 'Login to your account' is visible
    cy.contains('Login to your account').should('be.visible')

    // 2. Enter correct email address and password
    cy.get('[data-qa="login-email"]').type(testUser.email)
    cy.get('[data-qa="login-password"]').type(testUser.password, { log: false })

    // 3. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 4. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${testUser.name}`).should('be.visible')

    // 5. Clean up: Delete account
    cy.get('a[href="/delete_account"]').click()
    cy.contains('Account Deleted!').should('be.visible')
  })
})