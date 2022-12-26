import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { IMovimentacoesContabeisUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/contabeis.interface';
import { IMovimentacoesServico } from '@/app/dominio/contratos/servicos/movimentacoes.interface';
import { MovimentacaoContabil } from '@/app/dominio/entidades/movimentacao/contabil.model';
import { MovimentacoesContabeisUseCase } from './contabeis.usecase';
import { MovimentacoesServico } from '@/app/infra/servicos/pessoas/movimentacoes.service';
import { TestBed } from '@angular/core/testing';

describe('movimentacoes: MovimentacoesContabeisUseCase', () => {
    let sut: MovimentacoesContabeisUseCase;

    var movimentacaoBase: MovimentacaoContabil = {
        id: 'ID_FIXO',
        pessoaId: 'ID_PESSOA_FIXO',
        data: '2022-01-01',
        valor: 0,
        planoContaCreditoId: 'ID_CONTA_CREDITO',
        planoContaDebitoId: 'ID_CONTA_DEBITO',
        descricao: 'DESCRICAO',
        complemento: 'COMPLEMENTO',
        movimentoFinanceiroPaiId: '',
        movimentoContabilPaiId: '',
        loteAberto: true
    } as MovimentacaoContabil;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [IMovimentacoesContabeisUseCase, IMovimentacoesServico, ICadastrosPlanoContaUseCase!]
        }).compileComponents();
        sut = TestBed.inject(MovimentacoesContabeisUseCase);
    });

    it('deve conter uma instância do MovimentacoesContabeisUseCase', async () => {
        expect(sut).toBeTruthy();
    });

    describe('quando a operação for [cadastrar]', () => {
        it('deve retornar ["", ""] quando movimentacaoPai.valor = qualquer valor e valorFilho = 0', async () => {
            let movimentacaoPai = { ...movimentacaoBase };
            movimentacaoPai.valor = -1;
            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, 0, 'cadastrar')).toStrictEqual(['', '']);
            movimentacaoPai.valor = 0;
            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, 0, 'cadastrar')).toStrictEqual(['', '']);
            movimentacaoPai.valor = 1;
            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, 0, 'cadastrar')).toStrictEqual(['', '']);
        });

        it('deve retornar ["", "ID_CONTA_DEBITO"] quando movimentacaoPai.valor > 0 e valorFilho > 0', async () => {
            let movimentacaoPai = { ...movimentacaoBase };
            movimentacaoPai.valor = 1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, 1, 'cadastrar')).toStrictEqual(['', 'ID_CONTA_DEBITO']);
        });
        it('deve retornar ["", "ID_CONTA_CREDITO"] quando movimentacaoPai.valor < 0 e valorFilho > 0', async () => {
            let movimentacaoPai = { ...movimentacaoBase };
            movimentacaoPai.valor = -1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, 1, 'cadastrar')).toStrictEqual(['', 'ID_CONTA_CREDITO']);
        });

        it('deve retornar ["ID_CONTA_DEBITO", ""] quando movimentacaoPai.valor > 0 e valorFilho < 0', async () => {
            let movimentacaoPai = { ...movimentacaoBase };
            movimentacaoPai.valor = 1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, -1, 'cadastrar')).toStrictEqual(['ID_CONTA_DEBITO', '']);
        });
        it('deve retornar ["ID_CONTA_CREDITO", ""] quando movimentacaoPai.valor < 0 e valorFilho < 0', async () => {
            let movimentacaoPai = { ...movimentacaoBase };
            movimentacaoPai.valor = -1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacaoPai, -1, 'cadastrar')).toStrictEqual(['ID_CONTA_CREDITO', '']);
        });
    });

    describe('quando a operação for [editar]', () => {
        it('deve retornar ["ID_CONTA_CREDITO", "ID_CONTA_DEBITO"] quando movimentacao.valor >= 0 e novoValor = 0', async () => {
            let movimentacao = { ...movimentacaoBase };

            movimentacao.valor = 0;
            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, 0, 'editar')).toStrictEqual(['ID_CONTA_CREDITO', 'ID_CONTA_DEBITO']);
            movimentacao.valor = 1;
            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, 0, 'editar')).toStrictEqual(['ID_CONTA_CREDITO', 'ID_CONTA_DEBITO']);
        });

        it('deve retornar ["ID_CONTA_DEBITO", "ID_CONTA_CREDITO"] quando movimentacao.valor < 0 e novoValor = 0', async () => {
            let movimentacao = { ...movimentacaoBase };
            movimentacao.valor = -1;
            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, 0, 'editar')).toStrictEqual(['ID_CONTA_DEBITO', 'ID_CONTA_CREDITO']);
        });

        it('deve retornar ["ID_CONTA_CREDITO", "ID_CONTA_DEBITO"] quando movimentacao.valor >= 0 e novoValor > 0', async () => {
            let movimentacao = { ...movimentacaoBase };
            movimentacao.valor = 1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, 1, 'editar')).toStrictEqual(['ID_CONTA_CREDITO', 'ID_CONTA_DEBITO']);
        });
        it('deve retornar ["ID_CONTA_DEBITO", "ID_CONTA_CREDITO"] quando movimentacao.valor < 0 e novoValor > 0', async () => {
            let movimentacao = { ...movimentacaoBase };
            movimentacao.valor = -1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, 1, 'editar')).toStrictEqual(['ID_CONTA_DEBITO', 'ID_CONTA_CREDITO']);
        });

        it('deve retornar ["ID_CONTA_DEBITO", "ID_CONTA_CREDITO"] quando movimentacao.valor >= 0 e novoValor < 0', async () => {
            let movimentacao = { ...movimentacaoBase };
            movimentacao.valor = 1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, -1, 'editar')).toStrictEqual(['ID_CONTA_DEBITO', 'ID_CONTA_CREDITO']);
        });
        it('deve retornar ["ID_CONTA_CREDITO", "ID_CONTA_DEBITO"] quando movimentacao.valor < 0 e novoValor < 0', async () => {
            let movimentacao = { ...movimentacaoBase };
            movimentacao.valor = -1;

            expect(sut.calcularPlanosContabeisDetalhe(movimentacao, -1, 'editar')).toStrictEqual(['ID_CONTA_CREDITO', 'ID_CONTA_DEBITO']);
        });
    });
});
