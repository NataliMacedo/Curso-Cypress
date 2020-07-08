import loc from './locators'


Cypress.Commands.add('inserirMovimentacao', (descricao, valor, interessado, nomeConta) => {
    cy.get(loc.MOVIMENTACOES.DESCRICAO).type(descricao)
    cy.get(loc.MOVIMENTACOES.VALOR).type(valor)    
    cy.get(loc.MOVIMENTACOES.INTERESSADO).type(interessado)
    cy.get(loc.MOVIMENTACOES.CONTA).select(nomeConta)
    cy.get(loc.MOVIMENTACOES.BTN_STATUS).click()
    cy.get(loc.MOVIMENTACOES.BTN_SALVAR).click()
    
})