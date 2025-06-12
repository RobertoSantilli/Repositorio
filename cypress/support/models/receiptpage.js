Cypress.Commands.add('verifyreceipt', (sellid, name, lastname, products, creditcard, totalprice) => {
    cy.get('[data-cy="sellId"]').should('have.text', sellid);
    cy.get('[data-cy="name"]').should('have.text', `${name} ${lastname} has succesfully purchased the following items:`);
    cy.get('[class="chakra-modal__body css-1tcqc9o"]').within(() => {
        let index = 1
        Cypress._.forEach(products, (product) => {
            cy.get(`[id="product-${index}"]`).should('have.text', `${product.quantity} x ${product.name}`);
            index++
        });
    });
    cy.get('[data-cy="creditCard"]').should('have.text', creditcard);
    cy.get('[data-cy="totalPrice"]').should('have.text', `Monney spent $${totalprice}`);
});

