///<reference types="cypress"/>
import loginPom from "../pages/loginPom.page";

describe("Login with pom", () => {
  beforeEach("Setup", () => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("Login valide with pom", () => {
    loginPom.goLogin("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("Login invalide with pom", () => {
    loginPom.goLogin("Mouad", "Mouad");
    loginPom
      .getErrorMessage()
      .should("be.visible")
      .and("contain", "Epic sadface");
  });
});
