describe('test', function() {
    it('movies count', function() {
      cy.visit('http://server:9000')
  
      cy.get('input').clear().type('interstellar')
      cy.get('#react-autowhatever-1').find('li').should('have.length', '13')
    })
    it('movie rating', function() {
      cy.visit('http://server:9000')

      cy.get('input').clear().type('Новогодние сваты')
      cy.get('#react-autowhatever-1--item-0').click()
      cy.get('.movie-info div').eq(1).should('have.text', '0')
    })
    it('movie description', function() {
      cy.visit('http://server:9000')

      cy.get('input').clear().type('The Green Elephant')
      cy.get('#react-autowhatever-1--item-0').click()
      cy.get('#movie-overview').should('have.text', 'The movie is set in the brig, the walls of which are painted in a poisonous green color. There fall into two junior officers, Sergei "Fallen" Pakhomov and Vladimir "Little brother"  Epifantsev. So, both lieutenant begin their dialogue. The dialogue began with a discussion of various philosophical problems, as well as the stories of two army lieutenants. Afterwards, "Fallen” starts to turn the conversation in a completely different direction, telling the "Little brother" of how he first had sex with a drunken woman, about how he ejaculated at her face, and then he defecating in the sea, and also how during his urgent service he just did not become a queer...')
    })
  })