import { Registerpage } from "../../../support/pages/registerpage";
import { Loginpage } from "../../../support/pages/loginpage";
import { Homepage } from "../../../support/pages/homepage";
import { Productspage } from "../../../support/pages/productspage";
import { Shoppingcartpage } from "../../../support/pages/shoppingcartpage";
import { Billingsummarypage } from "../../../support/pages/billingsummarypage";
import { Checkoutpage } from "../../../support/pages/checkoutpage";

describe('Test Scenario TS-004 / Validate the working of Online Shop functionality', () => {

    let data;

    const registerpage = new Registerpage();
    const loginpage = new Loginpage();
    const homepage = new Homepage();
    const productspage = new Productspage();
    const shoppingcartpage = new Shoppingcartpage();
    const billingsummarypage = new Billingsummarypage();
    const checkoutpage = new Checkoutpage();

    before('Preconditions', function () {
        cy.fixture('onlineshop').then(datos => {
            data = datos;
        });
    });

    beforeEach('Preconditions', function () {
        //cy.fixture('onlineshop').as('data');
        cy.userlogin(Cypress.env().user, Cypress.env().password);
        cy.visit('');
        homepage.getWelcomeMessage().should('have.text', `Welcome ${Cypress.env().user} 😎`);
        homepage.clickOnOnnlineShopPageButton();
    });

    after('Post-Conditions: Delete created products', () => {
        cy.getproductid(data.productsToShop.product_1.id).its('body.products.docs').then((product) => {
            if (product.length >= 1) {
                cy.deleteproductby_id(product[0]._id)
            }
        });
    });

    it('TC_OS_001: Validate create a new product in the Online Shop', function () {
        productspage.clickonaddnewproduct();
        productspage.typenewproductname(data.products.newProduct.name);
        productspage.typenewproductprice(data.products.newProduct.price);
        productspage.typenewproductimage(data.products.newProduct.img);
        productspage.typenewproductid(data.products.newProduct.id);
        productspage.clickoncreatenewproduct();
        cy.get('p[class="chakra-text css-0"]').should('have.text', `${data.products.newProduct.name} has been added`);
        productspage.closemessagealert();
        productspage.selecttypeofsearch('ID');
        productspage.searchaproduct(`${data.products.newProduct.id}{enter}`);
        cy.verifyNewProductCreated(data.products.newProduct.id, data.products.newProduct.name, data.products.newProduct.price);
    });

    it('TC_OS_002: Validate edit a product in the Online Shop', function () {
        productspage.selecttypeofsearch('ID');
        productspage.searchaproduct(`${data.products.editedProduct.id}{enter}`);
        cy.verifyNewProductCreated(data.products.newProduct.id, data.products.newProduct.name, data.products.newProduct.price);
        productspage.clickOnEditProductButton();
        productspage.typenewproductname(data.products.editedProduct.name);
        productspage.typenewproductprice(data.products.editedProduct.price);
        productspage.typenewproductimage(data.products.editedProduct.img);
        productspage.clickonsaveeditproductbutton();
        cy.get('p[class="chakra-text css-0"]').should('have.text', `${data.products.editedProduct.name} has been edited`);
        productspage.closemessagealert();
        productspage.selecttypeofsearch('ID');
        productspage.searchaproduct(`${data.products.newProduct.id}{enter}`);
        cy.verifyNewProductCreated(data.products.editedProduct.id, data.products.editedProduct.name, data.products.editedProduct.price);
    });

    it('TC_OS_003: Validate delete a product in the Online Shop', function () {
        productspage.selecttypeofsearch('ID');
        productspage.searchaproduct(`${data.products.editedProduct.id}{enter}`);
        cy.verifyNewProductCreated(data.products.editedProduct.id, data.products.editedProduct.name, data.products.editedProduct.price);
        productspage.clickOnDeleteProductButton();
        productspage.clickonconfirmdeleteproductbutton();
        cy.get('p[class="chakra-text css-0"]').should('have.text', `${data.products.editedProduct.name} has been deleted`);
        productspage.closemessagealert();
        productspage.selecttypeofsearch('ID');
        productspage.searchaproduct(`${data.products.editedProduct.id}{enter}`);
        cy.contains(data.products.editedProduct.name).should('not.exist');
    });

    it('TC_OS_004: Validate add a product to the shopping cart and proceed with the checkout', function () {
        productspage.clickonaddnewproduct();
        productspage.typenewproductname(data.productsToShop.product_1.name);
        productspage.typenewproductprice(data.productsToShop.product_1.price);
        productspage.typenewproductimage(data.productsToShop.product_1.img);
        productspage.typenewproductid(data.productsToShop.product_1.id);
        productspage.clickoncreatenewproduct();
        cy.get('p[class="chakra-text css-0"]').should('have.text', `${data.productsToShop.product_1.name} has been added`);
        productspage.closemessagealert();
        productspage.selecttypeofsearch('ID');
        productspage.searchaproduct(`${data.productsToShop.product_1.id}{enter}`);
        cy.verifyNewProductCreated(data.productsToShop.product_1.id, data.productsToShop.product_1.name, data.productsToShop.product_1.price);
        productspage.clickOnAddToCartButton();
        cy.get('p[class="chakra-text css-0"]').should('have.text', `${data.products.newProduct.name} has been added to the shopping cart`);
        productspage.closemessagealert();
        productspage.clickongotoshoppingcart();

        data.productsToShop.product_1.totalprice = (data.productsToShop.product_1.quantity * data.productsToShop.product_1.price);

        cy.verifyproductsonshoppingcart_V1(data.productsToShop);
        shoppingcartpage.clickonshowtotalprice();
        shoppingcartpage.verifytotalprice().should('have.text', (data.productsToShop.product_1.totalprice).toFixed(2));
        shoppingcartpage.clickongotobillingsummary();

        cy.verifybillingsummary(data.productsToShop.product_1.totalprice, data.productsToShop.product_1.totalprice);
        billingsummarypage.clickoncheckout();

        checkoutpage.typeuserfirstname(data.user.firstName);
        checkoutpage.typeuserlastname(data.user.lastName);
        checkoutpage.typeusercreditcard(data.user.creditCard);
        checkoutpage.clickonpurchasebutton();
        cy.intercept('POST', '/api/purchase').as('purchaseorder');
        cy.wait('@purchaseorder').then(intercept => {
            data.user.sellId = intercept.response.body.product.sellid;
            cy.verifyreceipt(data.user.sellId, data.user.firstName, data.user.lastName, data.productsToShop, data.user.creditCard, data.productsToShop.product_1.totalprice);
        });
    });
});