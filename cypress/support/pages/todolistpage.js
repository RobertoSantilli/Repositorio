export class Todolistpage {

    constructor() {

        this.inputtask = '[data-cy="task"]';
        this.sendtaskbutton = '[data-cy="sendTask"]';
        this.removealltaskbutton = '[data-cy="removeAll"]';
        this.activeButton = '#active',
        this.completedButton = '#completed',
        this.allTaskButton = '#all',
        this.errorMessage = '#errorMessage'
    };

    typenewtask(task) {
        cy.get(this.inputtask).clear().type(task);
    };

    clickonsendtask() {
        cy.get(this.sendtaskbutton).click();
    };

    clickonremovealltaskbutton() {
        cy.get(this.removealltaskbutton).should('be.visible').click({force: true});
    };

    deleteTask(task) {
        cy.get('p').contains(task).siblings('button[type="button"]').click({force: true});
    };

    completeTask(task) {
        cy.get('p').contains(task, {timeout: 30000}).click();
    };

    clickOnActiveTasks() {
        return cy.get(this.activeButton).click();
    };

    clickOnCompletedTasks() {
        return cy.get(this.completedButton).click();
    };

    clickOnAllTasks() {
        return cy.get(this.allTaskButton).click();
    };

    getErrorMessage() {
        return cy.get(this.errorMessage)
    };
};