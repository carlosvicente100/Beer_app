context('Actions', () => {
  beforeEach(() => {
    cy.viewport(920, 950)
  })

  it('visit the app', () => {
    cy.visit('http://localhost:1234')
  })
  it('click next page on pagination', () => {
    cy.get('.Pagination button').eq(1).click()

    cy.get('.Pagination li').eq(1).should('have.class', 'active')
  })
  it('click previous page on pagination', () => {
    cy.get('.Pagination button').eq(0).click()

    cy.get('.Pagination li').eq(0).should('have.class', 'active')
  })

  it('filter elements', () => {
    cy.get('select').eq(0).select('7').should('have.value', '7')

    cy.get('select').eq(1).select('10').should('have.value', '10')

    cy.get('select').eq(2).select('2007').should('have.value', '2007')

    cy.get('select').eq(3).select('2010').should('have.value', '2010')

    cy.get('button').contains('Filter').click()
  })

  it('reset elements', () => {
    cy.get('button').contains('Reset All').click()

    cy.get('select').eq(0).should('have.value', '-1')

    cy.get('select').eq(1).should('have.value', '-1')

    cy.get('select').eq(2).should('have.value', '-1')

    cy.get('select').eq(3).should('have.value', '-1')
  })
})
