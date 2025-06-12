import { Registerpage } from "../../../support/pages/registerpage";
import { Homepage } from "../../../support/pages/homepage";

describe('Test Scenario TS-001 / Validate the working of Register Account functionality', () => {

    let data;

    const registerpage = new Registerpage();
    const homepage = new Homepage();
    const username = 'pushingit' + Math.floor(Math.random() * 1000);

    before('Loading Tests Data from Fixture', () => {
        cy.fixture('register').then(datos => {
            data = datos;
            data.user = username
        });
    });

    beforeEach('Preconditions', function () {
        cy.visit('');
    });

    it('TC_R_001: Validate register an account Successfully', () => {
        registerpage.typeUser(data.user);
        registerpage.typePassword(data.password);
        registerpage.clickOnMaleGender();
        registerpage.selectDayOfBirth(data.dayOfBirth);
        registerpage.selectMonthOfBirth(data.monthOfBirth);
        registerpage.selectYearOfBirth(data.yearOfBirth);
        registerpage.clickOnRegisterButton();
        homepage.getWelcomeMessage().should('have.text', `Welcome ${data.user} 😎`);
    });

    it('TC_R_002: Validate not being able to register an account when "User" is Null', () => {
        registerpage.clickOnRegisterButton();
        cy.get('#user').invoke('prop', 'validationMessage').then(message => {
            expect(message).eq(data.errorMessages.userNull);
        });
    });

    it('TC_R_003: Validate not being able to register an account when "Password" is Null', () => {
        registerpage.typeUser(data.user);
        registerpage.clickOnRegisterButton();
        cy.get('#pass').invoke('prop', 'validationMessage').then(message => {
            expect(message).eq(data.errorMessages.userNull);
        });
    });

    it('TC_R_004: Validate not being able to register an account when "Gender" is Null', () => {
        registerpage.typeUser(data.user);
        registerpage.typePassword(data.password);
        registerpage.clickOnRegisterButton();
        cy.get('[value="Male"]').invoke('prop', 'validationMessage').then(message => {
            expect(message).eq(data.errorMessages.gendenullrError);
        });
    });

    it('TC_R_005: Validate not being able to register an account when "User" have Special Characters', () => {
        registerpage.typeUser(data.invalidUser);
        registerpage.typePassword(data.password);
        registerpage.clickOnMaleGender();
        registerpage.selectDayOfBirth(data.dayOfBirth);
        registerpage.selectMonthOfBirth(data.monthOfBirth);
        registerpage.selectYearOfBirth(data.yearOfBirth);
        registerpage.clickOnRegisterButton();
        registerpage.geterrormessage().should('have.text', data.errorMessages.invalidUser);
    });

    it('TC_R_006: Validate not being able to register an account when "Password" is Invalid', () => {
        registerpage.typeUser(data.user);
        registerpage.typePassword(data.invalidPassword);
        registerpage.clickOnMaleGender();
        registerpage.selectDayOfBirth(data.dayOfBirth);
        registerpage.selectMonthOfBirth(data.monthOfBirth);
        registerpage.selectYearOfBirth(data.yearOfBirth);
        registerpage.clickOnRegisterButton();
        registerpage.geterrormessage().should('have.text', data.errorMessages.invalidPassword);
    });

    it('TC_R_007: Validate not being able to register an account when "Password" not meet the require length (BVA)', () => {
        registerpage.typeUser(data.user);
        registerpage.typePassword(data.password5chars);
        registerpage.clickOnMaleGender();
        registerpage.selectDayOfBirth(data.dayOfBirth);
        registerpage.selectMonthOfBirth(data.monthOfBirth);
        registerpage.selectYearOfBirth(data.yearOfBirth);
        registerpage.clickOnRegisterButton();
        registerpage.geterrormessage().should('have.text', data.errorMessages.passwordLength);
        registerpage.typePassword(data.passwords17chars);
        registerpage.clickOnRegisterButton();
        registerpage.geterrormessage().should('have.text', data.errorMessages.passwordLength);
    });

    it('TC_R_008: Validate not being able to register an account when "User" is already registered', () => {
        registerpage.typeUser(data.user);
        registerpage.typePassword(data.password);
        registerpage.clickOnMaleGender();
        registerpage.selectDayOfBirth(data.dayOfBirth);
        registerpage.selectMonthOfBirth(data.monthOfBirth);
        registerpage.selectYearOfBirth(data.yearOfBirth);
        registerpage.clickOnRegisterButton();
        registerpage.getExistingUserErrorMessage().should('have.text', data.errorMessages.existingUser);
    });

});