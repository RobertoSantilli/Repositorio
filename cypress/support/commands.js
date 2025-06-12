import './Request/onlineshop';
import './Request/todolistpage';
import './Intercept/onlineshop';
import './Intercept/checkoutpage';
import './models/todolistpage';
import './models/productpage';
import './models/shoppingcartpage';
import './models/billingsummarypage';
import './models/receiptpage';

Cypress.Commands.add('RegisterUser', (user, password, gender, birthday, birthmonth, birthyear) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env().base_url_api}/register`,
        body: {
            username: user,
            password: password,
            gender: gender,
            day: birthday,
            month: birthmonth,
            year: birthyear
        }
    })
})

Cypress.Commands.add('loginwithsession', (user, password, sessionname) => {
    cy.session(sessionname, () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env().base_url_api}/login`,
            body: {
                username: user,
                password: password
            },
        }).then((response) => {
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('user', response.body.user.username);
            window.localStorage.setItem('userId', response.body.user._id);
            Cypress.env().token = window.localStorage.getItem('token');
            Cypress.env().userId = window.localStorage.getItem('userId');
            //Cypress.env('token', response.body.token);
            //Cypress.env('userId', response.body.user._id);

        })
    })
    // {
    //     cacheAcrossSpecs: true
    // });
});

Cypress.Commands.add('userlogin', (user, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env().base_url_api}/login`,
        body: {
            username: user,
            password: password
        },
    }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('user', response.body.user.username);
        window.localStorage.setItem('userId', response.body.user._id);
        Cypress.env().token = window.localStorage.getItem('token');
        Cypress.env().userId = window.localStorage.getItem('userId');
        //Cypress.env('token', response.body.token);
        //Cypress.env('userId', response.body.user._id);
    });

});

Cypress.Commands.add('deleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env().base_url_api}/deleteuser/${user}`,

    }).then((response) => {
        expect(response.status).eq(202);
    });
});


Cypress.Commands.add('connectDataBase', (query) => {
    cy.task('connectDB', query);
});

Cypress.Commands.add('currency_USD', (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
});