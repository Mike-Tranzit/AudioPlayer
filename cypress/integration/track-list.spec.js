describe('List of tracks', function() {
    beforeEach(() => {
        cy.baseVisit('/home');
    });

    it('List should have three elements', function () {
        cy.get('.list-md > ion-item').should('have.length', 3);
    });

    it('item should have default track names', function () {
        cy.fixture('tracks').then(tracks => {
            cy.wrap(tracks).each(({name}) => {
                cy.get('ion-item > ion-label').contains(name).should('have.length', 1);
            })
        });
    });

    it('ion-label should have success color after click', function () {
        cy.clickByFirtsTrack();
        cy.get('@firstTrack').find('ion-label').should('have.class','ion-color-success');
    });
});
