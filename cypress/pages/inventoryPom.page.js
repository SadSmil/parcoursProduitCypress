///<reference types="cypress"/>

class inventoryPom {
  elements = {
    product1: () => cy.get("#add-to-cart-sauce-labs-backpack"),
    product2: () => cy.get("#add-to-cart-sauce-labs-bike-light"),
    removeProduct1: () => cy.get("#remove-sauce-labs-backpack"),
    removeProduct2: () => cy.get("#remove-sauce-labs-bike-light"),
    productCount: () => cy.get("[data-test='shopping-cart-badge']"),
    cartButton: () => cy.get("[data-test='shopping-cart-link']"),
    product1Price: () => cy.get("[data-test='inventory-item-price']").eq(0),
    product2Price: () => cy.get("[data-test='inventory-item-price']").eq(1),
    product1Name: () => cy.get("[data-test='inventory-item-name']").eq(0),
    product2Name: () => cy.get("[data-test='inventory-item-name']").eq(1),
    prices: () => cy.get("[data-test='inventory-item-price']"),
    names: () => cy.get("[data-test='inventory-item-name']"),
  };
  addFirstProduct() {
    this.elements.product1().click();
  }
  addSecondProduct() {
    this.elements.product2().click();
  }
  removeFirstProduct() {
    return this.elements.removeProduct1();
  }
  removeSecondProduct() {
    return this.elements.removeProduct2();
  }
  getProductCount() {
    return this.elements.productCount();
  }
  clickCart() {
    this.elements.cartButton().click();
  }
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
  getPriceByIndex(i) {
    return this.elements.prices().eq(i).invoke("text");
  }
  getNameByIndex(i) {
    return this.elements.names().eq(i).invoke("text");
  }
  getPriceProduit(){
    return this.elements.prices().first().invoke("text");
  }
}

export default new inventoryPom();
