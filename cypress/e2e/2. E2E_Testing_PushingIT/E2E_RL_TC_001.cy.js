import { Homepage } from "../../support/pages/homepage";
import { Registerpage } from "../../support/pages/registerpage";
import { Loginpage } from "../../support/pages/loginpage";

describe('E2E | API: Validate Register an account, Login and Delete the user', () => {

    let data;

    const registerpage = new Registerpage();
    const loginpage = new Loginpage();
    const homepage = new Homepage();
    const username = 'pushingit' + Math.floor(Math.random() * 1000);


    before('Loading Tests Data from Fixture', () => {
        cy.fixture('E2E_RL_TC_001').then(datos => {
            data = datos;
            data.user = username;
        });
    });

    it('E2E_RL_TC_001: Validate Register an account, Login and Delete the user', () => {
        cy.RegisterUser(data.user, data.password, data.gender, data.birthday, data.birthmonth, data.birthyear).then(response => {
            expect(response.status).eq(201);
        });

        cy.userlogin(data.user, data.password).then(response => {
            expect(response.status).eq(201);
        });

        cy.visit('');
        homepage.getWelcomeMessage().should('have.text', `Welcome ${data.user} 😎`);
        homepage.clickOnLogOutButton();

        cy.deleteUser(data.user);

        registerpage.clickOnGoToLoginButton();
        loginpage.typeUser(data.user);
        loginpage.typePassword(data.password);
        loginpage.clickOnLoginButton();
        loginpage.getMessageError().should('have.text', 'Credentials were not found');
    });
});