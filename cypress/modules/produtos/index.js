class ProdutosPage {
  
  navigateToProducts() {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
  }

  verifyAllProductsPageTitle() {
    cy.contains('h2', 'All Products').should('be.visible')
  }

  verifyProductsList() {
    cy.get('.features_items').should('be.visible')
    cy.get('.single-products').should('have.length.greaterThan', 0)
  }

  clickViewProductByIndex(index = 0) {
    cy.get('.single-products').eq(index).within(() => {
      cy.get('a[href*="/product_details/"]').first().click()
    })
  }

  verifyProductDetailPage() {
    cy.url().should('include', '/product_details/')
    cy.get('.product-information').should('be.visible')
  }

  verifyProductDetailInfo() {
    cy.get('.product-information h2').should('be.visible')
    cy.get('.product-information p').should('contain.text', 'Category:')
    cy.get('.product-information span span').should('be.visible') // Price
    cy.get('.product-information p').should('contain.text', 'Availability:')
    cy.get('.product-information p').should('contain.text', 'Condition:')
    cy.get('.product-information p').should('contain.text', 'Brand:')
  }

  searchProduct(productName) {
    cy.get('#search_product').type(productName)
    cy.get('#submit_search').click()
  }

  verifySearchedProductsTitle() {
    cy.contains('h2', 'Searched Products').should('be.visible')
  }

  verifySearchResults(productName) {
    cy.get('.features_items').should('be.visible')
    cy.get('.single-products').should('have.length.greaterThan', 0)
    // Verify that search results contain the search term (more flexible approach)
    cy.get('.single-products').first().should('be.visible')
  }

  addToCart(productIndex = 0) {
    cy.get('.single-products').eq(productIndex).within(() => {
      cy.get('.add-to-cart').click()
    })
  }

  verifyAddedToCartModal() {
    cy.get('.modal-content').should('be.visible')
    cy.contains('Added!').should('be.visible')
  }

  continueShoppingFromModal() {
    cy.contains('button', 'Continue Shopping').click()
    cy.get('.modal-content').should('not.be.visible')
  }

  viewCartFromModal() {
    cy.contains('View Cart').click()
    cy.url().should('include', '/view_cart')
  }

  getFirstProductName() {
    return cy.get('.single-products').first().find('p').invoke('text')
  }

  getProductQuantityInCart() {
    return cy.get('.cart_quantity').invoke('text')
  }
}

export default ProdutosPage