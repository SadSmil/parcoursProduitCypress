///<reference types="cypress"/>

class checkoutPomStep2 {
  elements = {
    total: () => cy.get("[data-test='subtotal-label']"),
    finishButton: () => cy.get("#finish"),
  };
  getTotal() {
    return this.elements.total();
  }
  clickFinishButton() {
    this.elements.finishButton().click();
  }
}

export default new checkoutPomStep2();
