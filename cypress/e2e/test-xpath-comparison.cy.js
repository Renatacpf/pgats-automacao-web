/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Cadastrar entradas e saídas com XPath', () => {
  it('Cadastrar uma nova transação de entrada - XPath versão 1', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")
 
    // Usando XPath para localizar o botão "Nova Transação"
    cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
    
    // Usando XPath para campos do formulário
    cy.xpath("//input[@id='description']").type("Mesada")
    cy.xpath("//input[@id='amount']").type("100")
    cy.xpath("//input[@id='date']").type("2023-02-01")

    // Usando XPath para o botão Salvar
    cy.xpath("//button[contains(text(), 'Salvar')]").click()

    // Validação usando XPath
    cy.xpath("//tbody/tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 2', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // XPath simples que funciona
    cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
    cy.xpath("//input[@id='description']").type("Mesada")
    cy.xpath("//input[@id='amount']").type("100")
    cy.xpath("//input[@id='date']").type("2023-02-01")

    cy.xpath("//button[contains(text(), 'Salvar')]").click()
    
    cy.xpath("//tbody//tr").should("have.length", 1)
  });  

  it('Cadastrar uma nova transação de entrada - XPath versão 3', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // XPath usando posição específica
    cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
    cy.xpath("//input[@id='description']").type("Mesada")
    cy.xpath("//input[@id='amount']").type("100")
    cy.xpath("//input[@id='date']").type("2023-02-01")

    cy.xpath("//form//button").click()
    
    cy.xpath("//tbody//tr[1]").should("exist")
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 4', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // XPath com múltiplas condições
    cy.xpath("//a[contains(text(), 'Nova Transação')]").click()
    cy.xpath("//input[@id='description']").type("Mesada")
    cy.xpath("//input[@id='amount']").type("100")
    cy.xpath("//input[@id='date']").type("2023-02-01")

    cy.xpath("//button[contains(text(), 'Salvar')]").click()

    cy.xpath("//tbody//tr").should("be.visible")
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 5', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // XPath usando text() exato
    cy.xpath("//a[text()='+ Nova Transação']").click()
    cy.xpath("//input[@id='description']").type("Mesada")
    cy.xpath("//input[@id='amount']").type("100")
    cy.xpath("//input[@id='date']").type("2023-02-01")

    cy.xpath("//button[text()='Salvar']").click()

    cy.xpath("//tbody/tr").should("contain", "Mesada")
  });

  it('Cadastrar uma nova transação de entrada - XPath versão 6', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // XPath usando descendant
    cy.xpath("//body//a[contains(text(), 'Nova Transação')]").click()
    cy.xpath("//form/div[1]//input").type("Mesada")
    cy.xpath("//form/div[2]//input").type("100")
    cy.xpath("//form/div[3]//input").type("2023-02-01")

    cy.xpath("//form//button").click()

    cy.xpath("//tbody//tr//td[contains(text(), 'Mesada')]").should("be.visible")
  });
}); 