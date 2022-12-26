import { Component, Input, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { IModaisHelper, ModalTipoHistoricoDetalhe } from '@/app/dominio/contratos/helpers/modais.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { ID } from './../../../../../dominio/entidades/sistema/types.model';
import { IMovimentacoesFinanceirasUseCase } from '@/app/dominio/contratos/casos-uso/movimentacoes/financeiras.interface';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovimentacaoFinanceira } from '@/app/dominio/entidades/movimentacao/movimentacao.model';
import { Pesquisa } from '@/app/apresentacao/componentes/negocios/movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';
import { PessoaDetalhe } from '@/app/dominio/entidades/pessoas/pessoa.model';
import { PlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';
import dayjs from 'dayjs';
import { forkJoin } from 'rxjs';

type MovimentacaoTrabalho = {
    id: ID;
    data: string;
    valor: number;
};

@Component({
    selector: 'sfr-movimentacoes-card-movimentacao',
    templateUrl: './card-movimentacao.component.html',
    styleUrls: ['./card-movimentacao.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class MovimentacoesCardMovimentacaoComponent {
    _colunasExibidas: string[] = ['data', 'valor', 'acao-1'];

    _listaMovimentacoesBase: MovimentacaoTrabalho[] = [];
    _listaMovimentacoes: MatTableDataSource<any>;

    _form: UntypedFormGroup;

    _listaPessoas: ListaOpcoesSelect[];
    _listaHistoricoPadrao: ListaOpcoesSelect[];
    _listaBancos: ListaOpcoesSelect[];
    _listaContas: ListaOpcoesSelect[];
    _listaTipos: ListaOpcoesSelect[] = [];
    _listaPlanoContas: ListaOpcoesSelect[];

    _modoEdicao: boolean = false;

    _pessoaDetalhe: PessoaDetalhe;

    _dados: Pesquisa;
    @Input()
    public get dados(): Pesquisa {
        return this._dados;
    }
    public set dados(value: Pesquisa) {
        this._dados = value;
        if (this._dados) {
            this.inicializarControle(this._dados);
            this.obterPessoa(this._dados.pessoaId);
        }
    }

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public estado: IEstadosHelper,
        private _snackbarHelper: ISnackbarHelper,
        private _modaisHelper: IModaisHelper,
        private _movimentacoesFinanceirasUseCase: IMovimentacoesFinanceirasUseCase,
        private _navegacaoHelper: INavegacaoHelper,
        private _pessoasUseCase: IPessoasUseCase,
        private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase,
        private _formBuilder: UntypedFormBuilder
    ) {
        this.obterListas();

        const arrayVazio: any[] = [];
        this._listaMovimentacoes = new MatTableDataSource(arrayVazio);
        this._listaMovimentacoes.sort = this.sort;
    }

    inicializarControle(dados?: Pesquisa) {
        this._form = this._formBuilder.group({
            id: [''],
            pessoaId: [{ value: dados?.pessoaId ?? '', disabled: true }, [Validators.required]],
            data: [{ value: dayjs().format('YYYY-MM-DD'), disabled: this._modoEdicao }, [Validators.required]],
            valor: [{ value: 0, disabled: this._modoEdicao }, [Validators.required]],

            bancoId: [{ value: dados?.bancoId ?? '', disabled: true }, [Validators.required]],
            bancoNome: ['', Validators.required],

            contaId: [{ value: dados?.contaId ?? '', disabled: true }, [Validators.required]],
            contaAgencia: ['', Validators.required],
            contaNumero: ['', Validators.required],
            contaMoedaId: ['', Validators.required],
            contaMoedaSimbolo: [''],

            planoContaCreditoId: [{ value: '', disabled: this._modoEdicao }, [Validators.required]],
            planoContaCreditoNumero: ['', Validators.required],
            planoContaCreditoDescricao: ['', Validators.required],

            planoContaDebitoId: [{ value: '', disabled: this._modoEdicao }, [Validators.required]],
            planoContaDebitoNumero: ['', Validators.required],
            planoContaDebitoDescricao: ['', Validators.required],

            descricao: ['', Validators.required],
            complemento: [''],
            lancamentoId: [2, [Validators.required]],
            lancamentoDescricao: ['Manual', Validators.required]
        });

        // this._form.get('bancoId')?.valueChanges.subscribe((dados) => {
        //     if (dados) {
        //         const banco = this._pessoaDetalhe.bancos.find((banco) => banco.id === dados);

        //         if (banco) {
        //             this._listaContas = banco.contas.map((conta) => {
        //                 return { id: conta.id as string, descricao: conta.agencia + '/' + conta.numero };
        //             });
        //         }
        //     }
        //     this._form.get('contaId')?.setValue('');
        // });

        // this._form.get('bancoId')?.valueChanges.subscribe((novoValor) => {
        //     const opcao = this._listaBancos.find((elemento) => {
        //         return elemento.id === novoValor;
        //     });
        //     if (opcao) {
        //         this._form.get('bancoNome')?.setValue(opcao.descricao);
        //     }
        // });

        // this._form.get('contaId')?.valueChanges.subscribe((novoValor) => {
        //     const banco = this._pessoaDetalhe.bancos.find((elemento) => {
        //         return elemento.id === this._form.get('bancoId')?.value;
        //     });

        //     if (banco) {
        //         const conta = banco.contas.find((elemento) => {
        //             return elemento.id === novoValor;
        //         });

        //         this._form.get('contaAgencia')?.setValue(conta?.agencia);
        //         this._form.get('contaNumero')?.setValue(conta?.numero);
        //         this._form.get('contaMoedaId')?.setValue(conta?.moedaId);
        //         this._form.get('contaMoedaSimbolo')?.setValue('');
        //     }
        // });

        this._form.get('planoContaCreditoId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaPlanoContas.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                this._form.get('planoContaCreditoNumero')?.setValue((opcao.extra as PlanoConta).numero);
                this._form.get('planoContaCreditoDescricao')?.setValue((opcao.extra as PlanoConta).descricao);
            }
        });

        this._form.get('planoContaDebitoId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaPlanoContas.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                this._form.get('planoContaDebitoNumero')?.setValue((opcao.extra as PlanoConta).numero);
                this._form.get('planoContaDebitoDescricao')?.setValue((opcao.extra as PlanoConta).descricao);
            }
        });

        this._form.get('tipoId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaTipos.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                this._form.get('tipoDescricao')?.setValue(opcao.descricao);
            }
        });
    }

    cadastrarLancamento() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando lançamento...');
        const dados: MovimentacaoFinanceira = this._form.getRawValue();

        this._movimentacoesFinanceirasUseCase.cadastrarMovimentacao(dados).subscribe({
            next: (resultado) => {
                this._form.patchValue({
                    data: dayjs().format('YYYY-MM-DD'),
                    valor: 0,
                    planoContaCreditoId: '',
                    planoContaCreditoNumero: '',
                    planoContaCreditoDescricao: '',
                    planoContaDebitoId: '',
                    planoContaDebitoNumero: '',
                    planoContaDebitoDescricao: '',
                    descricao: '',
                    complemento: '',
                    tipoId: '',
                    tipoDescricao: ''
                });

                this._listaMovimentacoesBase.push({ id: resultado, data: dados.data, valor: dados.valor });
                this.atualizarListaTrabalho(this._listaMovimentacoesBase);
                this._snackbarHelper.exibirSucesso('Lançamento cadastrado com sucesso!');

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.comDados);
            }
        });
    }

    removerMovimentacao(movimentacaoId: ID) {
        const modalRef = this._modaisHelper.exibirConfirmacao('movimentacao_remover-lancamento');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo lançamento...');
            this._movimentacoesFinanceirasUseCase.removerMovimentacao(this._dados.pessoaId, this._dados.bancoId, this._dados.contaId, movimentacaoId).subscribe({
                next: () => {
                    this._listaMovimentacoesBase = this._listaMovimentacoesBase.filter((elemento) => {
                        return elemento.id !== movimentacaoId;
                    });
                    this.atualizarListaTrabalho(this._listaMovimentacoesBase);

                    this._snackbarHelper.exibirSucesso('Lançamento removido com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    atualizarListaTrabalho(dados: MovimentacaoTrabalho[]) {
        this._listaMovimentacoes = new MatTableDataSource([...dados]);
        this._listaMovimentacoes.sort = this.sort;
    }

    visualizarHistorico(movimentacao: MovimentacaoFinanceira) {
        if (movimentacao?.historico) {
            const dados: ModalTipoHistoricoDetalhe[] = movimentacao.historico.map((historico) => {
                return { data: historico.dataAlteracao, descricao: historico.descricao, usuarioNome: historico.usuarioNome, usuarioId: historico.usuarioId };
            });

            this._modaisHelper.exibirHistorico(dados);
        }
    }

    obterListas() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo pessoas...');

        const obterListaPessoas = this._pessoasUseCase.obterListaPessoas();
        const obterListaPlanoContas = this._cadastrosPlanoContaUseCase.obterListaPlanoContas();

        forkJoin([obterListaPessoas, obterListaPlanoContas]).subscribe({
            next: (resultados) => {
                this._listaPessoas = resultados[0]
                    .filter((elemento) => elemento?.id && elemento.ativo)
                    .map((elemento) => {
                        return { id: elemento.id as string, descricao: elemento.nome };
                    });

                let listagem: any[] = [];

                this.transformarArvoreEmLista(resultados[1], listagem);

                this._listaPlanoContas = listagem.map((elemento) => {
                    return { id: elemento.id as string, descricao: `${elemento.numero} - ${elemento.descricao}`, extra: elemento as PlanoConta };
                });

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    obterPessoa(id: ID) {
        this.estado.definirEstado(Estados.carregando, 'Obtendo bancos e contas...');
        this._pessoasUseCase.obterPessoa(id).subscribe({
            next: (resultado) => {
                this._pessoaDetalhe = resultado;

                this._listaBancos = this._pessoaDetalhe.bancos.map((banco) => {
                    return { id: banco.bancoId, descricao: banco.nome };
                });

                const banco = this._pessoaDetalhe.bancos.find((banco) => banco.bancoId === this._form.get('bancoId')?.value);

                if (banco) {
                    this._listaContas = banco.contas.map((conta) => {
                        return { id: conta.id as string, descricao: conta.agencia + '/' + conta.numero };
                    });
                }

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    transformarArvoreEmLista(planoConta: PlanoConta[], listagem: any[]) {
        planoConta.forEach((plano) => {
            if (listagem) {
                listagem.push({ ...plano });

                if (plano.subcontas.length == 0) {
                    return;
                } else {
                    this.transformarArvoreEmLista(plano.subcontas, listagem);
                }
            }
        });
    }

    navegarParaMovimentacoes() {
        this._navegacaoHelper.ir(ROTAS.dashboardMovimentacoes, { pessoaId: this._form.get('pessoaId')?.value });
    }
}
