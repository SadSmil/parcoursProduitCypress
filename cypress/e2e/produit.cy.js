///<reference types="cypress"/>

describe("Produits",()=>{
    beforeEach("Setup",()=>{
            cy.visit("https://www.saucedemo.com/");
            cy.get("#user-name").type("standard_user");
            cy.get("#password").type("secret_sauce");
            cy.get("#login-button").click();
            cy.url().should("include","/inventory.html");
        });

    afterEach("Tear down",function(){
        if (this.currentTest.state === 'failed') {
            cy.screenshot(`failure-${this.currentTest.title}`);
        }
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        sessionStorage.clear();
        // cy.clearAllSessionStorage();
    });
    
    it('Rajouter un produit',{tags:"@Smoke"}, () => {
        cy.get("#add-to-cart-sauce-labs-backpack").click();
        cy.get("#remove-sauce-labs-backpack").should("be.visible").and("contain.text","Remove");
        cy.get("[data-test='shopping-cart-badge']").should("contain.text","1");
        cy.get("[data-test='shopping-cart-link']").click();
        cy.url().should("include","/cart.html");
    });
});
