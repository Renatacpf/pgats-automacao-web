class SubscriptionPage {
  
  scrollToSubscriptionSection() {
    cy.get('#footer').scrollIntoView()
    cy.get('#footer').should('be.visible')
  }

  verifySubscriptionText() {
    cy.contains('h2', 'Subscription').should('be.visible')
  }

  enterEmailAndSubmit(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }

  verifySuccessMessage() {
    cy.contains('You have been successfully subscribed!').should('be.visible')
  }

  performCompleteSubscription(email) {
    this.scrollToSubscriptionSection()
    this.verifySubscriptionText()
    this.enterEmailAndSubmit(email)
    this.verifySuccessMessage()
  }
}

export default SubscriptionPage