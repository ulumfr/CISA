describe("Create Information Tests", () => {
  var userData;

  beforeEach(() => {
    cy.fixture("data").then((data) => {
      userData = data;
      cy.login(userData.usernameValid, userData.passwordValid);
      cy.get("ul").contains("Informasi").click();
      cy.url().should("include", "/admin/informasi");
      cy.contains("Informasi").should("be.visible");
    });
  });

  it("TC005 - Semua inputan informasi null", () => {
    cy.fillInformasi({});
    cy.get("button").contains("Simpan").click();
    cy.contains("Semua kolom harus diisi").should(
      "contain.text",
      "Semua kolom harus diisi"
    );
  });

  it("TC006 - Judul informasi null", () => {
    cy.fillInformasi({
      desc: "Test Desc",
      date: "2024-01-20",
      schools: ["#school-1", "#school-2", "#school-3"],
      images: ["cypress/images/2.png"],
    });
    cy.get("button").contains("Simpan").click();
    cy.contains("Judul informasi harus diisi").should(
      "contain.text",
      "Judul informasi harus diisi"
    );
  });

  it("TC007 - Deskripsi informasi null", () => {
    cy.fillInformasi({
      title: "Test Judul",
      date: "2024-01-20",
      schools: ["#school-1", "#school-2", "#school-3"],
      images: ["cypress/images/2.png"],
    });
    cy.get("button").contains("Simpan").click();
    cy.contains("Deskripsi informasi harus diisi").should(
      "contain.text",
      "Deskripsi informasi harus diisi"
    );
  });

  it("TC008 - Tanggal informasi null", () => {
    cy.fillInformasi({
      title: "Test Judul",
      desc: "Test Desc",
      schools: ["#school-1", "#school-2", "#school-3"],
      images: ["cypress/images/2.png"],
    });
    cy.get("button").contains("Simpan").click();
    cy.contains("Tanggal informasi harus diisi").should(
      "contain.text",
      "Tanggal informasi harus diisi"
    );
  });

  it("TC009 - Pilihan sekolah null", () => {
    cy.fillInformasi({
      title: "Test Judul",
      desc: "Testing Desc",
      date: "2024-01-20",
      images: ["cypress/images/2.png"],
    });
    cy.get("button").contains("Simpan").click();
    cy.contains("Harus memilih minimal 1 sekolah").should(
      "contain.text",
      "Harus memilih minimal 1 sekolah"
    );
  });

  it("TC010 - Upload gambar null", () => {
    cy.fillInformasi({
      title: "Testing Judul",
      desc: "Testing Desc",
      date: "2024-01-20",
      schools: ["#school-1", "#school-2", "#school-3"],
    });
    cy.get("button").contains("Simpan").click();
    cy.contains("Minimal 1 gambar yang harus diupload").should(
      "contain.text",
      "Minimal 1 gambar yang harus diupload"
    );
  });

  it("TC011 - Upload gambar lebih dari 5", () => {
    cy.fillInformasi({
      title: "Testing Judul",
      desc: "Testing Desc",
      date: "2024-01-20",
      schools: ["#school-1", "#school-2", "#school-3"],
      images: [
        "cypress/images/7.png",
        "cypress/images/8.png",
        "cypress/images/2.png",
        "cypress/images/3.png",
        "cypress/images/4.png",
        "cypress/images/5.png",
        "cypress/images/6.png",
      ],
    });
    cy.contains("Pilihan maksimal 5 foto").should(
      "contain.text",
      "Pilihan maksimal 5 foto"
    );
  });

  it("TC012 - Data inputan informasi valid", () => {
    cy.fillInformasi({
      title: "Testing Judul",
      desc: "Testing Desc",
      date: "2024-01-20",
      schools: ["#school-1", "#school-2", "#school-3"],
      images: ["cypress/images/2.png"],
    });
    cy.wait(500);
    cy.get("button").contains("Simpan").click();
    cy.contains("Informasi berhasil dibuat").should(
      "contain.text",
      "Informasi berhasil dibuat"
    );
    cy.url().should("include", "/admin/informasi");
  });
});
