// modalPage.js
class ModalPage {
    get descriptionInput() {
        return '#description';
    }

    get amountInput() {
        return '#amount';
    }

    get dateInput() {
        return '#date';
    }

    get saveButton() {
        return 'button[type="submit"]';
    }

    get cancelButton() {
        return '.button.cancel';
    }

    get helpText() {
        return '.help';
    }

    open() {
        cy.contains('Nova Transação').click();
        cy.get('.modal').should('be.visible');
    }

    fillForm(description, amount, date) {
        if (description) {
            cy.get(this.descriptionInput).clear().type(description);
        }
        if (amount) {
            cy.get(this.amountInput).clear().type(amount);
        }
        if (date) {
            cy.get(this.dateInput).clear().type(date);
        }
    }

    submitForm() {
        cy.contains('Salvar').click();
    }

    closeModal() {
        cy.get(this.cancelButton).click();
    }
}

export default ModalPage;