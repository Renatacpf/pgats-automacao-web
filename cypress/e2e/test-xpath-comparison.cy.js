/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Cadastrar entradas e saídas com XPath', () => {
  
  before(() => {
    // Visit the page once for the entire test suite
    cy.visit("https://devfinance-agilizei.netlify.app", { 
      timeout: 180000, // 3 minutes for initial load
      failOnStatusCode: false 
    })
    
    // Wait for essential elements to be loaded
    cy.get('body', { timeout: 45000 }).should('be.visible')
    cy.contains('Nova Transação', { timeout: 45000 }).should('be.visible')
  })

  beforeEach(() => {
    // Ensure we're on the main page and clear any open modals
    cy.get('body').then(($body) => {
      // Force close any open modal by multiple methods
      if ($body.find('.modal.active').length > 0) {
        cy.get('body').type('{esc}')
        cy.wait(500)
        // Try clicking cancel button if exists
        cy.get('body').then(($body2) => {
          if ($body2.find('.button.cancel').length > 0) {
            cy.get('.button.cancel').click({ force: true })
          }
        })
      }
      
      // Clear existing transactions
      if ($body.find('tbody tr').length > 0) {
        cy.get('tbody tr').each(() => {
          cy.get('tbody tr').first().find('img[onclick*="remove"]').click({ force: true })
        })
      }
    })
    
    // Wait a bit and ensure the "Nova Transação" button is visible and ready
    cy.wait(1000)
    cy.contains('Nova Transação', { timeout: 30000 }).should('be.visible')
    
    // Also ensure it's clickable by checking no modal is blocking
    cy.get('.modal.active').should('not.exist')
  })

  afterEach(() => {
    // Force close any modal that might be left open after test
    cy.get('body').then(($body) => {
      if ($body.find('.modal.active').length > 0) {
        cy.get('body').type('{esc}')
        cy.wait(500)
      }
    })
  })

  it('Cadastrar uma nova transação de entrada - XPath versão 1', () => {
    // Usando XPath para localizar o botão "Nova Transação"
    cy.xpath("//a[contains(text(), 'Nova Transação')]", { timeout: 15000 }).click()
    
    // Usando XPath para campos do formulário
    cy.xpath("//input[@id='description']", { timeout: 10000 }).type("Mesada")
    cy.xpath("//input[@id='amount']", { timeout: 10000 }).type("100")
    cy.xpath("//input[@id='date']", { timeout: 10000 }).type("2023-02-01")

    // Usando XPath para o botão Salvar
    cy.xpath("//button[contains(text(), 'Salvar')]", { timeout: 10000 }).click()

    // Validação usando XPath
    cy.xpath("//tbody/tr", { timeout: 15000 }).should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 2', () => {
    // XPath simples que funciona
    cy.xpath("//a[contains(text(), 'Nova Transação')]", { timeout: 15000 }).click()
    cy.xpath("//input[@id='description']", { timeout: 10000 }).type("Mesada")
    cy.xpath("//input[@id='amount']", { timeout: 10000 }).type("100")
    cy.xpath("//input[@id='date']", { timeout: 10000 }).type("2023-02-01")

    cy.xpath("//button[contains(text(), 'Salvar')]", { timeout: 10000 }).click()
    
    cy.xpath("//tbody//tr", { timeout: 15000 }).should("have.length", 1)
  });  

  it('Cadastrar uma nova transação de entrada - XPath versão 3', () => {
    // XPath usando posição específica
    cy.xpath("//a[contains(text(), 'Nova Transação')]", { timeout: 15000 }).click()
    cy.xpath("//input[@id='description']", { timeout: 10000 }).type("Mesada")
    cy.xpath("//input[@id='amount']", { timeout: 10000 }).type("100")
    cy.xpath("//input[@id='date']", { timeout: 10000 }).type("2023-02-01")

    cy.xpath("//form//button", { timeout: 10000 }).click()
    
    cy.xpath("//tbody//tr[1]", { timeout: 15000 }).should("exist")
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 4', () => {
    // XPath com múltiplas condições
    cy.xpath("//a[contains(text(), 'Nova Transação')]", { timeout: 15000 }).click()
    cy.xpath("//input[@id='description']", { timeout: 10000 }).type("Mesada")
    cy.xpath("//input[@id='amount']", { timeout: 10000 }).type("100")
    cy.xpath("//input[@id='date']", { timeout: 10000 }).type("2023-02-01")

    cy.xpath("//button[contains(text(), 'Salvar')]", { timeout: 10000 }).click()

    cy.xpath("//tbody//tr", { timeout: 15000 }).should("be.visible")
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 5', () => {
    // XPath usando text() exato
    cy.xpath("//a[text()='+ Nova Transação']", { timeout: 15000 }).click()
    cy.xpath("//input[@id='description']", { timeout: 10000 }).type("Mesada")
    cy.xpath("//input[@id='amount']", { timeout: 10000 }).type("100")
    cy.xpath("//input[@id='date']", { timeout: 10000 }).type("2023-02-01")

    cy.xpath("//button[text()='Salvar']", { timeout: 10000 }).click()

    cy.xpath("//tbody/tr", { timeout: 15000 }).should("contain", "Mesada")
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 6', () => {
    // XPath usando descendant
    cy.xpath("//body//a[contains(text(), 'Nova Transação')]", { timeout: 15000 }).click()
    cy.xpath("//form/div[1]//input", { timeout: 10000 }).type("Mesada")
    cy.xpath("//form/div[2]//input", { timeout: 10000 }).type("100")
    cy.xpath("//form/div[3]//input", { timeout: 10000 }).type("2023-02-01")

    cy.xpath("//form//button", { timeout: 10000 }).click()

    cy.xpath("//tbody//tr//td[contains(text(), 'Mesada')]", { timeout: 15000 }).should("be.visible")
  });
}); 