class CarrinhoPage {
  
  visitHomePage() {
    cy.visit('https://automationexercise.com/')
  }

  navigateToProducts() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
  }

  searchProduct(productName) {
    cy.get('#search_product').type(productName)
    cy.get('#submit_search').click()
  }

  addFirstProductToCart() {
    cy.get('.product-overlay').first().within(() => {
      cy.get('a[data-product-id]').first().click()
    })
  }

  addProductToCart(productIndex = 0) {
    cy.get('.product-overlay').eq(productIndex).within(() => {
      cy.get('a[data-product-id]').click()
    })
  }

  continueToCart() {
    cy.contains('Continue Shopping').click()
  }

  viewCart() {
    cy.get('a[href="/view_cart"]').click()
    cy.url().should('include', '/view_cart')
  }

  verifyProductInCart() {
    cy.get('.cart_info').should('be.visible')
    cy.get('tr[id*="product-"]').should('have.length.at.least', 1)
  }

  removeProductFromCart() {
    cy.get('.cart_quantity_delete').first().click()
  }

  verifyEmptyCart() {
    cy.contains('Cart is empty!').should('be.visible')
  }

  proceedToCheckout() {
    cy.contains('Proceed To Checkout').click()
  }

  verifyCartQuantity(expectedQuantity) {
    cy.get('.cart_quantity button').should('contain', expectedQuantity)
  }

  updateProductQuantity(newQuantity) {
    cy.get('.cart_quantity input').clear().type(newQuantity)
    cy.get('.cart_quantity_update').click()
  }

  // Checkout functionality
  verifyCheckoutPage() {
    cy.url().should('include', '/checkout')
  }

  verifyAddressDetails() {
    cy.get('.checkout-information').should('be.visible')
    cy.get('#address_delivery').should('be.visible')
    cy.get('#address_invoice').should('be.visible')
  }

  verifyOrderDetails() {
    cy.get('#cart_info').should('be.visible')
    cy.get('.cart_menu').should('be.visible')
  }

  addCommentToOrder(comment) {
    cy.get('[name="message"]').type(comment)
  }

  placeOrder() {
    cy.contains('Place Order').click()
  }

  verifyPaymentPage() {
    cy.url().should('include', '/payment')
    cy.contains('Payment Information').should('be.visible')
  }

  fillPaymentInformation(cardInfo) {
    cy.get('[data-qa="name-on-card"]').type(cardInfo.nameOnCard)
    cy.get('[data-qa="card-number"]').type(cardInfo.cardNumber)
    cy.get('[data-qa="cvc"]').type(cardInfo.cvc)
    cy.get('[data-qa="expiry-month"]').type(cardInfo.expiryMonth)
    cy.get('[data-qa="expiry-year"]').type(cardInfo.expiryYear)
  }

  confirmOrder() {
    cy.get('[data-qa="pay-button"]').click()
  }

  verifyOrderSuccess() {
    cy.url().should('include', '/payment_done')
    cy.contains('Order Placed!').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  }

  downloadInvoice() {
    cy.contains('Download Invoice').click()
  }

  continueAfterOrder() {
    cy.contains('Continue').click()
  }

  // Complete order flow
  completeOrderWithRegistration(userData, cardInfo, orderComment = 'Test order comment') {
    this.proceedToCheckout()
    this.verifyCheckoutPage()
    this.verifyAddressDetails()
    this.verifyOrderDetails()
    this.addCommentToOrder(orderComment)
    this.placeOrder()
    this.verifyPaymentPage()
    this.fillPaymentInformation(cardInfo)
    this.confirmOrder()
    this.verifyOrderSuccess()
  }

  adicionarProdutoAoCarrinho(productName = null) {
    this.visitHomePage()
    this.navigateToProducts()
    
    if (productName) {
      this.searchProduct(productName)
    }
    
    this.addFirstProductToCart()
    this.continueToCart()
  }

  verificarCarrinho() {
    this.viewCart()
    this.verifyProductInCart()
  }

  limparCarrinho() {
    this.viewCart()
    this.removeProductFromCart()
    this.verifyEmptyCart()
  }
}

export default CarrinhoPage
