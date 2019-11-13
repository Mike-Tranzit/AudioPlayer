/*   Проверка панели контролов   */
describe('Check control panel', function() {
    const countOfButtons = 3;
    beforeEach(() => {
        cy.baseVisit('/home');
        cy.clickByFirtsTrack();
    });

    it('panel should be visible', function () {
        cy.get('ion-footer').should('be.visible');
    });

    it('activeTrack should be equal after click', function () {
        cy.get('@firstTrack').find('ion-label').invoke('text').then((value) => {
            cy.get('ion-footer > ion-toolbar > ion-row > ion-col').first().should('have.text', value);
        });
    });

    it('progress bar is visible', function () {
        cy.get('.ng-untouched').should('be.visible');
    });

    it('buttons have right count', function () {
        cy.get('ion-row.md > :nth-child(4)').find('ion-button').should('have.length' , countOfButtons);
    });

});
