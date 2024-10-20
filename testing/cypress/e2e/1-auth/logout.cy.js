describe("Logout Page Tests", () => {
  var userData;

  beforeEach(() => {
    cy.fixture("data").then((data) => {
      userData = data;
      cy.login(userData.usernameValid, userData.passwordValid);
    });
  });

  it("TC000 - Batal Logout", () => {
    cy.get("#logout").click();
    cy.get("#konfirm-logout").should("have.text", "Apakah Anda Ingin Log Out?");
    cy.get("button").contains("Batal").click();
    cy.url().should("include", "/admin/dashboard");
  });

  it("TC000 - Konfirmasi Logout", () => {
    cy.get("#logout").click();
    cy.get("#konfirm-logout").should("have.text", "Apakah Anda Ingin Log Out?");
    cy.get("button").contains("Log Out").click();
    cy.contains("Logout berhasil").should("contain.text", "Logout berhasil");
    cy.url().should("include", "/auth/login");
  });
});
