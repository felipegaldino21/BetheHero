const el = require('./elements').ELEMENTS;

class Register{
    preencherCadastroDeCaso(){
        cy.get(el.title).type('Cãozinho abandonado');
        cy.get(el.description).type('Cãozinho abandonado foi visto na região da Freguesia do Ó, próximo a Av. Itaberaba e precisa de adoção ou achar o seu dono.');
        cy.get(el.value).type(200);
        //POST 200 /incidents
        cy.route('POST' ,'**/incidents').as('newIncident');
        cy.get(el.buttonSave).click();
    }

    validarCadastroDeCaso(){
        cy.wait('@newIncident').then((xhr) =>{
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }

}

export default new Register();