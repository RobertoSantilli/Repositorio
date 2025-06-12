import { Registerpage } from "../../../support/pages/registerpage";
import { Loginpage } from "../../../support/pages/loginpage";
import { Homepage } from "../../../support/pages/homepage";
import { Todolistpage } from "../../../support/pages/todolistpage";

describe('Test Scenario TS-003 / Validate the working of To Do List functionality', () => {

    let data;

    const registerpage = new Registerpage();
    const loginpage = new Loginpage();
    const homepage = new Homepage();
    const todolistpage = new Todolistpage();

    before('Loading Tests Data from Fixture', () => {
        cy.fixture('todolist').then(datos => {
            data = datos;
        });
    });

    beforeEach('Preconditions', function () {
        cy.loginwithsession(Cypress.env().user, Cypress.env().password, 'Pushing IT');
        cy.visit('');
        homepage.getWelcomeMessage().should('have.text', `Welcome ${Cypress.env().user} 😎`);
        homepage.clickOnToDoListPageButton();
    });

    afterEach('Post-Conditions / Delete Tasks', function () {
        todolistpage.clickonremovealltaskbutton();
    });

    it('TC_TDL_001: Validate add a task', () => {
        todolistpage.typenewtask(data.tasks.task1.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        todolistpage.clickOnActiveTasks();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
    });

    it('TC_TDL_002: Validate not being able to add a repeated task', () => {
        todolistpage.typenewtask(data.tasks.task1.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        todolistpage.clickOnActiveTasks();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        todolistpage.typenewtask(data.tasks.task1.name);
        todolistpage.clickonsendtask();
        todolistpage.getErrorMessage().should('have.text', `Task ${data.tasks.task1.name} for the user ${window.localStorage.getItem('userId')} already exits`);
    });

    it.only('TC_TDL_003: Validate not being able to add a task with more than 30 characters', () => {
        todolistpage.typenewtask(data.tasks.task3.name);
        todolistpage.clickonsendtask();
        todolistpage.getErrorMessage().should('have.text', data.errorMessages.taskWith30Chars);
        cy.log('DEFECT (FUNCTIONAL) | Expected Result: The task should be not be added to the active to do list. || Actual Result: The Task is added in the list')
        cy.get('p').contains(data.tasks.task3.name).should('not.visible');
    });

    it('TC_TDL_004: Validate complete a task', () => {
        todolistpage.typenewtask(data.tasks.task1.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        todolistpage.clickOnActiveTasks();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        todolistpage.completeTask(data.tasks.task1.name);
        todolistpage.clickOnCompletedTasks();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
    });

    it('TC_TDL_005: Validate delete a task', () => {
        todolistpage.typenewtask(data.tasks.task2.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task2.name).should('have.text', data.tasks.task2.name);
        todolistpage.clickOnActiveTasks();
        cy.get('p').contains(data.tasks.task2.name).should('have.text', data.tasks.task2.name);
        todolistpage.deleteTask(data.tasks.task2.name);
        cy.contains(data.tasks.task2.name).should('not.exist');
    });

    it('TC_TDL_006: Validate remove all task', () => {
        todolistpage.typenewtask(data.tasks.task1.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        todolistpage.typenewtask(data.tasks.task2.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task2.name).should('have.text', data.tasks.task2.name);
        todolistpage.clickOnActiveTasks();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        cy.get('p').contains(data.tasks.task2.name).should('have.text', data.tasks.task2.name);
        todolistpage.clickonremovealltaskbutton();
        cy.contains(data.tasks.task1.name).should('not.exist');
        cy.contains(data.tasks.task2.name).should('not.exist');
    });
});