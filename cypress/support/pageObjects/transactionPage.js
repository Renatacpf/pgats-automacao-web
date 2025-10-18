// transactionModalPage.js
class TransactionModalPage {
    get button() {
        return cy.contains('Nova Transação');
    }

    openModal() {
        this.button.click();
        cy.get('.modal').should('be.visible');
    }

    verifyModalIsOpen() {
        cy.get('.modal').should('be.visible');
    }

    verifyButtonLabel() {
        this.button.should('contain', 'Nova Transação');
    }
}

export default TransactionModalPage;