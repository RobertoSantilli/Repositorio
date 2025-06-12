Cypress.Commands.add('verifyNewProductCreated', (productID, productName, productPrice) => {
    cy.get('[data-cy="search-type"]').select('ID');
    cy.get('#search-bar').clear().type(`${productID}{enter}`);
    cy.get('p[data-cy="name"]').should('have.text', productName);
    cy.get('p[data-cy="price"]').should('have.text', productPrice);
});