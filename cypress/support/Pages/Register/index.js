const el = require('./elements').ELEMENTS;

class Register{
    acessarCadastro(){
        cy.visit('register');

    }
    preencherCadastro(){
        cy.get(el.name).type("Ong dos Dogs");
        cy.get(el.email).type("Ddogs@email.com");
        cy.get(el.whatsapp).type("11965844787");
        cy.get(el.city).type("Sao Paulo");
        cy.get(el.uf).type("SP");

        //Clicar no botão de cadastro

        cy.route('POST' , '**/ongs').as('postOng');
        cy.get(el.submit).click();

    }

    validarCadastroDeOngComSucesso(){
        cy.wait('@postOng').then((xhr) =>{
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

    }
}

export default new Register();
