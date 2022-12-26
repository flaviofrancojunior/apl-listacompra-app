import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IPessoasCartoesUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/cartoes.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ModalFormularioConfiguracaoNovoCartao, FormularioOperacao } from '@/app/dominio/contratos/helpers/modais.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { Cartao } from '@/app/dominio/entidades/pessoas/cartao.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import dayjs from 'dayjs';

@Component({
    selector: 'sfr-modais-formulario-novo-cartao',
    templateUrl: './novo-cartao.component.html',
    styleUrls: ['./novo-cartao.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovoCartaoComponent {
    _listaDias: ListaOpcoesSelect[] = [...Array(31).keys()].map((valor) => {
        return {
            id: valor + 1,
            descricao: (valor + 1).toString()
        };
    });

    _listaMeses: ListaOpcoesSelect[] = [...Array(12).keys()].map((valor) => {
        let mesExtenso = dayjs().month(valor).format('MMMM');
        return {
            id: valor + 1,
            descricao: mesExtenso.charAt(0).toUpperCase() + mesExtenso.slice(1)
        };
    });

    _listaAnos: ListaOpcoesSelect[] = [...Array(40).keys()].map((valor) => {
        return {
            id: Number(
                dayjs()
                    .set('year', dayjs().year() + valor)
                    .format('YY')
            ),
            descricao: dayjs()
                .set('year', dayjs().year() + valor)
                .format('YYYY')
        };
    });

    _form: FormGroup;

    _textos: { [chave in string]: { titulo: string; botaoPrimario: string; acao: Function } } = {
        cadastrar: {
            titulo: 'Adicionar novo cartão',
            botaoPrimario: 'Cadastrar',
            acao: () => {
                return this.cadastrarCartao();
            }
        },
        editar: {
            titulo: 'Alterar cartão',
            botaoPrimario: 'Alterar',
            acao: () => {
                return this.alterarCartao();
            }
        }
    };

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public _configuracao: ModalFormularioConfiguracaoNovoCartao,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public estado: IEstadosHelper,
        private _pessoasCartoesUseCase: IPessoasCartoesUseCase,
        private _snackbarHelper: ISnackbarHelper
    ) {
        switch (this._configuracao.operacao) {
            case FormularioOperacao.cadastrar:
                this.inicializarControle(this._configuracao.dados as ID);
                break;
            case FormularioOperacao.editar:
                this.inicializarControle((this._configuracao.dados as Cartao).pessoaId, this._configuracao.dados as Cartao);

                this._form.get('id')?.addValidators(Validators.required);
                this._form.get('id')?.updateValueAndValidity();

                this._form.get('numero')?.disable();
                this._form.get('numero')?.clearValidators();
                this._form.get('numero')?.updateValueAndValidity();
                break;
            default:
                break;
        }
    }

    inicializarControle(pessoaId: ID, cartao?: Cartao) {
        this._form = this._formBuilder.group({
            id: [cartao?.id ?? ''],
            pessoaId: [pessoaId, [Validators.required]],
            descricao: [cartao?.descricao ?? ''],
            numero: [cartao?.numero ?? '', [Validators.required]],
            validadeMes: [cartao?.validadeMes ?? '', [Validators.required]],
            validadeAno: [cartao?.validadeAno ?? '', [Validators.required]],
            vencimentoDia: [cartao?.vencimentoDia ?? '', [Validators.required]],
            bandeira: [cartao?.bandeira ?? '', [Validators.required]],
            ativo: [cartao?.ativo ?? true, [Validators.required]]
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    cadastrarCartao() {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando novo cartão...');
        const dados: Cartao = this._form.getRawValue();

        this._pessoasCartoesUseCase.cadastrarCartao(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Novo cartão adicionado com sucesso!');
                this.cadastrarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }

    alterarCartao() {
        this.estado.definirEstado(Estados.carregando, 'Alterando cartão...');
        const dados: Cartao = this._form.getRawValue();

        this._pessoasCartoesUseCase.alterarCartao(dados).subscribe({
            next: () => {
                this.dialog.closeAll();
                this._snackbarHelper.exibirSucesso('Cartão alterado com sucesso!');
                this.alterarSucessoEvento.emit();
            },
            error: (erro) => {
                this._form.setErrors({ Erro: true, message: erro.mensagem });
                this.estado.definirEstado(Estados.comDados);
                this._snackbarHelper.exibirErro(erro);
            }
        });
    }
}
