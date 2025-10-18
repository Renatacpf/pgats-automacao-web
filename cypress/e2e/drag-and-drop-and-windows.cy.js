describe('Drag and Drop and Windows', () => {
  beforeEach(() => {
    // Increase timeouts for BrowserStack environment
    cy.window().then((win) => {
      win.fetch = win.fetch || (() => Promise.resolve({ ok: true }));
    });
  });

  it('Multiple Windows', () => {
    cy.visit('https://the-internet.herokuapp.com/windows', { 
      timeout: 30000,
      failOnStatusCode: false 
    });

    // Wait for page to load completely
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.get('h3', { timeout: 15000 }).should('contain', 'Opening a new window');

    cy.contains('Click Here', { timeout: 10000 })
      .invoke('removeAttr', 'target')
      .click();

    // Wait for navigation and new content
    cy.get('h3', { timeout: 15000 }).should('have.text', 'New Window');

    cy.go('back');

    // Verify we're back to the original page
    cy.get('a[href="/windows/new"]', { timeout: 10000 }).should('have.text', 'Click Here');
    cy.get('h3', { timeout: 10000 }).should('contain', 'Opening a new window');
  });

  it('Drag and Drop', () => {
    cy.visit('https://the-internet.herokuapp.com/drag_and_drop', { 
      timeout: 30000,
      failOnStatusCode: false 
    });

    // Wait for page elements to load
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.get('#column-a', { timeout: 10000 }).should('be.visible').and('contain', 'A');
    cy.get('#column-b', { timeout: 10000 }).should('be.visible').and('contain', 'B');

    // More robust drag and drop implementation for BrowserStack
    cy.get('#column-a').then(($source) => {
      cy.get('#column-b').then(($target) => {
        const dataTransfer = new DataTransfer();
        
        // Trigger drag events
        cy.get('#column-a')
          .trigger('mousedown', { which: 1 })
          .trigger('dragstart', { dataTransfer })
          .wait(100);
          
        cy.get('#column-b')
          .trigger('dragover', { dataTransfer })
          .trigger('drop', { dataTransfer })
          .wait(100);
          
        cy.get('#column-a')
          .trigger('dragend', { dataTransfer })
          .trigger('mouseup');
      });
    });

    // Verify the drag and drop worked
    cy.get('#column-a', { timeout: 10000 }).should('have.text', 'B');
    cy.get('#column-b', { timeout: 10000 }).should('have.text', 'A');
  });
});