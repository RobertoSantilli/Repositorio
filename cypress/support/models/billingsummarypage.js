Cypress.Commands.add('verifybillingsummary', (subtotal, totalprice) => {
    let index = 0;
    cy.get('li[class="css-0"]').eq(index).within(() => {
        cy.get('[data-cy="subtotalAmount"]').should('have.text', `$${subtotal}`);
    });
    index++
    cy.get('li[class="css-0"]').eq(index).within(() => {
        cy.get('[data-cy="freightAmount"]').should('have.text', 'Free');
    });
    index++
    cy.get('li[class="css-0"]').eq(index).within(() => {
        cy.get('[data-cy="totalPriceAmount"]').should('have.text', `$${totalprice}`);
    });
});