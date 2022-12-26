import { RepositorioSessao } from './sessao';
import { TestBed } from '@angular/core/testing';

describe('RepositorioSessao', () => {
    let sut: RepositorioSessao;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [RepositorioSessao]
        }).compileComponents();
        sut = TestBed.inject(RepositorioSessao);
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

            expect(sessionStorage.length).toBe(0);
        });
    });
});
