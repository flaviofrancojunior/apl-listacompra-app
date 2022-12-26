import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';

import { Banco } from '@/app/dominio/entidades/pessoas/banco.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosBancoUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/banco.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { PessoaDetalhe } from '@/app/dominio/entidades/pessoas/pessoa.model';

export type Pesquisa = {
    pessoaId: ID;
    bancoId: ID;
    bancoNome: string;
    contaId: ID;
    data: string;
    dataInicial: string;
    dataFinal: string;
    ano: number;
    mes: number;
    contaAgencia: string;
    contaNumero: string;
    contaMoedaId: string;
    contaPlanoContaIdPadrao: ID;
};

export type CamposPesquisa = 'pessoa' | 'pessoa-banco-conta' | 'periodo' | 'dia' | 'mes';

@Component({
    selector: 'sfr-movimentacoes-panel-pessoa-pesquisa',
    templateUrl: './panel-pessoa-pesquisa.component.html',
    styleUrls: ['./panel-pessoa-pesquisa.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class MovimentacoesPanelPessoaPesquisaComponent {
    _form: FormGroup;

    _listaPessoas: ListaOpcoesSelect[] = [];
    _listaContas: ListaOpcoesSelect[] = [];
    _listaBancos: ListaOpcoesSelect[] = [];
    _listaBancosOriginal: ListaOpcoesSelect[] = [];
    //_listaMes: ListaOpcoesSelect[] = [{ id: 1, descricao: 'Janeiro' }, { id: 2, descricao: 'Fevereiro' }, 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    _listaAno: ListaOpcoesSelect[] = [];

    _pessoaDetalhe: PessoaDetalhe;

    _campos: CamposPesquisa[] = [];

    _tela: 'sincronizacao' | 'movimentacao-financeira' | 'movimentacao-contabil';
    @Input()
    public get tela(): 'sincronizacao' | 'movimentacao-financeira' | 'movimentacao-contabil' {
        return this._tela;
    }
    public set tela(value: 'sincronizacao' | 'movimentacao-financeira' | 'movimentacao-contabil') {
        this._tela = value;
        if (this._tela) {
            switch (this._tela) {
                case 'sincronizacao':
                    this._campos = ['pessoa-banco-conta', 'dia'];
                    break;
                case 'movimentacao-financeira':
                    this._campos = ['pessoa-banco-conta', 'periodo'];
                    break;
                case 'movimentacao-contabil':
                    this._campos = ['pessoa', 'periodo'];
                    break;
                default:
                    break;
            }

            this.inicializarControle();
        }
    }

    @Output() pesquisarEvento = new EventEmitter<Pesquisa>();

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _pessoasUseCase: IPessoasUseCase, private _formBuilder: UntypedFormBuilder, private _cadastrosBancoUseCase: ICadastrosBancoUseCase) {
        this.obterListaPessoas('Obtendo lista de pessoas...');
        this.obterListaBancos('Obtendo lista de bancos...');
    }

    inicializarControle() {
        this._form = this._formBuilder.group(
            {
                pessoaId: ['', Validators.required]
            },
            { validators: [this.checarDatas] }
        );

        this._campos.forEach((elemento) => {
            switch (elemento) {
                case 'pessoa-banco-conta':
                    this._form.addControl('bancoId', this._formBuilder.control({ value: '', disabled: true }, Validators.required));
                    this._form.addControl('bancoNome', this._formBuilder.control('', Validators.required));
                    this._form.addControl('contaId', this._formBuilder.control({ value: '', disabled: true }, Validators.required));
                    this._form.addControl('contaAgencia', this._formBuilder.control('', Validators.required));
                    this._form.addControl('contaNumero', this._formBuilder.control('', Validators.required));
                    this._form.addControl('contaMoedaId', this._formBuilder.control('', Validators.required));
                    this._form.addControl('contaPlanoContaIdPadrao', this._formBuilder.control(''));

                    this._form.get('pessoaId')?.valueChanges.subscribe({
                        next: (novoValor) => {
                            this._form.get('bancoId')?.setValue('');
                            this._form.get('contaId')?.setValue('');

                            if (novoValor) {
                                this.obterPessoa(novoValor);

                                this._form.get('bancoId')?.enable();
                                this._form.get('contaId')?.disable();
                            } else {
                                this._form.get('bancoId')?.disable();
                                this._form.get('contaId')?.disable();
                            }
                        }
                    });

                    this._form.get('bancoId')?.valueChanges.subscribe((novoValor) => {
                        this._form.get('contaId')?.setValue('');

                        if (novoValor) {
                            this._form.get('bancoNome')?.setValue((this._listaBancos.find((banco) => banco.id == novoValor)?.extra as Banco)?.nome);

                            const banco = this._pessoaDetalhe?.bancos?.find((banco) => banco.bancoId === novoValor);

                            if (banco) {
                                this._listaContas = banco.contas
                                    .filter((banco) => banco?.id && banco.ativo)
                                    .map((conta) => {
                                        return { id: conta.id as string, descricao: conta.agencia + '/' + conta.numero, extra: conta };
                                    });

                                this._form.get('contaId')?.enable();
                            }
                        } else {
                            this._form.get('bancoNome')?.setValue('');
                            this._form.get('contaId')?.disable();
                        }
                    });

                    this._form.get('contaId')?.valueChanges.subscribe((novoValor) => {
                        if (novoValor) {
                            const conta = this._listaContas.find((conta) => conta.id == novoValor)?.extra as Conta;
                            this._form.get('contaAgencia')?.setValue(conta?.agencia);
                            this._form.get('contaNumero')?.setValue(conta?.numero);
                            this._form.get('contaMoedaId')?.setValue(conta?.moedaId);

                            this._form.get('contaPlanoContaIdPadrao')?.setValue(conta?.planoContaId);
                        } else {
                            this._form.get('contaAgencia')?.setValue('');
                            this._form.get('contaNumero')?.setValue('');
                            this._form.get('contaMoedaId')?.setValue('');
                            this._form.get('contaPlanoContaIdPadrao')?.setValue('');
                        }
                    });
                    break;
                case 'dia':
                    var diaInicial = dayjs().subtract(1, 'd');
                    const diaSemana = diaInicial.day();

                    if (diaSemana === 0) {
                        diaInicial = diaInicial.subtract(2, 'd');
                    }
                    if (diaSemana === 6) {
                        diaInicial = diaInicial.subtract(1, 'd');
                    }

                    this._form.addControl('data', this._formBuilder.control(diaInicial.format('YYYY-MM-DD'), Validators.required));
                    break;
                case 'periodo':
                    this._form.addControl('dataInicial', this._formBuilder.control(dayjs().startOf('month').format('YYYY-MM-DD'), Validators.required));
                    this._form.addControl('dataFinal', this._formBuilder.control(dayjs().format('YYYY-MM-DD'), Validators.required));
                    break;
                case 'mes':
                    this._form.addControl('mensal', this._formBuilder.control(dayjs().format('YYYY-MM'), Validators.required));
                    break;

                default:
                    break;
            }
        });
    }

    obterListaPessoas(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._pessoasUseCase.obterListaPessoas().subscribe({
            next: (resultado) => {
                this._listaPessoas = resultado
                    .filter((elemento) => elemento?.id && elemento.ativo)
                    .map((elemento) => {
                        return { id: elemento.id as string, descricao: elemento.nome };
                    });

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    obterListaBancos(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._cadastrosBancoUseCase.obterListaBancos().subscribe({
            next: (bancos) => {
                this._listaBancos = bancos
                    .filter((bancos) => bancos?.id)
                    .map((bancos) => {
                        return { id: bancos.id as string, descricao: bancos.nome, extra: bancos };
                    });

                this._listaBancosOriginal = [...this._listaBancos];

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    obterPessoa(id: ID) {
        this.estado.definirEstado(Estados.carregando, 'Obtendo bancos e contas...');
        this._pessoasUseCase.obterPessoa(id).subscribe({
            next: (resultado) => {
                this._pessoaDetalhe = resultado;

                this._listaBancos = this._listaBancosOriginal.filter((bancoOriginal) => {
                    if (this.tela === 'sincronizacao') {
                        if ((bancoOriginal.extra as Banco).codigo !== '422') {
                            return false;
                        }
                    }

                    const buscaBancoPessoa = this._pessoaDetalhe.bancos.find((banco) => banco.bancoId === bancoOriginal.id);
                    return buscaBancoPessoa !== undefined;
                });

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    filtroFinaisSemana = (d: Dayjs | null): boolean => {
        const diaSemana = dayjs(d).day();
        const hoje = dayjs().diff(dayjs(d), 'day');
        // Prevent Saturday and Sunday from being selected.
        return diaSemana !== 0 && diaSemana !== 6 && hoje > 0;
    };

    pesquisar() {
        var dados: any = this._form.getRawValue();
        if (dados.mensal) {
            dados.ano = dados.mensal.split('-')[0];
            dados.mes = dados.mensal.split('-')[1];
        }

        this.pesquisarEvento.emit(dados);
    }

    checarDatas(group: FormGroup) {
        let dataInicial = dayjs(group.get('dataInicial')?.value);
        let dataFinal = dayjs(group.get('dataFinal')?.value);

        if (dataInicial.isValid() && dataFinal.isValid()) {
            if (dataFinal.diff(dataInicial) < 0) {
                return { DataInicialMaiorQueDataFinal: true };
            }
            return null;
        } else {
            return { FormatoInvalido: true };
        }
    }

    obterPesquisaControle(): FormGroup {
        return this._form as FormGroup;
    }
}
