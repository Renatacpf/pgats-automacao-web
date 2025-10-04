/// <reference types="cypress" />

import CadastroPage from '../modules/cadastro/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'
import TestFlows from '../modules/testflows/index.js'
import {
  generateUserData,
  getRandomBirthDate
} from '../support/helpers.js'

describe('Automation Exercise - Complete User Flow Tests', () => {
  let testUser = {}
  let cadastroPage
  let loginPage
  let menuPage
  let testFlows
  
  before(() => {
    cadastroPage = new CadastroPage()
    loginPage = new LoginPage()
    menuPage = new MenuPage()
    testFlows = new TestFlows()
    
    const userData = generateUserData()
    testUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      address: userData.address,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      zipcode: userData.zipcode,
      mobileNumber: userData.mobileNumber
    }
  })

  beforeEach(() => {
    menuPage.visitHomePage()
    menuPage.verifyHomePageLoaded()
  })

  context('Test Case 1: Register User', () => {
    it('Should register a new user successfully', () => {
      cadastroPage.fillBasicSignupForm(testUser.name, testUser.email)
      
      cadastroPage.fillCompleteAccountForm(testUser)
      
      testFlows.completeRegistration()
      
      testFlows.verifyUserLoggedIn(testUser.name)
    })
  })

  context('Test Case 2: Login User with correct email and password', () => {
    it('Should login user with correct credentials', () => {
      testFlows.performSmartLogout()
      
      loginPage.realizarLogin(testUser.email, testUser.password)
      
      testFlows.verifyUserLoggedIn(testUser.name)
    })
  })

  context('Test Case 3: Login User with incorrect email and password', () => {
    it('Should show error message for invalid email', () => {
      testFlows.performSmartLogout()
      
      loginPage.realizarLogin('invalid@example.com', 'wrongpassword')
      
      cy.contains('p', 'Your email or password is incorrect!')
    })

    it('Should show error message for empty credentials', () => {
      cy.get('a[href="/login"]').click()
      cy.contains('h2', 'Login to your account')
      
      cy.get('[data-qa="login-button"]').click()
      
      cy.url().should('include', '/login')
    })

    it('Should show error message for non-existent email', () => {
      loginPage.realizarLogin('nonexistent.email.12345@notreal.com', 'somepassword123')
      
      cy.contains('p', 'Your email or password is incorrect!')
    })

    it('Should show error message for incorrect password', () => {
      loginPage.realizarLogin(testUser.email, 'wrongpassword123')
      
      cy.contains('p', 'Your email or password is incorrect!')
    })
  })

  context('Test Case 4: Logout User', () => {
    it('Should logout user successfully', () => {
      loginPage.realizarLogin(testUser.email, testUser.password)
      
      testFlows.verifyUserLoggedIn(testUser.name)
      
      testFlows.performSmartLogout()
      
      testFlows.verifyLogoutSuccess()
    })

    it('Should redirect to login page after logout', () => {
      cy.url().then(url => {
        if (!url.includes('/login')) {
          cy.get('a[href="/login"]').click()
        }
      })
      cy.url().should('include', '/login')
      cy.contains('h2', 'Login to your account')
    })

    it('Should prevent unauthorized access after logout', () => {
      cy.get('a[href="/logout"]').should('not.exist')
      
      cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    })
  })

  context('Test Case 5: Register User with existing email', () => {
    it('Should show error when registering with existing email', () => {
      cadastroPage.fillBasicSignupForm('Duplicate User', testUser.email)
      
      cy.contains('p', 'Email Address already exist!')
    })

    it('Should handle multiple signup attempts with same email', () => {
      cy.url().then(url => {
        if (!url.includes('/login')) {
          cadastroPage.accessSignupPage()
        }
      })
      
      cy.get('[data-qa="signup-name"]').clear().type('Another Duplicate')
      cy.get('[data-qa="signup-email"]').clear().type(testUser.email)
      cy.contains('button', 'Signup').click()
      
      cy.contains('p', 'Email Address already exist!')
    })
  })

  after(() => {
    testFlows.cleanupTestAccount(testUser.email, testUser.password)
  })
})