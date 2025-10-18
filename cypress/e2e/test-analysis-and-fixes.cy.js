describe('Cadastrar entradas e saídas com bugs', () => {
  
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

  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    cy.contains("Nova Transação", { timeout: 15000 }).click()
    cy.get("#description", { timeout: 10000 }).type("Mesada")
    cy.get("#amount", { timeout: 10000 }).type(100)
    cy.get("#date", { timeout: 10000 }).type("2023-02-01")

    cy.contains("Salvar", { timeout: 10000 }).click()
  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.contains("Nova Transação", { timeout: 15000 }).click()
    cy.get("#description", { timeout: 10000 }).type("Mesada")
    cy.get("#amount", { timeout: 10000 }).type("100")
    cy.get("#date", { timeout: 10000 }).type("2023-02-01")

    cy.contains("Salvar", { timeout: 10000 }).click()
    
    cy.get("tbody tr", { timeout: 15000 }).should("have.length", 1)
  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {
    cy.contains("Nova Transação", { timeout: 15000 }).click()
    cy.get("#description", { timeout: 10000 }).type("Mesada")
    cy.get("#amount", { timeout: 10000 }).type("100")
    cy.get("#date", { timeout: 10000 }).type("2023-02-01")

    cy.contains("Salvar", { timeout: 10000 }).click()
    
    cy.get("tbody tr", { timeout: 15000 }).should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    cy.contains("Nova Transação", { timeout: 15000 }).click()
    cy.get("#description", { timeout: 10000 }).type("Mesada")
    cy.get("#amount", { timeout: 10000 }).type("100")
    cy.get("#date", { timeout: 10000 }).type("2023-02-01")
    cy.contains("Salvar", { timeout: 10000 }).click()

    cy.get("tbody tr", { timeout: 15000 }).should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    cy.contains("Nova Transação", { timeout: 15000 }).click()
    cy.get("#description", { timeout: 10000 }).type("Mesada")
    cy.get("#amount", { timeout: 10000 }).type("100")
    cy.get("#date", { timeout: 10000 }).type("2023-02-01")

    cy.contains("Salvar", { timeout: 10000 }).click()

    cy.get("tbody tr", { timeout: 15000 }).should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 6', () => {
    cy.contains("Nova Transação", { timeout: 15000 }).click()
    cy.get("#description", { timeout: 10000 }).type("Mesada")
    cy.get("#amount", { timeout: 10000 }).type("100")
    cy.get("#date", { timeout: 10000 }).type("2023-02-01")

    cy.contains("Salvar", { timeout: 10000 }).click()

    cy.get("tbody tr", { timeout: 15000 }).should("have.length", 1)
  });
}); 