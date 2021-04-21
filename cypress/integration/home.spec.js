/// <reference types="cypress" />

describe('Calendar', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('.fc-toolbar-chunk').as('toolbar');
    cy.get('.autocomplete').as('search');
  });

  it('should display all planned pickups and returns', () => { 
    cy.wait(500);

    cy.get('@toolbar')
      .find('button.fc-today-button')
      .should('be.be.disabled');

    cy.get('@toolbar')
      .find('button.fc-next-button')
      .click();

    cy.get('@toolbar')
      .find('button.fc-today-button')
      .should('be.not.disabled');

    cy.get('.fc-timegrid-event-harness:first').scrollIntoView();
    cy.get('.fc-timegrid-event-harness:first').find('.trigger').click();

    cy.get('.tooltip')
      .should('have.class', 'open');

    cy.get('.tooltip')
      .find('.popover-close')
      .click();

    cy.get('@toolbar')
      .find('button.fc-today-button')
      .click();

    cy.get('@toolbar')
      .find('button.fc-today-button')
      .should('be.be.disabled');  
  });

  it('should performs the search based on the text entered', () => {
    const typedText = 'station';

    cy.get('@search')
      .find('input')
      .should('be.visible'); 
    
    cy.get('@search')
      .find('.autocomplete-items')
      .should('not.visible');

    cy.get('@search')
      .find('input')
      .type(typedText)   
      .should('have.value',typedText);
    
    cy.wait(500);

    cy.get('@search')
      .find('.autocomplete-items')
      .should('be.visible');

    cy.get('.autocomplete-items')
      .find('li')
      .its('length')
      .should('be.gte', 0);
    
    cy.get('.autocomplete-item:first').click();

    cy.wait(1000);

    cy.get('@search')
      .find('.autocomplete-items')
      .should('not.visible');
  });
})