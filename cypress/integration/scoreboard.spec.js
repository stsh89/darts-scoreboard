describe('scoreboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('allows players to enter their scores', () => {
    // Inital state
    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })
    cy.get('[data-e2e="player1Score"]').should('have.text', '301')
    cy.get('[data-e2e="player2Score"]').should('have.text', '301')

    // Player1 turn
    cy.get('[data-e2e="numberButton1"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1')
    cy.get('[data-e2e="enterButton"]').click()

    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player2 score')
      expect(x.val()).to.equal('')
    })
    cy.get('[data-e2e="player1Score"]').should('have.text', '300')
    cy.get('[data-e2e="player2Score"]').should('have.text', '301')

    // Player2 turn
    cy.get('[data-e2e="numberButton1"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1')
    cy.get('[data-e2e="enterButton"]').click()

    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })
    cy.get('[data-e2e="player1Score"]').should('have.text', '300')
    cy.get('[data-e2e="player2Score"]').should('have.text', '300')
  })

  it('allows players to remove symbols from score input', () => {
    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })

    cy.get('[data-e2e="numberButton1"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1')

    cy.get('[data-e2e="removeButton"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })
  })

  it('allows to enter correct numbers', () => {
    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })

    cy.get('[data-e2e="numberButton1"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1')
    cy.get('[data-e2e="numberButton2"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '12')
    cy.get('[data-e2e="numberButton3"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '123')
    cy.get('[data-e2e="numberButton4"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1234')
    cy.get('[data-e2e="numberButton5"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '12345')
    cy.get('[data-e2e="numberButton6"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '123456')
    cy.get('[data-e2e="numberButton7"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1234567')
    cy.get('[data-e2e="numberButton8"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '12345678')
    cy.get('[data-e2e="numberButton9"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '123456789')
    cy.get('[data-e2e="numberButton0"]').click()
    cy.get('[data-e2e="scoreInputValue"]').should('have.value', '1234567890')
  })

  it('allows players to reset game state', () => {
    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })
    cy.get('[data-e2e="player1Score"]').should('have.text', '301')
    cy.get('[data-e2e="player2Score"]').should('have.text', '301')

    cy.get('[data-e2e="numberButton1"]').click()
    cy.get('[data-e2e="enterButton"]').click()
    cy.get('[data-e2e="numberButton1"]').click()
    cy.get('[data-e2e="enterButton"]').click()
    cy.get('[data-e2e="player1Score"]').should('have.text', '300')
    cy.get('[data-e2e="player2Score"]').should('have.text', '300')

    cy.get('[data-e2e="resetButton"]').click()
    cy.get('[data-e2e="player1Score"]').should('have.text', '301')
    cy.get('[data-e2e="player2Score"]').should('have.text', '301')
    cy.get('[data-e2e="scoreInputValue"]').should((x) => {
      expect(x.attr('placeholder')).to.equal('Player1 score')
      expect(x.val()).to.equal('')
    })
  })
})
