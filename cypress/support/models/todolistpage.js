Cypress.Commands.add('verifytask', (task) => {
    cy.contains('p', task.name).should('have.text', task.name);
    if (task.completed) {
        cy.contains('p', task.name).should('have.attr', 'style', 'text-decoration: line-through;');
    } else {
        cy.contains('p', task.name).should('have.attr', 'style', 'text-decoration: none;');
    }
});

Cypress.Commands.add('verifytasks', (tasks) => {
    let index = 0;
    Cypress._.forEach(tasks, (task) => {
        cy.get('[class="css-vn850v"]').eq(index).within(() => {
            cy.contains('p', task.name).should('have.text', task.name);
            if (task.completed) {
                cy.contains('p', task.name).should('have.attr', 'style', 'text-decoration: line-through;');
            } else {
                cy.contains('p', task.name).should('have.attr', 'style', 'text-decoration: none;');
            }
        });
        index++
    });
});