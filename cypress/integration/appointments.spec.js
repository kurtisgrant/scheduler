import axios from 'axios';


describe("Appointments", () => {


  it("should book an interview", () => {
    axios.get('http://localhost:8001/api/debug/reset');

    cy.visit('/').wait(500);
    cy.contains("[data-testid=day]", "Monday");

    cy.get('[data-testid=add-appointment]').first().click().wait(500);
    cy.get('[data-testid=student-name-input]').type("Zendaya Coleman").wait(500);
    cy.get('[data-testid=interviewer]').first().click().wait(500);
    cy.get('[data-testid=save-appointment]').click().wait(500);
    cy.contains('[data-testid=appointment]', 'Zendaya Coleman');
  });

  it("should edit an interview", () => {
    cy.visit('/').wait(500)
    cy.contains('[data-testid=appointment]', 'Zendaya Coleman')
      .closest('[data-testid=appointment]')
      .find('[data-testid=edit-appointment]').click({ force: true }).wait(500);
    cy.get('[data-testid=student-name-input]').type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Holland").wait(500);
    cy.get('[data-testid=interviewer]:nth-child(2)').click().wait(500);
    cy.get('[data-testid=save-appointment]').click().wait(500);
    cy.contains('[data-testid=appointment]', 'Zendaya Holland');

  });
  it("should cancel an interview", () => {
    cy.visit('/').wait(500)
    cy.contains('[data-testid=appointment]', 'Zendaya Holland')
      .closest('[data-testid=appointment]')
      .find('[data-testid=delete-appointment]').click({ force: true }).wait(500);
    cy.get('[data-testid=confirm-action]').click();
    cy.get('[data-testid=status]').contains('Deleting');
    cy.get('[data-testid=appointment]:nth-child(2)')
      .find('[data-testid=add-appointment]');
  });

});