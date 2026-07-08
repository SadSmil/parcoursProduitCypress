///<reference types="cypress"/>
// import { csv } from "csvtojson";
import Papa from "papaparse";

describe("Login avec jdd csv", () => {
  it("Login avec jdd json", () => {
    cy.readFile("cypress/fixtures/jdd.csv").then((csvData) => {
      const users = Papa.parse(csvData, { header: true }).data;
      users.forEach((user) => {
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
  