describe('Overall Checkup', () => {
  it('Successfully loads', () => {
    cy.visit('/');
    cy.contains('Bringing the World to Your Table.');
  });

  it('Search for spaghetti', () => {
    cy.visit('/');
    cy.get('[data-cy="autocomplete"]').click();
    cy.get('[data-cy="autocomplete"]').type('spaghetti{enter}', { delay: 100 });
    cy.contains('Spaghetti Bolognese');
  });

  it('Visit a random Recipe then click on a ingredient', () => {
    cy.visit('/');
    cy.get('[data-cy="random-recipe"] .text-xl')
      .invoke('text')
      .then((recipe) => {
        cy.get('[data-cy="random-recipe"]').click();
        cy.get('.text-5xl').contains(recipe);
      });
    cy.get('[data-cy="ingredient-card"]')
      .first()
      .find('.text-md')
      .invoke('text')
      .then((ingredient) => {
        cy.get('[data-cy="ingredient-card"]').first().click();
        cy.get('.text-5xl').contains(ingredient);
      });
  });

  it('Visit a Category Page', () => {
    cy.visit('/');
    cy.get('[data-cy="category-card"]')
      .first()
      .children()
      .invoke('text')
      .then((recipe) => {
        cy.get('[data-cy="category-card"]').first().click();
        cy.get('.text-5xl').contains(recipe);
      });
  });

  it('Visit a Cuisine Page', () => {
    cy.visit('/');
    cy.get('[data-cy="cuisine-card"]')
      .first()
      .invoke('text')
      .then((recipe) => {
        cy.get('[data-cy="cuisine-card"]').first().click();
        cy.get('.text-5xl').contains(recipe);
      });
  });

  it('Visit a wrong address should lead to page not found', () => {
    cy.visit('/asd');
    cy.contains(`Error 404`);
  });

  it('Visit a private address should redirect to home page', () => {
    cy.visit('/favorites');
    cy.contains('Bringing the World to Your Table.');
  });
});
