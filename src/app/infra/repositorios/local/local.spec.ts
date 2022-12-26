import { RepositorioLocal } from './local';
import { TestBed } from '@angular/core/testing';

describe('RepositorioLocal', () => {
    let sut: RepositorioLocal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [RepositorioLocal]
        }).compileComponents();
        sut = TestBed.inject(RepositorioLocal);
    });

    it('deve criar uma instância', () => {
        expect(sut).toBeTruthy();
    });

    describe('quando for solicitado a definição de uma chave', () => {
        it('deve adicionar a chave ao repositório', () => {
            const chave = 'CHAVE_ALEATORIA_1';
            const dados = 'DADOS_MOCK_1';

            sut.definir(chave, dados);
            expect(sut.existe(chave)).toBeTruthy();
        });
        it('deve conter o valor na chave adicionada', () => {
            const chave = 'CHAVE_ALEATORIA_2';
            const dados = 'DADOS_MOCK_2';

            sut.definir(chave, dados);
            expect(sut.obter(chave)).toBe(dados);
        });
    });

    describe('quando for solicitado a exclusão de uma chave', () => {
        it('deve remover a chave do repositório', () => {
            const chave = 'CHAVE_ALEATORIA_3';
            const dados = 'DADOS_MOCK_3';

            sut.definir(chave, dados);
            sut.remover(chave);
            expect(sut.existe(chave)).toBeFalsy();
        });
    });

    describe('quando for solicitado a limpeza', () => {
        it('deve remover todas as chaves do repositório', () => {
            const chave = 'CHAVE_ALEATORIA_3';
            const dados = 'DADOS_MOCK_3';

            sut.definir(chave, dados);
            sut.limpar();

            expect(localStorage.length).toBe(0);
        });
    });

    describe('quando for solicitada uma chave', () => {
        it('deve retornar [undefined] caso não seja possível realizar o JSON.parse', () => {
            const chave = 'CHAVE_ALEATORIA_4';
            localStorage.setItem(chave, 'VALOR');

            const valor = sut.obter(chave);

            expect(valor).toBe(undefined);
        });
        it('deve retornar o valor caso seja possível realizar o JSON.parse', () => {
            const chave = 'CHAVE_ALEATORIA_5';
            const dados = '0';

            sut.definir(chave, dados);

            const valor = sut.obter(chave);

            expect(valor).toBe('0');
        });
    });
});
