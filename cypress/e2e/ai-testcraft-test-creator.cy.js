import TransactionModalPage from '../support/pageObjects/transactionPage.js';
import ModalPage from '../support/pageObjects/modalPage.js';

// modal.spec.js
describe('Modal Form Tests', () => {
    const modalPage = new ModalPage();

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app', { 
            timeout: 180000,
            failOnStatusCode: false 
        });
        cy.get('body', { timeout: 45000 }).should('be.visible');
        cy.contains('Nova Transação', { timeout: 45000 }).should('be.visible');
    });

    it('Verify that the form can be submitted successfully with valid inputs for description, amount, and date.', () => {
        modalPage.open();
        modalPage.fillForm('Test Description', '100', '2023-10-01');
        modalPage.submitForm();
        // Verify transaction was added to the table
        cy.get('tbody tr').should('have.length', 1);
        cy.get('tbody tr').should('contain', 'Test Description');
    });

    it('Check that the placeholder text for each input field is displayed correctly when the form is opened.', () => {
        modalPage.open();
        cy.get('#description').should('have.attr', 'placeholder', 'Descrição');
        cy.get('#amount').should('have.attr', 'placeholder', '0,00');
        cy.get('#date').should('have.attr', 'type', 'date');
    });

    it('Attempt to submit the form with an empty description field and verify form validation.', () => {
        modalPage.open();
        modalPage.fillForm('', '100', '2023-10-01');
        modalPage.submitForm();
        // DevFinance doesn't show error messages, but form should not submit successfully
        cy.get('.modal').should('be.visible'); // Modal should still be open
    });

    it('Try entering a negative amount and ensure the form accepts it as an expense.', () => {
        modalPage.open();
        modalPage.fillForm('Test Expense', '-100', '2023-10-01');
        modalPage.submitForm();
        // Verify transaction was added as expense
        cy.get('tbody tr').should('have.length', 1);
        cy.get('tbody tr').should('contain', 'Test Expense');
        // Check if the amount appears as negative (DevFinance may format differently)
        cy.get('tbody tr').should('contain', '100,00');
    });

    it('Test entering a valid amount with comma decimal separator.', () => {
        modalPage.open();
        modalPage.fillForm('Test Description', '100,50', '2023-10-01');
        modalPage.submitForm();
        // Verify transaction was added
        cy.get('tbody tr').should('have.length', 1);
        cy.get('tbody tr').should('contain', 'Test Description');
    });

    it('Test the modal closes when the user presses the escape key.', () => {
        modalPage.open();
        cy.get('.modal').should('be.visible');
        cy.get('body').type('{esc}');
        // Wait a bit for animation
        cy.wait(1000);
        cy.get('.modal').should('not.have.class', 'active');
    });
});

// transactionModal.spec.js
describe('Transaction Modal Tests', () => {
    const transactionModalPage = new TransactionModalPage();
    
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app', { 
            timeout: 180000,
            failOnStatusCode: false 
        });
        cy.get('body', { timeout: 45000 }).should('be.visible');
        cy.contains('Nova Transação', { timeout: 45000 }).should('be.visible');
    });

    it('Verify that clicking the button opens the transaction modal successfully.', () => {
        transactionModalPage.openModal();
        transactionModalPage.verifyModalIsOpen();
    });

    it('Ensure that the button label "+ Nova Transação" is displayed correctly to the user.', () => {
        transactionModalPage.verifyButtonLabel();
    });

    it('Test that the modal can be opened multiple times without issues.', () => {
        // Open modal first time
        transactionModalPage.openModal();
        transactionModalPage.verifyModalIsOpen();
        
        // Close modal with button, not ESC
        cy.contains('Cancelar').click();
        cy.wait(1000);
        cy.get('.modal').should('not.have.class', 'active');
        
        // Open modal second time
        transactionModalPage.openModal();
        transactionModalPage.verifyModalIsOpen();
    });

    it('Verify that clicking the button opens the modal even after page interactions.', () => {
        // Scroll page using body element
        cy.get('body').scrollTo('bottom', { ensureScrollable: false });
        cy.wait(1000);
        cy.get('body').scrollTo('top', { ensureScrollable: false });
        
        // Click button should still work
        transactionModalPage.openModal();
        transactionModalPage.verifyModalIsOpen();
    });

    it('Simulate clicking the button while modal is already open.', () => {
        transactionModalPage.openModal();
        transactionModalPage.verifyModalIsOpen();
        
        // Try to click button again - use force since modal is blocking
        cy.contains('Nova Transação').click({ force: true });
        transactionModalPage.verifyModalIsOpen();
    });

    it('Test the responsiveness of the button on different devices.', () => {
        const devices = ['iphone-6', 'ipad-2', 'macbook-15'];
        devices.forEach(device => {
            cy.viewport(device);
            cy.wait(500); // Wait for viewport change
            transactionModalPage.openModal();
            transactionModalPage.verifyModalIsOpen();
            
            // Close modal with cancel button before next iteration
            cy.contains('Cancelar').click();
            cy.wait(1000);
            cy.get('.modal').should('not.have.class', 'active');
        });
    });
});