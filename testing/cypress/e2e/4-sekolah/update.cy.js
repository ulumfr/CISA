describe("Update Sekolah Tests", () => {
  var userData;

  beforeEach(() => {
    cy.fixture("data").then((data) => {
      userData = data;
      cy.login(userData.usernameValid, userData.passwordValid);
      cy.contains("Dashboard").should("be.visible");
      cy.url().should("include", "/admin/dashboard");
    });
  });

  it("Hapus Nama Sekolah", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="namaSekolah"]').clear();
    cy.get('[name="namaSekolah"]').should("have.value", "");
    cy.get("button").contains("Simpan").click();
    cy.contains("Nama sekolah harus diisi").should(
      "contain.text",
      "Nama sekolah harus diisi"
    );
  });

  it("Hapus No HP Sekolah", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="noHandphone"]').clear();
    cy.get('[name="noHandphone"]').should("have.value", "");
    cy.get("button").contains("Simpan").click();
    cy.contains("No handphone harus diisi").should(
      "contain.text",
      "No handphone harus diisi"
    );
  });

  it("Hapus Jumlah Anak Sekolah", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="jumlahAnak"]').clear();
    cy.get('[name="jumlahAnak"]').should("have.value", "");
    cy.get("button").contains("Simpan").click();
    cy.contains("Jumlah anak harus diisi").should(
      "contain.text",
      "Jumlah anak harus diisi"
    );
  });

  it("Hapus Jumlah Pengajar Sekolah", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="jumlahPengajar"]').clear();
    cy.get('[name="jumlahPengajar"]').should("have.value", "");
    cy.get("button").contains("Simpan").click();
    cy.contains("Jumlah pengajar harus diisi").should(
      "contain.text",
      "Jumlah pengajar harus diisi"
    );
  });

  it("Hapus Jumlah Ruangan Sekolah", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="jumlahRuangan"]').clear();
    cy.get('[name="jumlahRuangan"]').should("have.value", "");
    cy.get("button").contains("Simpan").click();
    cy.contains("Jumlah ruangan harus diisi").should(
      "contain.text",
      "Jumlah ruangan harus diisi"
    );
  });

  it("Hapus Jam Pulang Sekolah", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="jamPulang"]').clear();
    cy.get('[name="jamPulang"]').should("have.value", "");
    cy.get("button").contains("Simpan").click();
    cy.contains("Jam pulang harus diisi").should(
      "contain.text",
      "Jam pulang harus diisi"
    );
  });

  it("Update data sekolah valid", () => {
    cy.get("button").contains("Edit").first().click();
    cy.get('[name="namaSekolah"]').clear().type("UMM");
    cy.get("button").contains("Simpan").click();
    cy.contains("Data sekolah berhasil diupdate").should(
      "contain.text",
      "Data sekolah berhasil diupdate"
    );
  });
});
