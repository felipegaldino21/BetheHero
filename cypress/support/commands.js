// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("createOng", () =>{
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            name: "Ong dos Dogs",
            email: "Ddogs@email.com",
            city: "Sao Paulo",
            whatsapp: "11965844787",
            uf: "SP"
        }
    }).then(response =>{
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdOngId', response.body.id);
    });
})

Cypress.Commands.add("createNewIncident" , () =>{
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/incidents',
        headers: { 'Authorization':`${Cypress.env('createdOngId')}`,},
        body: {
            description: "Cãozinho abandonado foi visto na região da Freguesia do Ó, próximo a Av. Itaberaba e precisa de adoção ou achar o seu dono.",
            title: "Cãozinho abandonado",
            value: "200"
        }
    }).then(response => {
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdIncidentId' , response.body.id);
    })
})

Cypress.Commands.add("login" , () =>{
      cy.visit('http://localhost:3000/profile' , {
            onBeforeLoad: (browser) => {
                browser.localStorage.setItem('ongId' , Cypress.env('createdOngId'))
                browser.localStorage.setItem('ongName' , 'Ong dos Dogs');
            }
        });
})