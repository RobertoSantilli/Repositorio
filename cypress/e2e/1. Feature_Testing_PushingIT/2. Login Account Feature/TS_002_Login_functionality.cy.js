import { Registerpage } from "../../../support/pages/registerpage";
import { Loginpage } from "../../../support/pages/loginpage";
import { Homepage } from "../../../support/pages/homepage";

describe('Test Scenario TS-002 / Validate the working of Login functionality', () => {

    let data;

    const registerpage = new Registerpage();
    const loginpage = new Loginpage();
    const homepage = new Homepage();

    before('Loading Tests Data from Fixture', () => {
        cy.fixture('login').then(datos => {
            data = datos;
        });
    });

    beforeEach('Preconditions', function () {
        cy.visit('');
        registerpage.clickOnGoToLoginButton();
    });

    it('TC_L_001: Validate Login Successfully', () => {
        loginpage.typeUser(Cypress.env().user);
        loginpage.typePassword(Cypress.env().password);
        loginpage.clickOnLoginButton();
        homepage.getWelcomeMessage().should('have.text', `Welcome ${Cypress.env().user} 😎`);
    });

    it('TC_L_002: Validate not being able to Login when "User" is Null', () => {
        loginpage.typePassword(Cypress.env().password);
        loginpage.clickOnLoginButton();
        cy.get('#user').invoke('prop', 'validationMessage').then(message => {
            expect(message).eq(data.errorMessages.userNull);
        });
    });

    it('TC_L_003: Validate not being able to Login when "Password" is Null', () => {
        loginpage.typeUser(Cypress.env().user);
        loginpage.clickOnLoginButton();
        cy.get('#pass').invoke('prop', 'validationMessage').then(message => {
            expect(message).eq(data.errorMessages.userNull);
        });
    });

    it('TC_L_004: Validate not being able to Login when "User" is invalid', () => {
        loginpage.typeUser(data.invalidUser);
        loginpage.typePassword(Cypress.env().password);
        loginpage.clickOnLoginButton();
        loginpage.getErrorMessage().should('have.text', data.errorMessages.invalidUser);
    });

    it('TC_L_005: Validate not being able to Login when "User" its not registered', () => {
        loginpage.typeUser(data.userNotRegistered);
        loginpage.typePassword(Cypress.env().password);
        loginpage.clickOnLoginButton();
        loginpage.getMessageError().should('have.text', data.errorMessages.userNotRegistered);
    });

    it('TC_L_006: Validate not being able to Login when "Password" is Invalid', () => {
        loginpage.typeUser(Cypress.env().user);
        loginpage.typePassword(data.invalidPassword);
        loginpage.clickOnLoginButton();
        loginpage.getErrorMessage().should('have.text', data.errorMessages.invalidPassword);
    });

    it('TC_L_007: Validate not being able to Login when "Password" is Incorrect', () => {
        loginpage.typeUser(Cypress.env().user);
        loginpage.typePassword(data.incorrectPassword);
        loginpage.clickOnLoginButton();
        loginpage.getMessageError().should('have.text', data.errorMessages.invalidcredential);
    });

    it('TC_L_008: Validate not being able to login when "Password" not meet the require length (BVA)', () => {
        loginpage.typeUser(Cypress.env().user);
        loginpage.typePassword(data.password5chars);
        loginpage.clickOnLoginButton();
        loginpage.getErrorMessage().should('have.text', data.errorMessages.passwordLength);

        loginpage.typePassword(data.passwords17chars);
        loginpage.clickOnLoginButton();
        loginpage.getErrorMessage().should('have.text', data.errorMessages.passwordLength);
    });

});