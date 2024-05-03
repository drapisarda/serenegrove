describe('Player usages', () => {

  const mediaPlays = (els, expectation)=>{
    let audible = false
    els.each((i, el)=>{
      console.log(el)
      console.log(el.duration, el.paused, el.muted)
      if (el.duration > 0 && !el.paused && !el.muted) {
        audible = true
      }
    })
    expect(audible).to.eq(expectation)
  }

  it('User creates a playlist', () => { 
    cy.visit('http://localhost:3000')

    const clickOnStepListItemButton = (index) => cy.get('.steps-list ul .step-item').eq(index).find('button').click({ scrollBehavior: 'center' })
    const getListItems = () => cy.get('.list-items').find('.list-item')
    const getListItem = (index) => getListItems().eq(index)

    cy.contains(' Start now! ').click()

    cy.get('.player__start button').should('have.class', 'inactive')
    cy.get('.player__playing').should('not.be.visible');

    cy.get('.steps-list ul').find('.step-item').should('have.length', 5)

    clickOnStepListItemButton(0)
    clickOnStepListItemButton(2)
    clickOnStepListItemButton(4)


    getListItems().should('have.length', 3)

    // list items edit
    getListItem(0).find('.card-header__title').contains('Breath')
    getListItem(1).find('.card-header__title').contains('Sounds')
    getListItem(0).find('.card-actions--move-down').click()

    getListItem(0).find('.card-header__title').contains('Sounds')
    getListItem(1).find('.card-header__title').contains('Breath')
    getListItem(1).find('.card-actions--move-down').click()
    getListItem(1).find('.card-header__title').contains('Bell sound')
    getListItem(1).find('.card-actions--move-up').click();
    getListItem(0).find('.card-header__title').contains('Bell sound')

    getListItem(1).find('.card-actions--remove').click()
    getListItem(1).find('.card-header__title').contains('Breath')

    cy.get('.list-items').find('.list-item').should('have.length', 2)

    // play / pause
    cy.get('.player__playing').should('not.be.visible');
    cy.get('.player__start button').click()
    cy.get('.player__playing').should('be.visible');
    cy.get('audio').should(($p) => mediaPlays($p, true))
    cy.wait(500)
    cy.get('.player__action__button--pause').click()
    cy.get('audio').should(($p) => mediaPlays($p, false))
    cy.wait(500)
    cy.get('.player__action__button--play').click()
    cy.get('audio').should(($p) => mediaPlays($p, true))

    // exit
    cy.get('.player__playing .button--close').click()
    cy.get('.feedback-request').contains('How you liked this meditation?')
    cy.get('.player__playing .player__action--stop').click()
    cy.get('.player__playing').should('not.be.visible');
  })
})