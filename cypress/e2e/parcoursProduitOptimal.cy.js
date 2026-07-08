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
  inventoryPom.getNameByIndex(0).then((nomProduit1) => {
    inventoryPom.getPriceByIndex(0).then((priceProduit1) => {
        //Ajout du premier produit
        inventoryPom.addFirstProduct();
        inventoryPom.removeFirstProduct().should("be.visible");
        inventoryPom.getProductCount().should("contain","1");
            //Ajout du deuxieme produit 
            inventoryPom.getNameByIndex(1).then((nomProduit2) => {
                inventoryPom.getPriceByIndex(1).then((priceProduit2) => {
                    inventoryPom.addSecondProduct();
                    inventoryPom.removeSecondProduct().should("be.visible");
                    inventoryPom.getProductCount().should("contain","2");   
                    inventoryPom.clickCart();
                    //assertions produit 1
                    cartPom.takeByIndexPrix(0).then((price1)=>{
                        expect(price1).to.equal(priceProduit1);
                    }); 
                    cartPom.takeByIndexName(0).then((name1)=>{
                        expect(name1).to.equal(nomProduit1);
                    });
                    //assertions produit 2
                    cartPom.takeByIndexPrix(1).then((price2)=>{
                        expect(price2).to.equal(priceProduit2);
                    }); 
                    cartPom.takeByIndexName(1).then((name2)=>{
                        expect(name2).to.equal(nomProduit2);
                    });          
    });
  });
    });
  });
});
});
