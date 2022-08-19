const el = require('./elements').ELEMENTS;

class Profile{
    clicarNoBotãoLogout(){
        cy.get(el.buttonLogout).click();
    }
    clicarNoBotãoNovosCasos(){
        cy.get(el.buttonNewIncident).click();
    }
    clicarNoBotãoExcluirUmCaso(){
        cy.route('DELETE' , '**/incidents/*').as('deleteIncident');
        cy.get(el.buttonDelete).click();

    }
    validarExclusãoDeCasoComSucesso(){
        cy.wait('@deleteIncident').then((xhr) =>{
            expect(xhr.status).to.equal(204);
            expect(xhr.response.body).to.be.empty;
        })

    }
}

export default new Profile();