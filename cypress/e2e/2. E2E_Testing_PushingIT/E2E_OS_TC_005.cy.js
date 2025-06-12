import { Homepage } from "../../support/pages/homepage";
import { Productspage } from "../../support/pages/productspage";
import { Shoppingcartpage } from "../../support/pages/shoppingcartpage";
import { Billingsummarypage } from "../../support/pages/billingsummarypage";
import { Checkoutpage } from "../../support/pages/checkoutpage";

describe('E2E_OS_TC_005: API: Login, Create two new products, delete it if it exists, \n' +
    'Front-End: Validate the purchase of the products (two quantities for each) and verify the payment receipt', () => {

        const homepage = new Homepage();
        const productpage = new Productspage();
        const shoppingcartpage = new Shoppingcartpage();
        const billingsummarypage = new Billingsummarypage();
        const checkoutpage = new Checkoutpage();

        before('Loading Tests Data from Fixture and Preconditions', () => {
            cy.userlogin(Cypress.env().user, Cypress.env().password);
            cy.fixture('products_E2E_OS_TC_005').as('data');
        });

        it('E2E_OS_TC_005: API: Login, Create two new products, delete it if it exists, \n' +
            'Front-End: Validate the purchase of the products (two quantities for each) and verify the payment receipt', function () {

                cy.getproductid(this.data.products.product_1987.id).its('body.products.docs').then((product) => {
                    if (product.length >= 1) {
                        cy.deleteproductby_id(product[0]._id)
                    }
                });

                cy.createproduct(this.data.products.product_1987).its('body.product').then((product) => {
                    expect(product.name).eq(this.data.products.product_1987.name);
                    expect(product.price).eq(this.data.products.product_1987.price);
                    expect(product.img).eq(this.data.products.product_1987.img);
                });

                cy.getproductid(this.data.products.product_1988.id).its('body.products.docs').then((product) => {
                    if (product.length >= 1) {
                        cy.deleteproductby_id(product[0]._id)
                    }
                });

                cy.createproduct(this.data.products.product_1988).its('body.product').then((product) => {
                    expect(product.name).eq(this.data.products.product_1988.name);
                    expect(product.price).eq(this.data.products.product_1988.price);
                    expect(product.img).eq(this.data.products.product_1988.img);
                });

                cy.visit('');
                homepage.clickOnOnnlineShopPageButton();
                productpage.selecttypeofsearch('ID');
                productpage.searchaproduct(`${this.data.products.product_1987.id}{enter}`);
                cy.wait('@getproductbyid').its('response.body.products.docs[0]').then(intercept => {
                    expect(intercept.id).eq(this.data.products.product_1987.id);
                    expect(intercept.name).eq(this.data.products.product_1987.name);
                    expect(intercept.price).eq(this.data.products.product_1987.price);
                });
                productpage.addtocartproduct(this.data.products.product_1987.name);
                productpage.closemessagealert();
                productpage.addtocartproduct(this.data.products.product_1987.name);
                productpage.closemessagealert();

                this.data.products.product_1987.totalprice = this.data.products.product_1987.quantity * this.data.products.product_1987.price;

                productpage.searchaproduct(`${this.data.products.product_1988.id}{enter}`);
                cy.wait('@getproductbyid').its('response.body.products.docs[0]').then(intercept => {
                    expect(intercept.id).eq(this.data.products.product_1988.id);
                    expect(intercept.name).eq(this.data.products.product_1988.name);
                    expect(intercept.price).eq(this.data.products.product_1988.price);
                });
                productpage.addtocartproduct(this.data.products.product_1988.name);
                productpage.closemessagealert();
                productpage.addtocartproduct(this.data.products.product_1988.name);
                productpage.closemessagealert();

                this.data.products.product_1988.totalprice = this.data.products.product_1988.quantity * this.data.products.product_1988.price;

                productpage.clickongotoshoppingcart();

                cy.verifyproductsonshoppingcart_V2(this.data.products);

                shoppingcartpage.clickonshowtotalprice();
                shoppingcartpage.verifytotalprice().should('have.text', (this.data.products.product_1987.totalprice + this.data.products.product_1988.totalprice).toFixed(2));
                shoppingcartpage.clickongotobillingsummary();

                cy.verifybillingsummary((this.data.products.product_1987.totalprice + this.data.products.product_1988.totalprice), (this.data.products.product_1987.totalprice + this.data.products.product_1988.totalprice));
                billingsummarypage.clickoncheckout();

                checkoutpage.typeuserfirstname(this.data.user.name);
                checkoutpage.typeuserlastname(this.data.user.lastname);
                checkoutpage.typeusercreditcard(this.data.user.creditcard);
                checkoutpage.clickonpurchasebutton();
                cy.intercept('POST', '/api/purchase').as('purchaseorder');
                cy.wait('@purchaseorder').then(intercept => {
                    this.data.user.sellid = intercept.response.body.product.sellid;
                    cy.verifyreceipt(this.data.user.sellid, this.data.user.name, this.data.user.lastname, this.data.products, this.data.user.creditcard, (this.data.products.product_1987.totalprice + this.data.products.product_1988.totalprice));

                });
            });
    });

