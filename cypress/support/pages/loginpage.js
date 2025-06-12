export class Loginpage {

    constructor() {
        this.user = '#user',
        this.password = '#pass',
        this.loginbutton = '#submitForm',
        this.messageError = '#messageError',
        this.errorMessage = '#errorMessage'
    }

    typeUser(user) {
        return cy.get(this.user).clear().type(user);
    };

    typePassword(password) {
        return cy.get(this.password).clear().type(password);
    };

    clickOnLoginButton() {
        cy.get(this.loginbutton).click();
    };

    getMessageError() {
        return cy.get(this.messageError, {timeout: 30000});
    };

    getErrorMessage() {
        return cy.get(this.errorMessage);
    };

};

