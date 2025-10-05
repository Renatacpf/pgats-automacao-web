

import CadastroPage from '../modules/cadastro/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'
import CarrinhoPage from '../modules/carrinho/index.js'
import ProdutosPage from '../modules/produtos/index.js'
import SubscriptionPage from '../modules/subscription/index.js'
import TestFlows from '../modules/testflows/index.js'
import {
  generateUserData,
  getRandomBirthDate
} from '../support/helpers.js'

describe('Automation Exercise - Complete User Flow Tests', () => {
  let testUser = {}
  let checkoutUser = {}
  let cadastroPage
  let loginPage
  let menuPage
  let carrinhoPage
  let produtosPage
  let subscriptionPage
  let testFlows
  
  const cardInfo = {
    nameOnCard: 'Test User',
    cardNumber: '4242424242424242',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2028'
  }
  
  before(() => {
    cadastroPage = new CadastroPage()
    loginPage = new LoginPage()
    menuPage = new MenuPage()
    carrinhoPage = new CarrinhoPage()
    produtosPage = new ProdutosPage()
    subscriptionPage = new SubscriptionPage()
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

    const checkoutUserData = generateUserData()
    checkoutUser = {
      name: checkoutUserData.name,
      email: checkoutUserData.email,
      password: checkoutUserData.password,
      firstName: checkoutUserData.firstName,
      lastName: checkoutUserData.lastName,
      company: checkoutUserData.company,
      address: checkoutUserData.address,
      country: checkoutUserData.country,
      state: checkoutUserData.state,
      city: checkoutUserData.city,
      zipcode: checkoutUserData.zipcode,
      mobileNumber: checkoutUserData.mobileNumber
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



  context('Test Case 8: Verify All Products and product detail page', () => {
    it('Should display all products and navigate to product detail page', () => {
      menuPage.navigateToProducts()
      produtosPage.verifyAllProductsPageTitle()
      produtosPage.verifyProductsList()
      

      cy.get('.single-products').should('have.length.greaterThan', 0)
      cy.get('.single-products').first().should('be.visible')
      

      cy.visit('https://automationexercise.com/product_details/1')
      cy.get('.product-information').should('be.visible')
      cy.get('.product-information h2').should('be.visible')
    })
  })

  context('Test Case 9: Search Product', () => {
    it('Should search for products and display relevant results', () => {
      menuPage.navigateToProducts()
      produtosPage.verifyAllProductsPageTitle()
      
      const searchTerm = 'shirt'
      produtosPage.searchProduct(searchTerm)
      produtosPage.verifySearchedProductsTitle()
      produtosPage.verifySearchResults(searchTerm)
    })
  })

  context('Test Case 10: Verify Subscription in home page', () => {
    it('Should allow user to subscribe to newsletter from home page', () => {
      const subscriptionEmail = `subscription.${Date.now()}@example.com`
      subscriptionPage.performCompleteSubscription(subscriptionEmail)
    })
  })

  context('Test Case 15: Place Order: Register before Checkout', () => {
    it('Should allow user to register and place an order', () => {

      cadastroPage.fillBasicSignupForm(checkoutUser.name, checkoutUser.email)
      cadastroPage.fillCompleteAccountForm(checkoutUser)
      testFlows.completeRegistration()
      

      cy.visit('https://automationexercise.com/products')
      cy.get('.single-products').first().find('a[data-product-id="1"]').eq(0).click({ force: true })
      cy.contains('Continue Shopping').click()
      
      cy.visit('https://automationexercise.com/view_cart')
      cy.contains('Proceed To Checkout').click()
      
      cy.get('[name="message"]').type('Test order comment')
      cy.contains('Place Order').click()
      
      cy.get('[data-qa="name-on-card"]').type(cardInfo.nameOnCard)
      cy.get('[data-qa="card-number"]').type(cardInfo.cardNumber)
      cy.get('[data-qa="cvc"]').type(cardInfo.cvc)
      cy.get('[data-qa="expiry-month"]').type(cardInfo.expiryMonth)
      cy.get('[data-qa="expiry-year"]').type(cardInfo.expiryYear)
      cy.get('[data-qa="pay-button"]').click()
      
      cy.contains('Order Placed!')
    })
  })

  context('Test Case 16: Place Order: Login before Checkout', () => {
    it('Should allow existing user to login and place an order', () => {

      loginPage.realizarLogin(testUser.email, testUser.password)
      testFlows.verifyUserLoggedIn(testUser.name)
      
      cy.visit('https://automationexercise.com/products')
      cy.get('.single-products').eq(1).find('a[data-product-id="2"]').eq(0).click({ force: true })
      cy.contains('Continue Shopping').click()
      
      cy.visit('https://automationexercise.com/view_cart')
      cy.contains('Proceed To Checkout').click()
      
      cy.get('[name="message"]').type('Test order comment')
      cy.contains('Place Order').click()
      
      cy.get('[data-qa="name-on-card"]').type(cardInfo.nameOnCard)
      cy.get('[data-qa="card-number"]').type(cardInfo.cardNumber)
      cy.get('[data-qa="cvc"]').type(cardInfo.cvc)
      cy.get('[data-qa="expiry-month"]').type(cardInfo.expiryMonth)
      cy.get('[data-qa="expiry-year"]').type(cardInfo.expiryYear)
      cy.get('[data-qa="pay-button"]').click()
      
      cy.contains('Order Placed!')
    })
  })

  after(() => {

    try {
      testFlows.cleanupTestAccount(testUser.email, testUser.password)
      testFlows.cleanupTestAccount(checkoutUser.email, checkoutUser.password)
    } catch (error) {
      cy.log('Cleanup failed, but tests completed successfully')
    }
  })
})