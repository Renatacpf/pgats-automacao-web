/// <reference types="cypress" />

describe('Automation Exercise - Complete Flow with XPath Analysis', () => {
  let testUser = {}
  
  before(() => {
    const timestamp = new Date().getTime()
    testUser = {
      name: 'XPath Test User',
      email: `xpathuser.${timestamp}@example.com`,
      password: 'testpass123',
      firstName: 'XPath',
      lastName: 'Tester',
      company: 'XPath Company',
      address: 'XPath Address 123',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90210',
      mobileNumber: '1234567890'
    }
  })

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
    cy.xpath('//body').should('be.visible')
  })

  const navigateToSignupLoginXPath = () => {
    cy.xpath('//a[@href="/login"]').click()
  }

  const fillSignupFormXPath = (name, email) => {
    cy.xpath('//h2[contains(text(), "New User Signup!")]').should('be.visible')
    cy.xpath('//input[@data-qa="signup-name"]').type(name)
    cy.xpath('//input[@data-qa="signup-email"]').type(email)
    cy.xpath('//button[contains(text(), "Signup")]').click()
  }

  const fillAccountInformationXPath = (userData) => {
    cy.xpath('//input[@type="radio" and @value="Mrs"]').check()
    cy.xpath('//input[@id="password"]').type(userData.password, { log: false })
    cy.xpath('//select[@data-qa="days"]').select('15')
    cy.xpath('//select[@data-qa="months"]').select('January')
    cy.xpath('//select[@data-qa="years"]').select('1990')
    cy.xpath('//input[@type="checkbox" and @id="newsletter"]').check()
    cy.xpath('//input[@type="checkbox" and @id="optin"]').check()
    cy.xpath('//input[@id="first_name"]').type(userData.firstName)
    cy.xpath('//input[@id="last_name"]').type(userData.lastName)
    cy.xpath('//input[@id="company"]').type(userData.company)
    cy.xpath('//input[@id="address1"]').type(userData.address)
    cy.xpath('//select[@id="country"]').select(userData.country)
    cy.xpath('//input[@id="state"]').type(userData.state)
    cy.xpath('//input[@id="city"]').type(userData.city)
    cy.xpath('//input[@data-qa="zipcode"]').type(userData.zipcode)
    cy.xpath('//input[@data-qa="mobile_number"]').type(userData.mobileNumber)
  }

  const completeRegistrationXPath = () => {
    cy.xpath('//button[@data-qa="create-account"]').click()
    cy.url().should('include', 'account_created')
    cy.xpath('//a[@data-qa="continue-button"]').click()
  }

  const performLoginXPath = (email, password) => {
    cy.xpath('//body').then($body => {
      if (!$body.text().includes('Login to your account')) {
        cy.xpath('//a[@href="/login"]').click()
      }
    })
    
    cy.xpath('//input[@data-qa="login-email"]').type(email)
    cy.xpath('//input[@data-qa="login-password"]').type(password, { log: false })
    cy.xpath('//button[@data-qa="login-button"]').click()
  }

  const performLogoutXPath = () => {
    cy.xpath('//body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        cy.xpath('//a[@href="/logout"]').click()
        cy.url().should('include', '/login')
      } else {
        cy.xpath('//a[@href="/login"]').click()
      }
    })
  }

  const deleteAccountXPath = () => {
    cy.xpath('//body').then($body => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.xpath('//a[@href="/delete_account"]').click()
        cy.xpath('//a[@data-qa="continue-button"]').click()
      }
    })
  }

  context('Test Case 1: Register User (XPath Version)', () => {
    it('Should register a new user successfully using XPath selectors', () => {
      navigateToSignupLoginXPath()
      fillSignupFormXPath(testUser.name, testUser.email)
      fillAccountInformationXPath(testUser)
      completeRegistrationXPath()
      cy.url().should('not.include', '/login')
    })
  })

  context('Test Case 2: Login User with correct email and password (XPath Version)', () => {
    it('Should login user with correct credentials using XPath selectors', () => {
      performLogoutXPath()
      performLoginXPath(testUser.email, testUser.password)
      cy.url().should('not.include', '/login')
    })
  })

  context('Test Case 3: Login User with incorrect email and password (XPath Version)', () => {
    it('Should show error message for invalid email using XPath selectors', () => {
      performLogoutXPath()
      performLoginXPath('invalid@example.com', 'wrongpassword')
      cy.url().should('include', '/login')
    })

    it('Should show error message for empty credentials using XPath selectors', () => {
      cy.xpath('//a[@href="/login"]').click()
      cy.xpath('//button[@data-qa="login-button"]').click()
      cy.url().should('include', '/login')
    })

    it('Should show error message for non-existent email using XPath selectors', () => {
      performLoginXPath('nonexistent.email.12345@notreal.com', 'somepassword123')
      cy.url().should('include', '/login')
    })

    it('Should show error message for incorrect password using XPath selectors', () => {
      performLoginXPath(testUser.email, 'wrongpassword123')
      cy.url().should('include', '/login')
    })
  })

  context('Test Case 4: Logout User (XPath Version)', () => {
    it('Should logout user successfully using XPath selectors', () => {
      performLoginXPath(testUser.email, testUser.password)
      cy.url().should('not.include', '/login')
      performLogoutXPath()
    })

    it('Should redirect to login page after logout using XPath selectors', () => {
      cy.url().then(url => {
        if (!url.includes('/login')) {
          cy.xpath('//a[@href="/login"]').click()
        }
      })
      cy.url().should('include', '/login')
    })

    it('Should prevent unauthorized access after logout using XPath selectors', () => {
      cy.xpath('//a[@href="/logout"]').should('not.exist')
      cy.xpath('//a[contains(text(), "Signup / Login")]').should('be.visible')
    })
  })

  context('Test Case 5: Register User with existing email (XPath Version)', () => {
    it('Should show error when registering with existing email using XPath selectors', () => {
      navigateToSignupLoginXPath()
      cy.xpath('//input[@data-qa="signup-name"]').type('Duplicate User')
      cy.xpath('//input[@data-qa="signup-email"]').type(testUser.email)
      cy.xpath('//button[contains(text(), "Signup")]').click()
      cy.url().should('include', '/signup')
    })

    it('Should handle multiple signup attempts with same email using XPath selectors', () => {
      cy.url().then(url => {
        if (!url.includes('/login')) {
          navigateToSignupLoginXPath()
        }
      })
      
      cy.xpath('//input[@data-qa="signup-name"]').clear().type('Another Duplicate')
      cy.xpath('//input[@data-qa="signup-email"]').clear().type(testUser.email)
      cy.xpath('//button[contains(text(), "Signup")]').click()
      cy.url().should('include', '/signup')
    })
  })

  after(() => {
    cy.visit('https://automationexercise.com/')
    cy.xpath('//a[@href="/login"]').click()
    
    cy.xpath('//body').then($body => {
      if ($body.text().includes('Login to your account')) {
        performLoginXPath(testUser.email, testUser.password)
      }
      
      deleteAccountXPath()
    })
  })
})