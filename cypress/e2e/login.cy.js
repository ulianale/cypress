beforeEach(() => {
  cy.visit('/');
});
describe('login screen', () => {
  it('successfully login', () => {
    cy.login('bropet@mail.ru', '123');
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible');
  })

  it('show error if empty login', () => {
    cy.login(null, '111');
    cy.get('#mail')
      .then((element) => element[0].checkValidity())
      .should('be.false');

      cy.get('#mail')
      .then((element) => element[0].validationMessage)
      .should('contain', 'Заполните это поле');
  })

  it('show error if empty password', () => {
    cy.login('bropet@mail.ru', null);
    cy.get('#pass')
      .then((element) => element[0].checkValidity())
      .should('be.false');

    cy.get('#pass')
      .then((element) => element[0].validationMessage)
      .should('contain', 'Заполните это поле');
  })

});

describe('tests for bookList', () => {
  beforeEach(() => {
    cy.login('bropet@mail.ru', '123');
  });
  it('add book to bookList', () => {
    cy.addBook('Book1', 'description', 'author');
    cy.contains('Book1').should('be.visible');
  })

  it('add book to favorite throw add new', () => {
    cy.addBookToFavoritesThrowAddNew('Book2', 'description', 'author');
    cy.contains('Book2').should('be.visible');
  })

  it('add book to favorite throw bookList', () => {
    cy.addToFavoriteThrowBookList('Book1');
    cy.get('h4').click();
    cy.contains('Book1').should('be.visible');

  })

  it('delete book from favorite', () => {
    cy.deleteBookFromFavorites('Book1');
    cy.wait(3000);
    cy.contains('Book1').should('not.exist');

  })

});