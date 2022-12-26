import { Component, EventEmitter, Output } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IPessoasUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/pessoas.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Pesquisa } from './../../movimentacoes/panel-pessoa-pesquisa/panel-pessoa-pesquisa.component';
import dayjs from 'dayjs';

@Component({
    selector: 'sfr-contabilizacao-panel-pessoa-pesquisa',
    templateUrl: './panel-pessoa-pesquisa.component.html',
    styleUrls: ['./panel-pessoa-pesquisa.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ContabilizacaoPanelPessoaPesquisaComponent {
    _form: UntypedFormGroup;

    _listaPessoas: ListaOpcoesSelect[];

    @Output() pesquisarEvento = new EventEmitter<any>();

    constructor(public estado: IEstadosHelper, private _snackbarHelper: ISnackbarHelper, private _pessoasUseCase: IPessoasUseCase, private _formBuilder: UntypedFormBuilder) {
        this.inicializarControle();
        this.obterListaPessoas('Obtendo lista de pessoas...');
    }

    inicializarControle() {
        this._form = this._formBuilder.group(
            {
                pessoaId: ['', Validators.required],
                dataInicial: [dayjs().startOf('month').format('YYYY-MM-DD'), Validators.required],
                dataFinal: [dayjs().format('YYYY-MM-DD'), Validators.required]
            },
            { validators: [this.checarDatas] }
        );
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

    pesquisar() {
        this.pesquisarEvento.emit({ pessoaId: this._form.get('pessoaId')?.value, dataInicial: this._form.get('dataInicial')?.value, dataFinal: this._form.get('dataFinal')?.value });
    }

    checarDatas(group: UntypedFormGroup) {
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
}
