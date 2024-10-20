describe("Create Fasilitas Tests", () => {
  var userData;

  beforeEach(() => {
    cy.fixture("data").then((data) => {
      userData = data;
      cy.login(userData.usernameValid, userData.passwordValid);
      cy.get("ul").contains("Fasilitas").click();
      cy.url().should("include", "/admin/fasilitas");
      cy.contains("Fasilitas").should("be.visible");
      cy.get("table").find("tr").should("have.length.greaterThan", 0);
    });
  });

  it("TC015 - Semua inputan fasilitas null", () => {
    cy.get("#add-button").click();
    cy.get("button").contains("Simpan").click();
    cy.contains("Semua kolom harus diisi").should(
      "contain.text",
      "Semua kolom harus diisi"
    );
  });

  it("TC016 - Judul fasilitas null", () => {
    cy.get("#add-button").click();

    cy.get("#dropdown").click();
    cy.get("#option-0").click();
    cy.get('[type="file"]').selectFile("cypress/images/2.png", { force: true });

    cy.get("button").contains("Simpan").click();
    cy.contains("Judul fasilitas harus diisi").should(
      "contain.text",
      "Judul fasilitas harus diisi"
    );
  });

  it("TC017 - Pilihan sekolah null", () => {
    cy.get("#add-button").click();

    cy.get("#title").type("Test Judul");
    cy.get('[type="file"]').selectFile("cypress/images/2.png", { force: true });

    cy.get("button").contains("Simpan").click();
    cy.contains("Harus memilih sekolah").should(
      "contain.text",
      "Harus memilih sekolah"
    );
  });

  it("TC018 - Upload gambar null", () => {
    cy.get("#add-button").click();

    cy.get("#title").type("Test Judul");
    cy.get("#dropdown").click();
    cy.get("#option-0").click();

    cy.get("button").contains("Simpan").click();
    cy.contains("Minimal upload gambar").should(
      "contain.text",
      "Minimal upload gambar"
    );
  });

  it("TC019 - Data inputan fasilitas valid", () => {
    cy.get("#add-button").click();

    cy.get("#title").type("Test Judul");
    cy.get("#dropdown").click();
    cy.get("#option-0").click();
    cy.get('[type="file"]').selectFile("cypress/images/2.png", { force: true });

    cy.wait(500);
    cy.get("button").contains("Simpan").click();
    cy.contains("Fasilitas berhasil dibuat").should(
      "contain.text",
      "Fasilitas berhasil dibuat"
    );
    cy.url().should("include", "/admin/fasilitas");
  });
});
