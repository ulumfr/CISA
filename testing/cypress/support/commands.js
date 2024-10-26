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
