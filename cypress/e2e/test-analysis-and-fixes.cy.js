describe('Cadastrar entradas e saídas com bugs', () => {
  
  beforeEach(() => {
    // Fresh page load for each test to avoid state issues
    cy.visit("https://devfinance-agilizei.netlify.app", { 
      timeout: 180000,
      failOnStatusCode: false 
    })
    
    // Wait for page to be ready
    cy.get('body', { timeout: 45000 }).should('be.visible')
    cy.contains('Nova Transação', { timeout: 45000 }).should('be.visible')
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