describe("Delete Information Tests", () => {
  var userData;

  beforeEach(() => {
    cy.fixture("data").then((data) => {
      userData = data;
      cy.login(userData.usernameValid, userData.passwordValid);
      cy.get("ul").contains("Informasi").click();
      cy.url().should("include", "/admin/informasi");
      cy.contains("Informasi").should("be.visible");
      cy.get("table").find("tr").should("have.length.greaterThan", 0);
    });
  });

  it("TC013 - Batal delete informasi", () => {
    cy.get("#delete-button").first().click();
    cy.get("#konfirm-delete").should(
      "have.text",
      "Apakah Anda Yakin Ingin Menghapus?"
    );
    cy.get("button").contains("Batal").click();
    cy.url().should("include", "/admin/informasi");
  });

  it("TC014 - Konfirmasi delete informasi", () => {
    cy.get("#delete-button").first().click();
    cy.get("#konfirm-delete").should(
      "have.text",
      "Apakah Anda Yakin Ingin Menghapus?"
    );
    cy.get("button").contains("Hapus").click();
    cy.contains("Informasi berhasil dihapus").should(
      "contain.text",
      "Informasi berhasil dihapus"
    );
  });
});
