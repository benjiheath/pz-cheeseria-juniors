/// <reference types="cypress" />

const addItemsToCart = (itemID1, itemID2) => {
  cy.get(`[data-cy=add-to-cart-${itemID1}]`).click();
  cy.get(`[data-cy=add-to-cart-${itemID2}]`).click();

  cy.get('[data-cy=badge-count]').should('have.text', '2');
};

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add items to cart', () => {
    addItemsToCart(2, 3);
  });

  it('Purchase items', () => {
    addItemsToCart(4, 5);

    cy.get('[data-cy=open-cart-btn]').click();

    cy.get('[data-cy=purchase-btn]').click();

    cy.get('[data-cy=purchase-snackbar-content]')
      .children()
      .should('have.text', 'Your purchase was successful!');

    // I've learned that using cy.wait like this may lead to testing inconsistencies between different machines
    // However i'm using it here as a work-around. Without it, cypress doesn't seem to be able to open the drawer.
    cy.wait(1000);

    cy.get('[data-cy=recent-purchases-btn]').click();

    cy.get('[data-cy=recent-purchases-drawer]').should('contain', 'FETA').and('contain', 'JARLSBERG');
  });
});
