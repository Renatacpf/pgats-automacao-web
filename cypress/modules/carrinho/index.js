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
