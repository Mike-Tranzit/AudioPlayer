/* ������ ������� ������ ����� */
Cypress.Commands.add('clickByFirtsTrack', _ => {
    cy.get('ion-list > ion-item').first().as('firstTrack');
    cy.get('@firstTrack').click();
});
