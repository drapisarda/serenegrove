import { originalState } from '../../../store/vars'

const { stepsOptions } = originalState
const mediaPlays = (els, expectation) => {
  let audible = false
  els.each((i, el) => {
    console.log(el)
    console.log(el.duration, el.paused, el.muted)
    if (el.duration > 0 && !el.paused && !el.muted) {
      audible = true
    }
  })
  expect(audible).to.eq(expectation)
}

const clickOnStepListItemButton = (index) => cy.get('.steps-list ul .step-item').eq(index).find('button').click({ scrollBehavior: 'center' })
const getListItems = () => cy.get('.list-items').find('.list-item')
const getListItem = (index) => getListItems().eq(index)
const playlistToSet = [0, 2, 4]; // Breath, Sound, Bell sound
let elementsNames = []

describe('Player usages', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('http://localhost:3000')
    cy.contains(' Start now! ').click()
    cy.wait(500)
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Player page is ready', () => {
    cy.get('.player__start button').should('have.class', 'inactive')
    cy.get('.player__playing').should('not.be.visible');
    cy.get('.steps-list ul').find('.step-item').should('have.length', stepsOptions.length)
  })

  it('User creates a playlist.', () => {
    // creates a playlists and returns the names of the steps
    elementsNames = playlistToSet.map(index => {
      clickOnStepListItemButton(index)
      return stepsOptions[index].name
    })

    getListItems().should('have.length', playlistToSet.length)
    cy.get('.player__start button').should('have.not.class', 'inactive')
  })

  it('Items are properly displayed', () => {
    // proper number of elements
    getListItems().should('have.length', playlistToSet.length)

    // proper elements in the proper position: 0, 1, 2
    getListItem(0).find('.card-header__title').contains(elementsNames[0])
    getListItem(1).find('.card-header__title').contains(elementsNames[1])
    getListItem(2).find('.card-header__title').contains(elementsNames[2])

    // move up of the first item and move down of the last are disabled
    getListItem(0).find('.card-actions--move-up').should('have.class', 'inactive')
    getListItem(playlistToSet.length - 1).find('.card-actions--move-down').should('have.class', 'inactive')
  })

  it('User interacts with the playlist properly', () => {
    // move down the element 0, now we have 1, 0, 2
    getListItem(0).find('.card-actions--move-down').click()
    getListItem(0).find('.card-header__title').contains(elementsNames[1])
    getListItem(1).find('.card-header__title').contains(elementsNames[0])
    getListItem(2).find('.card-header__title').contains(elementsNames[2])

    // move down again the element 0, now we have 1, 2, 0
    getListItem(1).find('.card-actions--move-down').click()
    getListItem(0).find('.card-header__title').contains(elementsNames[1])
    getListItem(1).find('.card-header__title').contains(elementsNames[2])
    getListItem(2).find('.card-header__title').contains(elementsNames[0])

    // move up again the element 2, now we have 2, 1, 0
    getListItem(1).find('.card-actions--move-up').click();
    getListItem(0).find('.card-header__title').contains(elementsNames[2])
    getListItem(1).find('.card-header__title').contains(elementsNames[1])
    getListItem(2).find('.card-header__title').contains(elementsNames[0])

    // remove the element 1, now we have 2, 0
    getListItem(1).find('.card-actions--remove').click()
    getListItems().should('have.length', playlistToSet.length - 1)
    getListItem(0).find('.card-header__title').contains(elementsNames[2])
    getListItem(1).find('.card-header__title').contains(elementsNames[0])
  })

  it('User plays a playlist', () => {
    cy.get('.player__start button').should('have.not.class', 'inactive')

    // play / pause
    cy.get('.player__playing').should('not.be.visible');
    cy.get('.player__start button').click()
    cy.wait(500)
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