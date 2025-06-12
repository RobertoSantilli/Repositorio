import { Homepage } from "../../support/pages/homepage";
import { Registerpage } from "../../support/pages/registerpage";
import { Loginpage } from "../../support/pages/loginpage";
import { Todolistpage } from "../../support/pages/todolistpage";


describe('E2E | Validate Add 2 tasks, complete them, and delete the second completed task', () => {

    let data;
    let userdata;

    const registerpage = new Registerpage();
    const loginpage = new Loginpage();
    const homepage = new Homepage();
    const todolistpage = new Todolistpage();

    const usuario = 'pushingit' + Math.floor(Math.random() * 1000);

    before('Loading Tests Data from Fixture', () => {
        cy.fixture('todolist').then(datos => {
            data = datos
        });

        cy.fixture('register').then(datos => {
            userdata = datos
            userdata.user = usuario;
        });
    });

    beforeEach('Preconditions', () => {
        cy.RegisterUser(userdata.user, userdata.password, userdata.gender, userdata.birthday, userdata.birthmonth, userdata.birthyear).then(response => {
            expect(response.status).eq(201);
        });
        cy.userlogin(userdata.user, userdata.password).then(response => {
            expect(response.status).eq(201);
        });
        cy.visit('');
        homepage.getWelcomeMessage().should('have.text', `Welcome ${userdata.user} 😎`);
        homepage.clickOnToDoListPageButton();

    });

    after('Post-Condition: Delete User', () => {
        cy.deleteUser(userdata.user);
    });

    it('E2E_TDL_TC_002: Validate Add 2 tasks, complete them, and delete the second completed task', () => {

        todolistpage.typenewtask(data.tasks.task1.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);

        todolistpage.typenewtask(data.tasks.task2.name);
        todolistpage.clickonsendtask();
        cy.get('p').contains(data.tasks.task2.name).should('have.text', data.tasks.task2.name);

        todolistpage.completeTask(data.tasks.task1.name);
        todolistpage.completeTask(data.tasks.task2.name);

        todolistpage.deleteTask(data.tasks.task2.name);

        todolistpage.clickOnCompletedTasks();
        cy.get('p').contains(data.tasks.task1.name).should('have.text', data.tasks.task1.name);
        cy.contains(data.tasks.task2.name).should('not.exist');

    });
});