///<reference types="cypress" />

import loc from '../support/locators'
import '../support/commandsContas'
import '../support/commandsMovimentacoes'
import '../support/index'

describe('Testes Funcionais', () => {

    before(() =>{       
        cy.login('','')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Inserir conta', () =>{
        cy.acessarMenuConta()
        cy.inserirConta('Primeira conta criada')       
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!') 
    })

    it('Alterar nome da conta', () =>{
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta editada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Não deve criar uma conta com o mesmo nome', () =>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')  

    }) 

    it('Inserir movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACOES).click()
        cy.inserirMovimentacao('description',200,'eu','Conta para movimentacoes')
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
        cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('description','200')).should('exist')
    })

    it('Verificar saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','534,00')
        
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACOES.DESCRICAO).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACOES.BTN_STATUS).click()
        cy.get(loc.MOVIMENTACOES.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')

        cy.get(loc.MENU.HOME).click()
        cy.wait(1000)
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','4.034,00')
    })

    it('Excluir movimentação', () =>{
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_EXCLUIR_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!') 
    })
})