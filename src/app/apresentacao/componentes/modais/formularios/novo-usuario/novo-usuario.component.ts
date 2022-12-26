import { Component, EventEmitter, Output } from '@angular/core';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Erro } from '@/app/dominio/entidades/sistema/erro.model';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosUsuarioUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/usuario.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { IUsuariosBuscaUseCase } from '@/app/dominio/contratos/casos-uso/usuarios/busca.interface';
import { ListaOpcoesRadio } from '@/app/apresentacao/componentes/base/radio/radio.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioBusca } from '@/app/dominio/entidades/usuario/usuario.model';

@Component({
    selector: 'sfr-modais-formulario-novo-usuario',
    templateUrl: './novo-usuario.component.html',
    styleUrls: ['./novo-usuario.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class ModaisFormulariosNovoUsuarioComponent {
    _form: FormGroup;

    _listaUsuarios: UsuarioBusca[] = [];
    _listaFiltrada: UsuarioBusca[] = [];

    _listaExibicao: ListaOpcoesRadio[] = [];
    _listaExibicaoMaximoElementos: number = 20;

    @Output() cadastrarSucessoEvento = new EventEmitter();

    constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, public estado: IEstadosHelper, private _usuariosBuscaUseCase: IUsuariosBuscaUseCase, private _snackbarHelper: ISnackbarHelper, private _cadastrosUsuarioUseCase: ICadastrosUsuarioUseCase) {
        this.obterListaUsuariosBusca();
        this.inicializarControle();
    }

    inicializarControle() {
        this._form = this._formBuilder.group({
            pesquisa: [''],
            cpf: ['', [Validators.required]]
        });

        this._form.get('pesquisa')?.valueChanges.subscribe((pesquisa) => {
            this._listaExibicaoMaximoElementos = 20;
            this._form.get('matriculaSelecionada')?.setValue('');

            if (pesquisa) {
                this.estado.definirEstado(Estados.carregando, 'Filtrando lista de usuários...');

                this._listaFiltrada = this._listaUsuarios.filter((elemento) => {
                    return elemento?.nome?.toLowerCase()?.includes(pesquisa.toLowerCase()) || elemento?.matricula?.includes(pesquisa.toLowerCase()) || elemento?.cpf?.includes(pesquisa.toLowerCase());
                });

                this._listaExibicao = this.construirListaExibicao(this._listaFiltrada);
            } else {
                this.estado.definirEstado(Estados.carregando, 'Filtrando lista de usuários...');
                Object.assign(this._listaExibicao, this.construirListaExibicao(this._listaUsuarios));
            }

            this.estado.definirEstado(Estados.comDados);
        });
    }

    construirListaExibicao(listaUsuarios: UsuarioBusca[]): ListaOpcoesRadio[] {
        return listaUsuarios.map((usuario) => {
            return { id: usuario.cpf, descricao: usuario.nome, descricaoDetalhe: `Matrícula: ${usuario.matricula} - CPF: ${usuario.cpf}` };
        });
    }

    obterListaUsuariosBusca() {
        this.estado.definirEstado(Estados.carregando, 'Obtendo lista de usuários...');
        this._usuariosBuscaUseCase.obterListaUsuarios().subscribe({
            next: (usuarios) => {
                this._listaUsuarios = usuarios;
                this._listaExibicao = this.construirListaExibicao(usuarios);
                this.estado.definirEstado(Estados.comDados);
            },
            error: (erro) => {
                this._listaExibicao = [];
                this._snackbarHelper.exibirErro(erro);
                this.estado.definirEstado(Estados.erro);
            }
        });
    }

    cancelar() {
        this.dialog.closeAll();
    }

    incluirUsuario() {
        this.estado.definirEstado(Estados.carregando, 'Incluindo usuário...');
        const usuario = this._listaUsuarios.find((usuario) => usuario.cpf == this._form.get('cpf')?.value);
        if (usuario) {
            this._cadastrosUsuarioUseCase.cadastrarUsuario(usuario?.cpf, usuario.nome).subscribe({
                next: () => {
                    this.dialog.closeAll();
                    this._snackbarHelper.exibirSucesso('Usuário incluído com sucesso!');
                    this.cadastrarSucessoEvento.emit();
                },
                error: (erro) => {
                    this._form.setErrors({ Erro: true, message: erro.mensagem });
                    this.estado.definirEstado(Estados.comDados);
                    this._snackbarHelper.exibirErro(erro);
                }
            });
        } else {
            console.error('Ocorreu um erro ao encontrar o usuário selecionado na listagem.');
        }
    }

    observarRolagem(evento: any) {
        if (evento.target.offsetHeight + evento.target.scrollTop >= evento.target.scrollHeight - 56) {
            if (this._listaExibicao.length >= this._listaExibicaoMaximoElementos) {
                this._listaExibicaoMaximoElementos = this._listaExibicaoMaximoElementos + 20;
            } else {
                this._listaExibicaoMaximoElementos = this._listaExibicao.length;
            }
        }
    }
}
