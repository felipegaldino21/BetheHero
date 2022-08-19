/// <reference types="cypress" />

import Logon from "../support/Pages/Logon";
import Register from "../support/Pages/Register";
import Profile from "../support/Pages/Profile";
import NewIncident from "../support/Pages/NewIncident";

describe('Ongs', () => {
    it('Devem poder realizar um cadastro', () => {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroDeOngComSucesso();
    });

    it('Devem poder realizar login no sistema', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();

    })

    it('Devem poder realizar logout no sistema', () => {
        cy.login();
        Profile.clicarNoBotãoLogout();
    });

    it('Devem poder cadastrar novos casos', () => {
        cy.login()
        Profile.clicarNoBotãoNovosCasos();
        NewIncident.preencherCadastroDeCaso();
        NewIncident.validarCadastroDeCaso();
    });

    it('Devem poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();
        Profile.clicarNoBotãoExcluirUmCaso();
        Profile.validarExclusãoDeCasoComSucesso();
    });
});
