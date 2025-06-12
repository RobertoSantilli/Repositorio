import { Homepage } from "../../support/pages/homepage";
import { Productspage } from "../../support/pages/productspage";

describe('E2E_OS_TC_004: API: Validate search for a product by its ID, Delete it if it exists, Create a new product \n'+
        'and Edit it / Front-End: Validate the data of the edited product', () => {

    const homepage = new Homepage();
    const productpage = new Productspage();

    let data;

    before('Loading Tests Data from Fixture and Preconditions', () => {
        cy.fixture('products').then(datos => {
            data = datos;
            data.product_1.id = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        });
        cy.userlogin(Cypress.env().user, Cypress.env().password);
    });

    it('E2E_OS_TC_004: API: Validate search for a product by its ID, Delete it if it exists, Create a new product \n'+
        'and Edit it / Front-End: Validate the data of the edited product', () => {
        
            cy.getproductid(data.product_1.id).its('body.products.docs').then((product) => {
                if (product.length >= 1) {
                cy.deleteproductby_id(product[0]._id)
                }
            });

            cy.createproduct(data.product_1).its('body.product').then((product) => {
                expect(product.name).eq(data.product_1.name);
                expect(product.price).eq(data.product_1.price);
                expect(product.img).eq(data.product_1.img);
                cy.editproductby_id(product._id, data.product_1000.img, data.product_1000.name, data.product_1000.price);
            });

            cy.visit('');
            homepage.clickOnOnnlineShopPageButton();
            productpage.selecttypeofsearch('ID');
            productpage.searchaproduct(`${data.product_1.id}{enter}`);
            productpage.verifyproductname(data.product_1000.name).should('have.text', data.product_1000.name);
            productpage.verifyproductprice(data.product_1000.price).should('have.text', data.product_1000.price);
        });
    });