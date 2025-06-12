Cypress.Commands.add('createtask', (name, completed) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env().base_url_api}/save-task`,
        body: {
            "name": name,
            "completed": completed,
            "userId": `${Cypress.env().userId}`
        },
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        }
    });
});