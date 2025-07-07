describe('Login', () => {
  it('Login with fake account', () => {
    cy.visit('/');
    cy.get('[data-cy="user-profile"]').click();
    cy.get('[data-cy="login-modal"]').click();
    cy.get('[type="submit"]').click();
    cy.get('[data-slot="error-message"]').should('have.length', 2);
    cy.get('[name="username"]').type('fakeaccount{enter}', { delay: 100 });
    cy.get('[name="password"]').type('tinypas', { delay: 100 });
    cy.get('[data-slot="error-message"]').contains(
      'Password must be at least 8 characters long'
    );
    cy.get('[name="password"]').type('sword{enter}', { delay: 100 });
    cy.get('.text-danger').contains('Username/password is incorrect');
  });

  it('Login with actual account', () => {
    cy.visit('/');
    cy.get('[data-cy="user-profile"]').click();
    cy.get('[data-cy="login-modal"]').click();
    cy.get('[type="submit"]').click();
    cy.get('[name="username"]').type('ahmad', { delay: 100 });
    cy.get('[name="password"]').type('ahmad123{enter}', { delay: 100 });
    cy.get('[data-cy="user-profile"]').click();
    cy.contains('Logged in as Ahmad');
    cy.get('[data-cy="favorites"]').click();
    cy.contains('Favorite');
    cy.go('back');

    cy.get('[data-cy="random-recipe"] .text-xl')
      .invoke('text')
      .then((recipe) => {
        cy.get('[data-cy="random-recipe"]')
          .children()
          .find('a:not([href])')
          .click();
        cy.wait(1000);
        cy.visit('/favorites');
        cy.wait(1000);
        cy.contains(recipe);
      });
  });
});
