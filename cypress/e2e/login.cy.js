///<reference types="cypress" />
describe("Authentification saucedemo",()=>{
    beforeEach("Setup",()=>{
        cy.visit('https://www.saucedemo.com/');
    });
    afterEach("Tear Down",()=>{
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
    })
    it('Login valide', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should("include","/inventory.html")
    });
    it('Login Invalide', () => {
        cy.get('#user-name').type('error');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should("be.visible").and("contain.text","Epic sadface:");
    });
});
