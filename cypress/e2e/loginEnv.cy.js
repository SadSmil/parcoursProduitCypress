///<reference types="cypress" />
describe("Authentification saucedemo",()=>{
    beforeEach("Setup",()=>{
        let environment = Cypress.env("var");
        let url;
        switch (environment) {
            case ("Dev"):
                url = "https://www.saucedemo.com/";
                break;

            case ("Integration"):
                url = "https://www.saucedemo.com/integration";
                break;

            case ("Recette"):
                url = "https://www.saucedemo.com/recette";
                break;

            case ("PreProd"):
                url = "https://www.saucedemo.com/preprod";
                break;

            default:
                url = "https://www.saucedemo.com/";
                break;
        }
        cy.visit(url);
    });
    afterEach("Tear Down",()=>{
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
    })
    it('Login valide',{tags:"@Smoke"}, () => {
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
