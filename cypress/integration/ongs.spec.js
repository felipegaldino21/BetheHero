/// <reference types="cypress" />

describe('Ongs', () => {
    it.skip('Devem poder realizar um cadastro', () => {
        //Preenchimento do cadastro com os dados
        cy.visit('register')
        cy.get('[placeholder="Nome da ONG"]').type("Ong dos Dogs");
        cy.get('[type="email"]').type("Ddogs@email.com");
        cy.get('[placeholder="WhatsApp"]').type("11965844787");
        cy.get('[placeholder="Cidade"]').type("Sao Paulo");
        cy.get('[placeholder="UF"]').type("SP");

        //Clicar no botão de cadastro

        cy.server();
        cy.route('POST' , '**/ongs').as('postOng');
        cy.get('.button').click();

        cy.wait('@postOng').then((xhr) =>{
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

       
    });

    it('Devem poder realizar login no sistema', () => {
     
    })
});
