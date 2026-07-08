///<reference types="cypress"/>

class checkoutPomStep1 {
  elements = {
    firstName: () => cy.get("#first-name"),
    lastName: () => cy.get("#last-name"),
    postalCode: () => cy.get("#postal-code"),
    continueButton: () => cy.get("#continue"),
  };
  renseignerFirstName(f) {
    this.elements.firstName().type(f);
  }
  renseignerLastName(l) {
    this.elements.lastName().type(l);
  }
  renseignerCodePostal(code) {
    this.elements.postalCode().type(code);
  }
  clickContinueButton() {
    this.elements.continueButton().click();
  }
  saisieFormulaire(firstName,lastName,codePostal){
    this.renseignerFirstName(firstName);
    this.renseignerLastName(lastName);
    this.renseignerCodePostal(codePostal);
    this.clickContinueButton();
  }
}

export default new checkoutPomStep1();
