export class Productspage {

    constructor() {
        this.searchproductbar = '#search-bar';
        this.typeofsearch = '[data-cy="search-type"]';
        this.closebuttonalert = '#closeModal';
        this.gotoshoppingcartbutton = '#goShoppingCart';
        this.addnewproductbutton = '[data-cy="add-product"]';
        this.saveeditproductbutton = '[data-cy="saveEdit"]';
        this.newproductname = '[data-cy="productName"]';
        this.newproductprice = '[data-cy="productPrice"]';
        this.newproductimage = '#productCard';
        this.newproductid = '#productID';
        this.createnewproductbutton = '[data-cy="createProduct"]';
        this.confirmdeleteproductbutton = '#saveEdit';
        this.productname = '[data-cy="name"]';
        this.productprice = '[data-cy="price"]';
        this.productsfound = 'div[class="css-k31g74"]';
        this.editproductbutton = 'button[aria-label="Edit"]';
        this.deleteproductbutton = 'button[aria-label="Delete"]';
        this.productAddToCartButton = 'button[aria-label="Add to cart"]';
    }

    searchaproduct(product) {
        cy.get(this.searchproductbar, { timeout: 5000 }).clear().type(product);
    };

    selecttypeofsearch(name_or_id) {
        cy.get(this.typeofsearch).select(name_or_id);
    };

    addtocartproduct(product) {
        cy.get(`button[name="${product}"]`).click();

    };

    editproductbutton(productid) {
        cy.get(`button[data-cy="edit-${productid}"]`).click();

    };

    clickonsaveeditproductbutton() {
        cy.get(this.saveeditproductbutton).click();
    };

    closemessagealert() {
        cy.get(this.closebuttonalert, { timeout: 5000 }).click();
    };

    clickongotoshoppingcart() {
        cy.get(this.gotoshoppingcartbutton).click();
    };

    clickonaddnewproduct() {
        cy.get(this.addnewproductbutton).click();
    };

    typenewproductname(productname) {
        cy.get(this.newproductname).clear().type(productname);
    };

    typenewproductprice(productprice) {
        cy.get(this.newproductprice).clear().type(productprice);
    };

    typenewproductimage(productimage) {
        cy.get(this.newproductimage).clear().type(productimage);
    };

    typenewproductid(productid) {
        cy.get(this.newproductid).clear().type(productid);
    };

    clickoncreatenewproduct() {
        cy.get(this.createnewproductbutton).click();
    };

    clickonconfirmdeleteproductbutton() {
        cy.get(this.confirmdeleteproductbutton).click();
    };

    verifyproductname(productname) {
        return cy.get(this.productname).contains(productname);
    };

    verifyproductprice(productprice) {
        return cy.get(this.productprice).contains(productprice);
    };

    clickondeleteproduct(productname) {
        cy.get(`button[name="${productname}"]`).siblings(`button[aria-label="Delete"]`).click();
    };

    checkproductsfound() {
        return cy.get(this.productsfound);
    };

    clickOnEditProductButton() {
        cy.get(this.editproductbutton, {timeout: 30000}).click();
    };

    clickOnDeleteProductButton() {
        cy.get(this.deleteproductbutton, {timeout: 30000}).click();
    };

    clickOnAddToCartButton() {
        cy.get(this.productAddToCartButton, {timeout: 30000}).click();
    };

};