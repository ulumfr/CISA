Cypress.Commands.add("login", (username, password) => {
  cy.visit("/auth/login");
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login").click();

  cy.url().should("include", "/admin/dashboard");
  cy.get("#admin").should("have.text", "Cita Sakinah Administrator");
  cy.contains("Login berhasil").should("contain.text", "Login berhasil");
});

Cypress.Commands.add(
  "fillInformasi",
  ({ title = "", desc = "", date = "", schools = [], images = [] }) => {
    cy.get("#add-button").click();
    if (title) cy.get("#title").type(title);
    if (desc) cy.get(".ql-editor").type(desc);
    if (date) cy.get("#tanggal").type(date);
    schools.forEach((school) => {
      cy.get(school).check();
    });
    images.forEach((image) => {
      cy.get('[type="file"]').selectFile(image, { force: true });
    });
  }
);

Cypress.Commands.add("clearFormFields", (clearFields = {}) => {
  cy.get("#update-button").first().click();
  if (clearFields.title) {
    cy.get("#title").clear();
    cy.get("#title").should("have.value", "");
  }
  if (clearFields.desc) {
    cy.get(".ql-editor").clear();
    cy.get(".ql-editor").should("have.value", "");
  }
  if (clearFields.tanggal) {
    cy.get("#tanggal").clear();
    cy.get("#tanggal").should("have.value", "");
  }
  if (clearFields.schools) {
    cy.get('[id^="school-"]').each(($school) => {
      if ($school.prop("checked")) {
        cy.wrap($school).uncheck();
      }
    });
  }
  if (clearFields.images) {
    cy.get('[id^="image-"]').then((images) => {
      const imageCount = images.length;
      for (let i = 0; i < imageCount; i++) {
        cy.get("#button-gambar").first().click();
      }
    });
  }
  cy.get("button").contains("Simpan").click();
});
