describe("LMS Assignment Frontend E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the page title", () => {
    cy.get('[data-cy="page-title"]').should("contain", "LMS Assignment Manager");
  });

  it("shows the assignment form", () => {
    cy.get('[data-cy="assignment-form"]').should("be.visible");
  });

  it("creates a new assignment", () => {
    cy.get('[data-cy="title-input"]').type("Cypress Test Assignment");
    cy.get('[data-cy="course-input"]').type("Software Testing");
    cy.get('[data-cy="description-input"]').type("Testing frontend user interaction.");
    cy.get('[data-cy="deadline-input"]').type("2026-05-25");
    cy.get('[data-cy="status-select"]').select("Published");
    cy.get('[data-cy="submit-btn"]').click();

    cy.get('[data-cy="message"]').should("contain", "Assignment created");
  });

  it("does not create assignment with empty fields", () => {
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="message"]').should("contain", "Please fill in all fields");
  });

  it("loads assignment list", () => {
    cy.get('[data-cy="assignments-list"]').should("exist");
  });

  it("displays assignment list section", () => {
    cy.get('[data-cy="assignments-list"]').should("be.visible");
  });

  it("allows selecting Draft status", () => {
    cy.get('[data-cy="status-select"]').select("Draft");
    cy.get('[data-cy="status-select"]').should("have.value", "Draft");
  });

  it("allows selecting Published status", () => {
    cy.get('[data-cy="status-select"]').select("Published");
    cy.get('[data-cy="status-select"]').should("have.value", "Published");
  });

  it("allows selecting Closed status", () => {
    cy.get('[data-cy="status-select"]').select("Closed");
    cy.get('[data-cy="status-select"]').should("have.value", "Closed");
  });

  it("keeps form inputs editable", () => {
    cy.get('[data-cy="title-input"]').type("Editable title").should("have.value", "Editable title");
    cy.get('[data-cy="course-input"]').type("Editable course").should("have.value", "Editable course");
  });
});
