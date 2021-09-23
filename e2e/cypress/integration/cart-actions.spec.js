/// <reference types="cypress" />

const addItemsToCart = () => {
  cy.get('[data-cy=add-to-cart-2]').click();
  cy.get('[data-cy=add-to-cart-3]').click();

  cy.get('[data-cy=badge-count]').should('have.text', '2');
};

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add items to cart', () => {
    addItemsToCart();
  });

  it('Purchase items', () => {
    addItemsToCart();

    cy.get('[data-cy=open-cart-btn]').click();

    cy.get('[data-cy=purchase-btn]').click();

    cy.get('[data-cy=purchase-snackbar-content]')
      .children()
      .should('have.text', 'Your purchase was successful!');

    cy.wait(1000);

    cy.get('[data-cy=recent-purchases-btn]').click();

    cy.get('[data-cy=recent-purchases-drawer]').should('contain', 'FETA').and('contain', 'JARLSBERG');
  });
});
