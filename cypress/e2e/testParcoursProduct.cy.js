///<reference types="cypess"/>
import loginPom from "../pages/loginPom.page";
import inventoryPom from "../pages/inventoryPom.page";
import cartPom from "../pages/cartPom.page";
import checkoutPomStep1 from "../pages/checkoutPomStep1.page";
import checkoutPomStep2 from "../pages/checkoutPomStep2.page";

describe("Parcours rajout produit complet", () => {
  beforeEach("Setup", () => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("Parcours Complet", () => {
    //Login valide
    loginPom.goLogin("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");

    //rajout premier produit
    inventoryPom.addFirstProduct();
    inventoryPom.removeFirstProduct().should("be.visible");
    inventoryPom.getProductCount().should("contain", "1");
    inventoryPom.getProduct1Name().invoke("text").as("nomProduit1");
    inventoryPom.getProduct1Price().invoke("text").as("priceProduit1");
    inventoryPom.clickCart();
    // inventoryPom.getProduct1Name();

    //check info in cart
    cy.get("@nomProduit1").then((nomProduit1) => {
      cartPom.getProduct1Name().invoke("text").should("equal", nomProduit1);
    });
    cy.get("@priceProduit1").then((priceProduit1) => {
      cartPom.getProduct1Price().invoke("text").should("equal", priceProduit1);
    });

    //rajout du deuxieme produit
    cartPom.clickContinueShopping();
    inventoryPom.addSecondProduct();
    inventoryPom.removeSecondProduct().should("be.visible");
    inventoryPom.getProductCount().should("contain", "2");
    inventoryPom.getProduct2Name().invoke("text").as("nomProduit2");
    inventoryPom.getProduct2Price().invoke("text").as("priceProduit2");
    inventoryPom.clickCart();

    //verifier bon produit et prix

    cy.get("@nomProduit2").then((nomProduit2) => {
      cartPom.getProduct2Name().invoke("text").should("equal", nomProduit2);
    });
    cy.get("@priceProduit2").then((priceProduit2) => {
      cartPom.getProduct2Price().invoke("text").should("equal", priceProduit2);
    });

    //checkout et remplissage
    cartPom.clickCheckout();
    checkoutPomStep1.saisieFormulaire("test","test","44000");

    //s'assurer du subtotal before tax
    cy.get("@priceProduit1").then((p1) => {
      cy.get("@priceProduit2").then((p2) => {
        const total = Number(p1.split("$")[1]) + Number(p2.split("$")[1]);

        checkoutPomStep2
          .getTotal()
          .invoke("text")
          .then((totalText) => {
            const totalAffiche = Number(totalText.split("$")[1]);
            expect(totalAffiche).to.equal(total);
          });
      });
    });
    checkoutPomStep2.clickFinishButton();
    cy.url().should("include", "/checkout-complete.html");
  });
});
