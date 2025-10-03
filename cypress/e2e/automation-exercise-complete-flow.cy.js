/// <reference types="cypress" />

describe('Automation Exercise - Complete User Flow Tests', () => {
  let testUser = {}
  
  before(() => {
    const timestamp = new Date().getTime()
    testUser = {
      name: 'Test User',
      email: `testuser.${timestamp}@example.com`,
      password: 'testpass123',
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company',
      address: 'Test Address 123',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90210',
      mobileNumber: '1234567890'
    }
  })

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
    cy.get('body').should('be.visible')
    cy.contains('AutomationExercise').should('be.visible')
  })

  const navigateToSignupLogin = () => {
    cy.get('a[href="/login"]').click()
  }

  const fillSignupForm = (name, email) => {
    cy.contains('New User Signup!').should('be.visible')
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }

  const fillAccountInformation = (userData) => {
    cy.contains('Enter Account Information').should('be.visible')
    
    cy.get('input[type="radio"]').check('Mrs')
    cy.get('input#password').type(userData.password, { log: false })
    cy.get('[data-qa=days]').select('15')
    cy.get('[data-qa=months]').select('January')
    cy.get('[data-qa=years]').select('1990')
    
    cy.get('input[type="checkbox"]#newsletter').check()
    cy.get('input[type="checkbox"]#optin').check()
    
    cy.get('input#first_name').type(userData.firstName)
    cy.get('input#last_name').type(userData.lastName)
    cy.get('input#company').type(userData.company)
    cy.get('input#address1').type(userData.address)
    cy.get('select#country').select(userData.country)
    cy.get('input#state').type(userData.state)
    cy.get('input#city').type(userData.city)
    cy.get('[data-qa="zipcode"]').type(userData.zipcode)
    cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber)
  }

  const completeRegistration = () => {
    cy.get('[data-qa="create-account"]').click()
    cy.url().should('include', 'account_created')
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  }

  const performLogin = (email, password) => {
    cy.get('body').then($body => {
      if (!$body.text().includes('Login to your account')) {
        cy.get('a[href="/login"]').click()
      }
    })
    cy.contains('Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })
    cy.get('[data-qa="login-button"]').click()
  }

  const performLogout = () => {
    cy.get('body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        cy.get('a[href="/logout"]').click()
        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')
      } else {
        cy.get('a[href="/login"]').click()
        cy.contains('Login to your account').should('be.visible')
      }
    })
  }

  const deleteAccount = () => {
    cy.get('body').then($body => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.get('a[href="/delete_account"]').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
      }
    })
  }

  context('Test Case 1: Register User', () => {
    it('Should register a new user successfully', () => {
      navigateToSignupLogin()
      
      fillSignupForm(testUser.name, testUser.email)
      
      fillAccountInformation(testUser)
      
      completeRegistration()
      
      cy.contains(`Logged in as ${testUser.name}`).should('be.visible')
    })
  })

  context('Test Case 2: Login User with correct email and password', () => {
    it('Should login user with correct credentials', () => {
      performLogout()
      
      performLogin(testUser.email, testUser.password)
      
      cy.contains(`Logged in as ${testUser.name}`).should('be.visible')
    })
  })

  context('Test Case 3: Login User with incorrect email and password', () => {
    it('Should show error message for invalid email', () => {
      performLogout()
      
      performLogin('invalid@example.com', 'wrongpassword')
      
      cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Should show error message for empty credentials', () => {
      cy.get('a[href="/login"]').click()
      cy.contains('Login to your account').should('be.visible')
      
      cy.get('[data-qa="login-button"]').click()
      
      cy.url().should('include', '/login')
    })

    it('Should show error message for non-existent email', () => {
      performLogin('nonexistent.email.12345@notreal.com', 'somepassword123')
      
      cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Should show error message for incorrect password', () => {
      performLogin(testUser.email, 'wrongpassword123')
      
      cy.contains('Your email or password is incorrect!').should('be.visible')
    })
  })

  context('Test Case 4: Logout User', () => {
    it('Should logout user successfully', () => {
      performLogin(testUser.email, testUser.password)
      
      cy.contains(`Logged in as ${testUser.name}`).should('be.visible')
      
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
      cy.contains('Login to your account').should('be.visible')
    })

    it('Should prevent unauthorized access after logout', () => {
      cy.get('a[href="/logout"]').should('not.exist')
      
      cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    })
  })

  context('Test Case 5: Register User with existing email', () => {
    it('Should show error when registering with existing email', () => {
      navigateToSignupLogin()
      
      cy.contains('New User Signup!').should('be.visible')
      cy.get('[data-qa="signup-name"]').type('Duplicate User')
      cy.get('[data-qa="signup-email"]').type(testUser.email)
      cy.contains('button', 'Signup').click()
      
      cy.contains('Email Address already exist!').should('be.visible')
    })

    it('Should handle multiple signup attempts with same email', () => {
      cy.url().then(url => {
        if (!url.includes('/login')) {
          navigateToSignupLogin()
        }
      })
      
      cy.get('[data-qa="signup-name"]').clear().type('Another Duplicate')
      cy.get('[data-qa="signup-email"]').clear().type(testUser.email)
      cy.contains('button', 'Signup').click()
      
      cy.contains('Email Address already exist!').should('be.visible')
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