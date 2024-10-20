describe("Update Information Tests", () => {
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

  it("Hapus Judul Informasi", () => {
    cy.clearFormFields({ title: true });
    cy.contains("Judul informasi harus diisi").should(
      "contain.text",
      "Judul informasi harus diisi"
    );
  });

  it("Hapus Deskripsi Informasi", () => {
    cy.clearFormFields({ desc: true });
    cy.contains("Deskripsi informasi harus diisi").should(
      "contain.text",
      "Deskripsi informasi harus diisi"
    );
  });

  it("Hapus Tanggal Informasi", () => {
    cy.clearFormFields({ tanggal: true });
    cy.contains("Tanggal informasi harus diisi").should(
      "contain.text",
      "Tanggal informasi harus diisi"
    );
  });

  it("Hapus Pilihan Sekolah", () => {
    cy.clearFormFields({ schools: true });
    cy.contains("Harus memilih minimal 1 sekolah").should(
      "contain.text",
      "Harus memilih minimal 1 sekolah"
    );
  });

  it("Hapus Gambar Informasi", () => {
    cy.clearFormFields({ images: true });
    cy.contains("Minimal 1 gambar yang harus diupload").should(
      "contain.text",
      "Minimal 1 gambar yang harus diupload"
    );
  });

  it("Upload Gambar Informasi lebih dari 5", () => {
    cy.get("#update-button").first().click();
    cy.get('[type="file"]').selectFile("cypress/images/7.png", { force: true });
    cy.get('[type="file"]').selectFile("cypress/images/8.png", { force: true });
    cy.get('[type="file"]').selectFile("cypress/images/8.png", { force: true });
    cy.get('[type="file"]').selectFile("cypress/images/8.png", { force: true });
    cy.get('[type="file"]').selectFile("cypress/images/8.png", { force: true });
  });

  it("Hapus Semua Kolom Informasi", () => {
    cy.clearFormFields({
      title: true,
      desc: true,
      tanggal: true,
      schools: true,
      images: true,
    });
    cy.contains("Semua kolom harus diisi").should(
      "contain.text",
      "Semua kolom harus diisi"
    );
  });

  it("Update data informasi yang valid", () => {
    cy.get("#update-button").first().click();
    cy.get("#title").clear().type("Judul Baru Nih");
    cy.get("button").contains("Simpan").click();
    cy.contains("Informasi berhasil diupdate").should(
      "contain.text",
      "Informasi berhasil diupdate"
    );
  });
});
