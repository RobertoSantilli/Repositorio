export class Homepage {

    constructor() {
        this.welcomeMessage = 'h2[class="chakra-heading css-y5314g"]';
        this.todolistlink = '#todolistlink';
        this.waitslink = '#waitslink';
        this.alertslink = '#alertslink';
        this.formutilslink = '#formutilslink';
        this.onlineshoplink = '#onlineshoplink';
        this.fileuploadlink = '#fileuploadlink';
        this.logOutButton = '#logout';
    };

    getWelcomeMessage() {
        return cy.get(this.welcomeMessage);
    };

    clickOnToDoListPageButton() {
        return cy.get(this.todolistlink, { timeout: 5000 }).click();
    };

    getwaitspagebutton() {
        return cy.get(this.waitslink, { timeout: 5000 });
    };

    clickOnLogOutButton() {
        return cy.get(this.logOutButton, { timeout: 5000 }).click();
    };

    getalertspagebutton() {
        return cy.get(this.alertslink, { timeout: 5000 });
    };

    getformutilspagebutton() {
        return cy.get(this.formutilslink, { timeout: 5000 });
    };

    clickOnOnnlineShopPageButton() {
        return cy.get(this.onlineshoplink, { timeout: 5000 }).click();
    };

    getfileuploadpagebutton() {
        return cy.get(this.fileuploadlink, { timeout: 5000 });
    };

};