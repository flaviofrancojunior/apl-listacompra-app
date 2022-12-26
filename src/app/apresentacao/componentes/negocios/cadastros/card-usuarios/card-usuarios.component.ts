import { Component, ViewChild } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormularioOperacao, IModaisHelper } from '@/app/dominio/contratos/helpers/modais.interface';

import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { Filtro } from '@/app/apresentacao/componentes/base/table/filter/filter.component';
import { ICadastrosUsuarioUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/usuario.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'sfr-cadastros-card-usuarios',
    templateUrl: './card-usuarios.component.html',
    styleUrls: ['./card-usuarios.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class CadastrosCardUsuariosComponent {
    _colunasExibidas: string[] = ['nome', 'matricula', 'login', 'cargo', 'acao-1'];
    _filtrosExibidos: Filtro[] = [
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Nome', placeholder: 'Busque um nome', filtroGlobal: false, colunaFiltrada: 'nome', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Matrícula', placeholder: 'Busque uma matrícula', filtroGlobal: false, colunaFiltrada: 'matricula', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Usuário', placeholder: 'Busque um usuário', filtroGlobal: false, colunaFiltrada: 'login', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'busca', titulo: '', placeholder: 'Pesquisar', filtroGlobal: true, colunaFiltrada: '', opcoes: [] },
        { tipo: 'input', tipoDetalhe: 'texto', titulo: 'Cargo', placeholder: 'Busque um cargo', filtroGlobal: false, colunaFiltrada: 'cargo', opcoes: [] }
    ];
    _listaUsuarios: MatTableDataSource<any>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(public estado: IEstadosHelper, private _cadastrosUsuarioUseCase: ICadastrosUsuarioUseCase, private _snackbarHelper: ISnackbarHelper, private _modaisHelper: IModaisHelper) {
        this.obterListaUsuarios('Obtendo lista de usuários...');
    }

    incluirUsuario() {
        const modalRef = this._modaisHelper.exibirFomulario({
            tipo: 'cadastros_novo-usuario',
            operacao: FormularioOperacao.cadastrar
        });

        modalRef.componentInstance.cadastrarSucessoEvento.subscribe(() => {
            this.obterListaUsuarios('Atualizando lista de usuários...');
        });
    }

    removerUsuario(cpf: string) {
        const modalRef = this._modaisHelper.exibirConfirmacao('cadastros_remover-usuario');

        modalRef.componentInstance.confirmarEvento.subscribe(() => {
            this.estado.definirEstado(Estados.carregando, 'Removendo usuário...');
            this._cadastrosUsuarioUseCase.removerUsuario(cpf).subscribe({
                next: () => {
                    this._snackbarHelper.exibirSucesso('Usuário removido com sucesso!');
                    this.estado.definirEstado(Estados.comDados);
                    this.obterListaUsuarios('Atualizando lista de usuários...');
                },
                error: (erro) => {
                    this._snackbarHelper.exibirErro(erro);
                    this.estado.definirEstado(Estados.comDados);
                }
            });
        });
    }

    obterListaUsuarios(mensagemCarregamento: string) {
        this.estado.definirEstado(Estados.carregando, mensagemCarregamento);
        this._cadastrosUsuarioUseCase.obterListaUsuarios().subscribe({
            next: (resultado) => {
                this._listaUsuarios = new MatTableDataSource([...resultado]);
                this._listaUsuarios.sort = this.sort;

                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }
}
