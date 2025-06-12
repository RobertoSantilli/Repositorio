Cypress.Commands.add('verifyproductsonshoppingcart_V1', (products) => {
    Cypress._.forEach(products, (product) => {
        cy.contains(product.name).parent('[class="css-1bhbsny"]').within(() => {
            let column = 0
            cy.get('p').eq(column).should('have.text', product.quantity);
            column++
            cy.get('p').eq(column).should('have.text', product.name);
            column++
            cy.get('p').eq(column).should('have.text', `$${product.price}`);
            column++
            cy.get('p').eq(column).should('have.text', `$${product.totalprice}`);
        });
    });
});

Cypress.Commands.add('verifyproductsonshoppingcart_V2', (products) => {
    Cypress._.forEach(products, (product) => {
        let column = 0
        cy.contains(product.name).parent('[class="css-1bhbsny"]').within(() => {
            if (column === 0) {
                cy.get('p').eq(column).should('have.text', product.quantity);
                column++
            } if (column === 1) {
                cy.get('p').eq(column).should('have.text', product.name);
                column++
            } if (column === 2) {
                cy.get('p').eq(column).should('have.text', `$${product.price}`);
                column++
            } if (column === 3) {
                cy.get('p').eq(column).should('have.text', `$${product.totalprice}`);
            }
        });
    });
});

Cypress.Commands.add('verifyproductSCbyline', (line, producto) => {
    let index = 0
    cy.get('li.css-0').eq(line).within(() => {
        Cypress._.forEach(producto, (value, attr) => {
            if (attr === 'totalprice' || attr === 'price') {
                cy.get('p').eq(index).should('have.text', `$${value}`);
                index++
            } if (attr === 'quantity') {
                cy.get('p').eq(index).should('have.text', value);
                index++
            } if (attr === 'name') {
                cy.get('p').eq(index).should('have.text', value);
                index++
            }
        });
    });
});
