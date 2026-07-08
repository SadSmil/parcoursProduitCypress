///<reference types="cypress"/>

describe("Login avec jdd format Json", () => {
  it("Login avec jdd json", () => {
    cy.fixture("jdd.json").then((data) => {
      data.forEach((user) => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(`{backspace}` + user.username);
        cy.get("#password").type(`{backspace}` + user.password);
        cy.get("#login-button").click();
        user.result === "success"
          ? cy.url().should("include", "/inventory.html")
          : cy.get("[data-test='error']").should("be.visible");
      });
    });
  });
});
