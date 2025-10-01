/// <reference types="cypress" />

describe('Test Case 1: Register User', () => {
  it('Should register a new user successfully', () => {
    const timestamp = new Date().getTime()
    const userData = {
      name: 'QA Tester',
      email: `qa.tester.${timestamp}@example.com`,
      password: 'teste123',
      firstName: 'QA',
      lastName: 'Tester',
      company: 'Teste Company',
      address: 'Rua Teste, 123',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'A1B 2C3',
      mobileNumber: '+1 234 567 8901'
    }

    // 1. Navigate to url 'http://automationexercise.com'
    cy.visit('https://automationexercise.com/')

    // 2. Verify that home page is visible successfully
    cy.get('body').should('be.visible')
    cy.contains('AutomationExercise').should('be.visible')

    // 3. Click on 'Signup / Login' button
    cy.get('a[href="/login"]').click()

    // 4. Verify 'New User Signup!' is visible
    cy.contains('New User Signup!').should('be.visible')

    // 5. Enter name and email address
    cy.get('[data-qa="signup-name"]').type(userData.name)
    cy.get('[data-qa="signup-email"]').type(userData.email)

    // 6. Click 'Signup' button
    cy.contains('button', 'Signup').click()

    // 7. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.contains('Enter Account Information').should('be.visible')

    // 8. Fill details: Title, Name, Email, Password, Date of birth
    cy.get('input[type="radio"]').check('Mrs')
    cy.get('input#password').type(userData.password, { log: false })
    cy.get('[data-qa=days]').select('10')
    cy.get('[data-qa=months]').select('May')
    cy.get('[data-qa=years]').select('1990')

    // 9. Select checkbox 'Sign up for our newsletter!'
    cy.get('input[type="checkbox"]#newsletter').check()

    // 10. Select checkbox 'Receive special offers from our partners!'
    cy.get('input[type="checkbox"]#optin').check()

    // 11. Fill details: First name, Last name, Company, Address, Country, State, City, Zipcode, Mobile Number
    cy.get('input#first_name').type(userData.firstName)
    cy.get('input#last_name').type(userData.lastName)
    cy.get('input#company').type(userData.company)
    cy.get('input#address1').type(userData.address)
    cy.get('select#country').select(userData.country)
    cy.get('input#state').type(userData.state)
    cy.get('input#city').type(userData.city)
    cy.get('[data-qa="zipcode"]').type(userData.zipcode)
    cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber)

    // 12. Click 'Create Account button'
    cy.get('[data-qa="create-account"]').click()

    // 13. Verify that 'ACCOUNT CREATED!' is visible
    cy.url().should('include', 'account_created')
    cy.contains('Account Created!').should('be.visible')

    // 14. Click 'Continue' button
    cy.get('[data-qa="continue-button"]').click()

    // 15. Verify that 'Logged in as username' is visible
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')

    // 16. Clean up: Delete account
    cy.get('a[href="/delete_account"]').click()
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  })
})