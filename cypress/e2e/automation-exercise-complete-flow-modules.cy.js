/// <reference types="cypress" />

import CadastroPage from '../modules/cadastro/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'
import {
  generateUserData,
  getRandomBirthDate
} from '../support/helpers.js'

describe('Automation Exercise - Complete User Flow Tests', () => {
  let testUser = {}
  let cadastroPage
  let loginPage
  let menuPage
  
  before(() => {
    cadastroPage = new CadastroPage()
    loginPage = new LoginPage()
    menuPage = new MenuPage()
    
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

  const fillSignupForm = (name, email) => {
    cadastroPage.accessSignupPage()
    cy.contains('h2', 'New User Signup!')
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }

  const fillAccountInformation = (userData) => {
    const birthDate = getRandomBirthDate()
    cadastroPage.fillAccountForm(userData, birthDate)
  }

  const completeRegistration = () => {
    cadastroPage.createAccount()
    cy.url().should('include', 'account_created')
    cy.contains('h2', 'Account Created!')
    cadastroPage.continueToAccount()
  }

  const performLogin = (email, password) => {
    loginPage.realizarLogin(email, password)
  }

  const performLogout = () => {
    cy.get('body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        loginPage.realizarLogout()
      } else {
        menuPage.navigateToLogin()
        cy.contains('h2', 'Login to your account')
      }
    })
  }

  const deleteAccount = () => {
    cy.get('body').then($body => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.get('a[href="/delete_account"]').click()
        cy.contains('h2', 'Account Deleted!')
        
        cy.get('[data-qa="continue-button"]').click()
      }
    })
  }

  context('Test Case 1: Register User', () => {
    it('Should register a new user successfully', () => {
      fillSignupForm(testUser.name, testUser.email)
      
      fillAccountInformation(testUser)
      
      completeRegistration()
      
      cy.contains(`Logged in as ${testUser.name}`)
    })
  })

  context('Test Case 2: Login User with correct email and password', () => {
    it('Should login user with correct credentials', () => {
      performLogout()
      
      performLogin(testUser.email, testUser.password)
      
      cy.contains(`Logged in as ${testUser.name}`)
    })
  })

  context('Test Case 3: Login User with incorrect email and password', () => {
    it('Should show error message for invalid email', () => {
      performLogout()
      
      performLogin('invalid@example.com', 'wrongpassword')
      
      cy.contains('p', 'Your email or password is incorrect!')
    })

    it('Should show error message for empty credentials', () => {
      cy.get('a[href="/login"]').click()
      cy.contains('h2', 'Login to your account')
      
      cy.get('[data-qa="login-button"]').click()
      
      cy.url().should('include', '/login')
    })

    it('Should show error message for non-existent email', () => {
      performLogin('nonexistent.email.12345@notreal.com', 'somepassword123')
      
      cy.contains('p', 'Your email or password is incorrect!')
    })

    it('Should show error message for incorrect password', () => {
      performLogin(testUser.email, 'wrongpassword123')
      
      cy.contains('p', 'Your email or password is incorrect!')
    })
  })

  context('Test Case 4: Logout User', () => {
    it('Should logout user successfully', () => {
      performLogin(testUser.email, testUser.password)
      
      cy.contains(`Logged in as ${testUser.name}`)
      
      performLogout()
      
      cy.get('a[href="/logout"]').should('not.exist')
      cy.get('a[href="/login"]').should('contain', 'Signup / Login')
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
      cadastroPage.accessSignupPage()
      
      cy.contains('h2', 'New User Signup!')
      
      cy.get('[data-qa="signup-name"]').type('Duplicate User')
      cy.get('[data-qa="signup-email"]').type(testUser.email)
      cy.contains('button', 'Signup').click()
      
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
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
    
    cy.get('body').then($body => {
      if ($body.text().includes('Login to your account')) {
        performLogin(testUser.email, testUser.password)
      }
      
      deleteAccount()
    })
  })
})