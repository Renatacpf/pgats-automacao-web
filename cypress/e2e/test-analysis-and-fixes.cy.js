describe('Cadastrar entradas e saídas com bugs', () => {
  
  beforeEach(() => {
    // Visit the page once with extended timeout
    cy.visit("https://devfinance-agilizei.netlify.app", { 
      timeout: 120000,
      failOnStatusCode: false 
    })
    
    // Wait for page to be fully loaded before each test
    cy.get('body', { timeout: 30000 }).should('be.visible')
    cy.contains('h1', 'dev.finance', { timeout: 20000 }).should('be.visible')
    
    // Clear any existing transactions to ensure clean state
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length > 0) {
        cy.get('tbody tr').each(() => {
          cy.get('tbody tr').first().find('img[onclick*="remove"]').click()
        })
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