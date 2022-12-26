import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { IPessoasContabilizacaoUseCase } from '@/app/dominio/contratos/casos-uso/pessoas/contabilizacao.interface';
import { IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import dayjs from 'dayjs';

@Component({
    selector: 'sfr-modais-contabilizacao',
    templateUrl: './contabilizacao.component.html',
    styleUrls: ['./contabilizacao.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisContabilizacaoComponent {
    _form: UntypedFormGroup;

    _listaControle: { data: string; status: string }[] = [];

    _listaConta: ListaOpcoesSelect[] = [
        { id: 1, descricao: 'Conta Corrente' },
        { id: 2, descricao: 'Conta Poupança' }
    ];

    _modoEdicao: boolean = false;

    @Output() cadastrarSucessoEvento = new EventEmitter();
    @Output() alterarSucessoEvento = new EventEmitter();

    constructor(@Inject(MAT_DIALOG_DATA) private _dados: ID, public dialog: MatDialog, private _formBuilder: UntypedFormBuilder, public estado: IEstadosHelper, private _pessoasContabilizacaoUseCase: IPessoasContabilizacaoUseCase) {
        this.inicializarControle(this._dados);

        if (this._modoEdicao) {
            this._form.get('id')?.addValidators(Validators.required);
            this._form.get('id')?.updateValueAndValidity();
        }
    }

    inicializarControle(pessoaId: ID) {
        this._form = this._formBuilder.group({
            pessoaId: [pessoaId, Validators.required],
            dataInicio: [{ value: dayjs().format('YYYY-MM-DD'), disabled: this._modoEdicao }, [Validators.required]],
            dataFim: [{ value: dayjs().format('YYYY-MM-DD'), disabled: this._modoEdicao }, [Validators.required]]
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    processarContabilizacao() {
        const totalDias = dayjs(this._form.get('dataFim')?.value).diff(dayjs(this._form.get('dataInicio')?.value, 'day'));

        for (let i = 0; i < totalDias; i++) {
            this._listaControle.push({
                data: dayjs(this._form.get('dataInicio')?.value).add(i, 'day').format('DD/MM/YYYY'),
                status: 'Pendente'
            });
        }

        this._listaControle.forEach((controle) => {
            controle.status = 'Processando...';
            this._pessoasContabilizacaoUseCase.executarContabilizacao(this._dados, controle.data).subscribe({
                next: () => {
                    controle.status = 'Concluído...';
                },
                error: () => {
                    controle.status = 'Falha no processamento...';
                }
            });
        });
    }
}
