/// <reference types="cypress" />

import CadastroPage from '../modules/cadastro/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'
import {
  generateUserData,
  getRandomBirthDate
} from '../support/helpers.js'
  getRandomBirthDate
} from '../support/helpers.js'

describe('Automation Exercise - Complete User Flow Tests', () => {
  let testUser = {}
  let cadastroPage
  let loginPage
  let menuPage
  
  before(() => {
    cy.log('🏁 [Setup] Iniciando configuração global dos testes')
    
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
    
    cy.log(`📧 Email único gerado para testes: ${testUser.email}`)
    cy.log('✅ [Setup] Configuração global concluída')
  })

  beforeEach(() => {
    cy.log('🌐 [BeforeEach] Navegando para página inicial')
    menuPage.visitHomePage()
    menuPage.verifyHomePageLoaded()
    cy.log('✅ [BeforeEach] Página inicial carregada com sucesso')
  })

  const fillSignupForm = (name, email) => {
    cadastroPage.accessSignupPage()
    cy.contains('h2', 'New User Signup!')
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }

  const fillAccountInformation = (userData) => {
    cy.log('📝 [Helper] Preenchendo informações da conta')
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
    cy.log(`🔐 [Helper] Executando login para: ${email}`)
    loginPage.realizarLogin(email, password)
  }

  const performLogout = () => {
    cy.log('🚪 [Helper] Executando logout do usuário')
    
    cy.get('body').then($body => {
      if ($body.find('a[href="/logout"]').length > 0) {
        cy.log('🔓 Usuário logado detectado, fazendo logout')
        loginPage.realizarLogout()
        cy.log('✅ Logout realizado com sucesso')
      } else {
        cy.log('🔍 Usuário já estava deslogado, navegando para login')
        menuPage.navigateToLogin()
        cy.contains('h2', 'Login to your account')
        cy.log('📄 Página de login confirmada')
      }
    })
  }

  const deleteAccount = () => {
    cy.log('🗑️ [Helper] Executando exclusão da conta')
    
    cy.get('body').then($body => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.log('🔍 Link de exclusão encontrado, removendo conta')
        cy.get('a[href="/delete_account"]').click()
        cy.contains('h2', 'Account Deleted!')
        cy.log('✅ Conta deletada com sucesso')
        
        cy.get('[data-qa="continue-button"]').click()
        cy.log('🏠 Retornando à página inicial')
      } else {
        cy.log('⚠️ Link de exclusão não encontrado - usuário pode não estar logado')
      }
    })
  }

  context('Test Case 1: Register User', () => {
    it('Should register a new user successfully', () => {
      cy.log('🚀 Iniciando Test Case 1: Cadastro de Usuário')
      cy.log(`📧 Email gerado: ${testUser.email}`)
      
      navigateToSignupLogin()
      
      cy.log('✍️ Preenchendo formulário de signup básico')
      fillSignupForm(testUser.name, testUser.email)
      
      cy.log('📝 Preenchendo informações completas da conta')
      fillAccountInformation(testUser)
      
      cy.log('✅ Finalizando processo de cadastro')
      completeRegistration()
      
      cy.log('🔍 Verificando se usuário foi logado automaticamente')
      cy.contains(`Logged in as ${testUser.name}`)
      
      cy.log('✅ Test Case 1 concluído com sucesso!')
    })
  })

  context('Test Case 2: Login User with correct email and password', () => {
    it('Should login user with correct credentials', () => {
      cy.log('🔑 Iniciando Test Case 2: Login com credenciais corretas')
      cy.log(`📧 Email para teste: ${testUser.email}`)
      
      performLogout()
      
      cy.log('🚪 Fazendo login com credenciais válidas')
      performLogin(testUser.email, testUser.password)
      
      cy.log('🔍 Verificando se login foi bem-sucedido')
      cy.contains(`Logged in as ${testUser.name}`)
      
      cy.log('✅ Login realizado com sucesso!')
    })
  })

  context('Test Case 3: Login User with incorrect email and password', () => {
    it('Should show error message for invalid email', () => {
      cy.log('🧪 Testando login com credenciais inválidas')
      performLogout()
      
      cy.log('❌ Tentativa de login com email/senha incorretos')
      performLogin('invalid@example.com', 'wrongpassword')
      
      cy.log('✅ Verificando mensagem de erro esperada')
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
      cy.log('🔐 Iniciando teste de logout')
      cy.log(`📋 Dados do usuário para login: ${testUser.email}`)
      
      performLogin(testUser.email, testUser.password)
      
      cy.log('✅ Login realizado, verificando estado logado')
      cy.contains(`Logged in as ${testUser.name}`)
      
      cy.log('🚪 Executando logout')
      performLogout()
      
      cy.log('🔍 Verificando se logout foi bem-sucedido')
      cy.get('a[href="/logout"]').should('not.exist')
      cy.get('a[href="/login"]').should('contain', 'Signup / Login')
      
      cy.log('✅ Logout confirmado com sucesso!')
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
      cy.log('🔄 Iniciando Test Case 5: Registro com email existente')
      cy.log(`📧 Tentando registrar com email já utilizado: ${testUser.email}`)
      
      navigateToSignupLogin()
      
      cy.log('📋 Verificando se página de signup está disponível')
      cy.contains('h2', 'New User Signup!')
      
      cy.log('✍️ Preenchendo formulário com email existente')
      cy.get('[data-qa="signup-name"]').type('Duplicate User')
      cy.get('[data-qa="signup-email"]').type(testUser.email)
      cy.contains('button', 'Signup').click()
      
      cy.log('🔍 Verificando mensagem de erro esperada')
      cy.contains('p', 'Email Address already exist!')
      
      cy.log('✅ Erro de email duplicado detectado corretamente!')
    })

    it('Should handle multiple signup attempts with same email', () => {
      cy.log('🔁 Testando múltiplas tentativas com mesmo email')
      
      cy.url().then(url => {
        if (!url.includes('/login')) {
          navigateToSignupLogin()
        }
      })
      
      cy.log('✍️ Nova tentativa com email já registrado')
      cy.get('[data-qa="signup-name"]').clear().type('Another Duplicate')
      cy.get('[data-qa="signup-email"]').clear().type(testUser.email)
      cy.contains('button', 'Signup').click()
      
      cy.log('🔍 Verificando consistência da mensagem de erro')
      cy.contains('p', 'Email Address already exist!')
      
      cy.log('✅ Sistema mantém consistência na validação!')
    })
  })

  after(() => {
    cy.log('🧹 [Cleanup] Iniciando limpeza final dos testes')
    cy.log(`🗑️ Removendo conta de teste: ${testUser.email}`)
    
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
    
    cy.get('body').then($body => {
      if ($body.text().includes('Login to your account')) {
        cy.log('🔐 Fazendo login para deletar conta')
        performLogin(testUser.email, testUser.password)
      }
      
      cy.log('🗑️ Executando exclusão da conta de teste')
      deleteAccount()
    })
    
    cy.log('✅ [Cleanup] Limpeza final concluída')
  })
})