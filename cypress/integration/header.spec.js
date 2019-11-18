/*  Проверка верней части  */
describe('Header', () => {
    const audioTitle = 'Аудио проигрыватель';
    beforeEach(() => {
        cy.baseVisit('/home');
    });

    it('toolbar should exist', function () {
        cy.get('.in-toolbar')
            .should('be.visible');

    });
    it(`should once in the page && contain ${audioTitle}`, function () {
        cy.inspectToolbar(audioTitle);
    });

});
