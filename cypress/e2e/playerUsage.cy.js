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

    cy.contains(' Start now! ').click()

    cy.get('.player__start button').should('have.class', 'inactive')
    cy.get('.player__playing').should('not.be.visible');

    cy.get('.steps-list ul').find('.step-item').should('have.length', 5)
    cy.get('.steps-list ul .step-item').eq(0).find('button').click({ scrollBehavior: 'center' })
    cy.get('.steps-list ul .step-item').eq(2).find('button').click({ scrollBehavior: 'center' })
    cy.get('.steps-list ul .step-item').eq(4).find('button').click({ scrollBehavior: 'center' })

    cy.get('.list-items').find('.list-item').should('have.length', 3)

    // list items edit
    cy.get('.list-items').find('.list-item').eq(0).find('.card-header__title').contains('Breath')
    cy.get('.list-items').find('.list-item').eq(1).find('.card-header__title').contains('Sounds')
    cy.get('.list-items').find('.list-item').eq(0).find('.card-actions__down').click({ scrollBehavior: 'center' })

    cy.get('.list-items').find('.list-item').eq(0).find('.card-header__title').contains('Sounds')
    cy.get('.list-items').find('.list-item').eq(1).find('.card-header__title').contains('Breath')
    cy.get('.list-items').find('.list-item').eq(1).find('.card-actions__down').click({ scrollBehavior: 'center' })
    cy.get('.list-items').find('.list-item').eq(1).find('.card-header__title').contains('Bell sound')

    cy.get('.list-items').find('.list-item').eq(1).find('.card-actions__remove').click({ scrollBehavior: 'center' })
    cy.get('.list-items').find('.list-item').eq(1).find('.card-header__title').contains('Breath')

    cy.get('.list-items').find('.list-item').should('have.length', 2)

    // play / pause
    cy.get('.player__start button').click({ scrollBehavior: 'center' })
    cy.get('.player__playing.player__playing--visible').should('be.visible');
    cy.get('audio').should(($p) => mediaPlays($p, true))
    cy.wait(500)
    cy.get('.player__action__button--pause').click({ scrollBehavior: 'center' })
    cy.get('audio').should(($p) => mediaPlays($p, false))
    cy.wait(500)
    cy.get('.player__action__button--play').click({ scrollBehavior: 'center' })
    cy.get('audio').should(($p) => mediaPlays($p, true))

    // exit
    cy.get('.player__playing .button--close').click({ scrollBehavior: 'center' })
    cy.get('.feedback-request').contains('How you liked this meditation?')
    cy.get('.player__playing .player__action--stop').click({ scrollBehavior: 'center' })
  })
})