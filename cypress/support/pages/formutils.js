export class Formutils {

    constructor() {
        this.datapickerbutton = '#showDatePicker';
        this.sliderbutton = '#showSlider';
        this.hiddentextbutton = '#showHiddenInput';
        this.inputdate = '#datePicker';
    };

    clickondatapicker() {
        cy.get(this.datapickerbutton).click();
    };

    clickonslider() {
        cy.get(this.sliderbutton).click();
    };

    clickonhiddentext() {
        cy.get(this.hiddentextbutton).click();
    };

    typedate(date_M_D_Y) {
        cy.get(this.inputdate).clear().type(date_M_D_Y);
    };

};