///<reference types="cypress"/>

class loginPom {
  elements = {
    username: () => cy.get("#user-name"),
    password: () => cy.get("#password"),
    loginButton: () => cy.get("#login-button"),
    msgErreur: () => cy.get("[data-test='error']"),
  };

  saisirUsername(u) {
    this.elements.username().type(u);
  }
  saisirpassword(p) {
    this.elements.password().type(p);
  }
  clickLogin() {
    this.elements.loginButton().click();
  }
  getErrorMessage() {
    return this.elements.msgErreur();
  }
  goLogin(u, p) {
    this.saisirUsername(u);
    this.saisirpassword(p);
    this.clickLogin();
  }
}
export default new loginPom();
