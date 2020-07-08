import loc from './locators'

Cypress.Commands.add('ClickAlert', (locator, message) =>{
    cy.get(locator).click()
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal(message)
        })
})

Cypress.Commands.add('login', (user, password)=>{
    cy.visit('https://barrigareact.wcaquino.me')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(password)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo') 
})

Cypress.Commands.add('resetApp', () =>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})


