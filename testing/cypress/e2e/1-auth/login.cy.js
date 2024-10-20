describe("Login Page Tests", () => {
  var userData;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.fixture("data").then((data) => {
      userData = data;
      cy.visit("/auth/login");
    });
  });

  it("TC001 - Login dengan data null", () => {
    cy.get("#login").click();
    cy.contains("Username dan Password wajib diisi").should(
      "contain.text",
      "Username dan Password wajib diisi"
    );
  });

  it("TC002 - Login dengan username salah", () => {
    cy.get("#username").type(userData.usernameInvalid);
    cy.get("#password").type(userData.passwordValid);
    cy.get("#login").click();
    cy.contains("User tidak ditemukan").should(
      "contain.text",
      "User tidak ditemukan"
    );
  });

  it("TC003 - Login dengan password salah", () => {
    cy.get("#username").type(userData.usernameValid);
    cy.get("#password").type(userData.passwordInvalid);
    cy.get("#login").click();
    cy.contains("Password salah").should("contain.text", "Password salah");
  });

  it("TC004 - Login dengan kredensial yang valid", () => {
    cy.login(userData.usernameValid, userData.passwordValid);
  });
});
