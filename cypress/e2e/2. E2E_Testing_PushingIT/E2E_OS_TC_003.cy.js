import { Homepage } from "../../support/pages/homepage";
import { Productspage } from "../../support/pages/productspage";

describe('E2E_OS_TC_003 API: Validate Add a new product in the Online Shop, Search it by its ID \n' +
    'Delete the product and Verify that it no longer exists', () => {

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

        it('E2E_OS_TC_003: API: Validate Add a new product in the Online Shop, Search it by its ID \n' +
            'Delete the product and Verify that it no longer exists', () => {

                cy.createproduct(data.product_1).its('body.product').then((product) => {
                    expect(product.name).eq(data.product_1.name);
                    expect(product.price).eq(data.product_1.price);
                    expect(product.img).eq(data.product_1.img);
                });

                cy.getproductid(data.product_1.id).its('body.products.docs').then((product) => {
                    expect(product[0].name).eq(data.product_1.name);
                    expect(product[0].price).eq(data.product_1.price);
                    expect(product[0].img).eq(data.product_1.img);
                    cy.deleteproductby_id(product[0]._id);
                });
                cy.getproductid(data.product_1.id).its('body.products.docs').then((product) => {
                    expect(product).to.be.empty;
                });

                cy.visit('');
                homepage.clickOnOnnlineShopPageButton();
                productpage.selecttypeofsearch('ID');
                productpage.searchaproduct(`${data.product_1.id}{enter}`);
                cy.contains(data.product_1.name).should('not.exist')
            });
    });