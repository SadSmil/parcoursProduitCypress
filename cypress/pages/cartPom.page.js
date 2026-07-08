///<reference types="cypress"/>

class cartPom {
  elements = {
    product1Name: () => cy.get("[data-test='inventory-item-name']").eq(0),
    product2Name: () => cy.get("[data-test='inventory-item-name']").eq(1),
    product1Price: () => cy.get("[data-test='inventory-item-price']").eq(0),
    product2Price: () => cy.get("[data-test='inventory-item-price']").eq(1),
    prices: () => cy.get("[data-test='inventory-item-price']"),
    names: () => cy.get("[data-test='inventory-item-name']"),
    continueShopping: () => cy.get("#continue-shopping"),
    checkout: () => cy.get("#checkout"),
  };
  getProduct1Name() {
    return this.elements.product1Name();
  }
  getProduct1Price() {
    return this.elements.product1Price();
  }
  getProduct2Name() {
    return this.elements.product2Name();
  }
  getProduct2Price() {
    return this.elements.product2Price();
  }
  clickContinueShopping() {
    this.elements.continueShopping().click();
  }
  clickCheckout() {
    this.elements.checkout().click();
  }
  takeProduitPrice() {
    return this.elements.prices().first().invoke("text");
  }
  takeByIndexPrix(i) {
    return this.elements.prices().eq(i).invoke("text");
  }
  takeByIndexName(i) {
    return this.elements.names().eq(i).invoke("text");
  }
}
export default new cartPom();
