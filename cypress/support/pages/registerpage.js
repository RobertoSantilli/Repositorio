export class Registerpage {

    constructor() {
        this.user = '#user';
        this.password = '#pass';
        this.maleGender = '[value="Male"]';
        this.femaleGender = '[value="Female"]';
        this.otherGender = '[value="Other"]';
        this.dayOfBirth = '#day';
        this.monthOfBirth = '#month';
        this.yearOfBirth = '#year';
        this.registerButton = '#submitForm';
        this.goToLoginButton = '#registertoggle';
        this.errormessage = '#errorMessage';
        this.ExistingUserErrorMessage = '#messageError'
    }

    typeUser(user) {
        return cy.get(this.user).clear().type(user);
    };

    typePassword(password) {
        return cy.get(this.password).clear().type(password);
    };

    clickOnMaleGender() {
        return cy.get(this.maleGender).click({ force: true });
    };

    clickOnFemaleGender() {
        return cy.get(this.femaleGender).click({ force: true });
    };

    clickOnOtherGender() {
        return cy.get(this.otherGender).click({ force: true });
    };

    selectDayOfBirth(day) {
        return cy.get(this.dayOfBirth).select(day);
    };

    selectMonthOfBirth(month) {
        return cy.get(this.monthOfBirth).select(month);
    };

    selectYearOfBirth(year) {
        return cy.get(this.yearOfBirth).select(year);
    };

    clickOnRegisterButton() {
        return cy.get(this.registerButton).click();
    };

    clickOnGoToLoginButton() {
        return cy.get(this.goToLoginButton).dblclick();
    };

    geterrormessage() {
        return cy.get(this.errormessage);
    };

    getExistingUserErrorMessage() {
        return cy.get(this.ExistingUserErrorMessage);
    };
};