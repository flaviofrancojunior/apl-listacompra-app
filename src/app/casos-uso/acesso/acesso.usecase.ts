import { BibliotecaTags, TAGS, Tag } from '@/app/dominio/entidades/acesso/tag.model';
import { IArmazenamentoServico, Local } from '@/app/dominio/contratos/repositorios/armazenamento.interface';
import { INavegacaoHelper, ROTAS } from '@/app/dominio/contratos/helpers/navegacao.interface';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { IAcessoServico } from '@/app/dominio/contratos/servicos/acesso.interface';
import { IAcessoUseCase } from '@/app/dominio/contratos/casos-uso/acesso/acesso.interface';
import { IConfiguracaoHelper } from '@/app/dominio/contratos/helpers/configuracao.interface';
import { IParametrosUseCase } from '@/app/dominio/contratos/casos-uso/sistema/parametros.interface';
import { IUsuariosServico } from '@/app/dominio/contratos/servicos/usuarios.interface';
import { Injectable } from '@angular/core';
import { Menu } from '@/app/dominio/entidades/acesso/menu.model';
import { Usuario } from '@/app/dominio/entidades/usuario/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AcessoUseCase implements IAcessoUseCase {
    constructor(
        private _armazenamentoServico: IArmazenamentoServico,
        private _acessoServico: IAcessoServico,
        private _usuariosServico: IUsuariosServico,
        private _configuracaoHelper: IConfiguracaoHelper,
        private _navegacaoHelper: INavegacaoHelper,
        private _parametrosUseCase: IParametrosUseCase
    ) {}

    autenticarUsuario(usuario: string, chave: string, lembrarUsuario: boolean): Observable<any> {
        this._armazenamentoServico.remover('usuario-logado', Local.memoria);
        this._armazenamentoServico.remover('token', Local.sessao);
        this._armazenamentoServico.remover('work-id', Local.sessao);
        this._armazenamentoServico.remover('family-key', Local.sessao);

        return this._acessoServico.autenticarUsuario(usuario, chave).pipe(
            map((resultado) => {
                if (lembrarUsuario) {
                    this._armazenamentoServico.definir('usuario', usuario, Local.local);
                } else {
                    this._armazenamentoServico.remover('usuario', Local.local);
                }

                this._armazenamentoServico.definir('usuario-logado', true, Local.memoria);
                this._armazenamentoServico.definir('token', resultado.token, Local.sessao);
                this._armazenamentoServico.definir('work-id', resultado.workId, Local.sessao);
                this._armazenamentoServico.definir('family-key', this._configuracaoHelper.configuracao.chaveFamilia || '', Local.sessao);
                return resultado;
            }),
            catchError((erro) => {
                return throwError(() => erro);
            })
        );
    }

    deslogarUsuario(): void {
        const correlationId = this._armazenamentoServico.obter('correlation-id', Local.sessao);
        this._armazenamentoServico.limpar(Local.memoria);
        this._armazenamentoServico.limpar(Local.sessao);
        if (correlationId) {
            this._armazenamentoServico.definir('correlation-id', correlationId, Local.sessao);
        }

        this._navegacaoHelper.ir(ROTAS.login);
    }

    obterUsuarioGuardado(): string {
        return this._armazenamentoServico.existe('usuario', Local.local) ? this._armazenamentoServico.obter('usuario', Local.local) : undefined;
    }

    obterUsuarioLogado(): Observable<Usuario> {
        if (!this._armazenamentoServico.existe('usuario-logado-dados', Local.memoria)) {
            return this._usuariosServico.obterDadosUsuario().pipe(
                map((usuario) => {
                    if (usuario) {
                        this._armazenamentoServico.definir('usuario-logado-dados', usuario, Local.memoria);
                    }

                    return usuario;
                })
            );
        } else {
            return of(this._armazenamentoServico.obter('usuario-logado-dados', Local.memoria));
        }
    }

    validarLogin(): boolean {
        return this._armazenamentoServico.existe('usuario-logado', Local.memoria);
    }

    obterTag(tag: keyof typeof BibliotecaTags): Tag {
        return TAGS[tag];
    }

    executarAcesso(tag: Tag): void {
        if (tag?.rota) {
            this._navegacaoHelper.ir(tag.rota);
        }

        if (tag?.funcao) {
            switch (tag.funcao) {
                case 'acao1':
                    break;
                default:
                    break;
            }
        }
    }

    obterMenu(): Observable<Menu[]> {
        const menu: Menu[] = [
            {
                nomeExibicao: 'Início',
                tag: 'dashboard',
                itens: [],
                disabled: false
            },
            {
                nomeExibicao: 'Cadastros',
                tag: 'dashboardCadastros',
                itens: [
                    {
                        nomeExibicao: 'Bancos',
                        tag: 'dashboardCadastrosBancos',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Usuários',
                        tag: 'dashboardCadastrosUsuarios',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Plano de Contas',
                        tag: 'dashboardCadastrosPlanoContas',
                        itens: [],
                        disabled: false
                    }
                ],
                disabled: false
            },
            {
                nomeExibicao: 'Pessoas',
                tag: 'dashboardPessoas',
                itens: [],
                disabled: false
            },
            {
                nomeExibicao: 'Movimentações',
                tag: 'dashboardMovimentacoes',
                itens: [
                    {
                        nomeExibicao: 'Sincronização',
                        tag: 'dashboardMovimentacoesSincronizacao',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Financeiras',
                        tag: 'dashboardMovimentacoesFinanceiras',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Contábeis',
                        tag: 'dashboardMovimentacoesContabeis',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Lotes',
                        tag: 'dashboardMovimentacoesLotes',
                        itens: [],
                        disabled: false
                    }
                ],
                disabled: false
            },
            {
                nomeExibicao: 'Relatórios',
                tag: 'dashboardRelatorios',
                itens: [
                    {
                        nomeExibicao: 'Início',
                        tag: 'dashboardRelatorios',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Balanço (Em construção)',
                        tag: 'dashboardRelatoriosBalanco',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Balanço Consolidado (Em construção)',
                        tag: 'dashboardRelatoriosBalancoConsolidado',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Diário (Em construção)',
                        tag: 'dashboardRelatoriosDiario',
                        itens: [],
                        disabled: false
                    },
                    {
                        nomeExibicao: 'Razão (Em construção)',
                        tag: 'dashboardRelatoriosRazao',
                        itens: [],
                        disabled: false
                    }
                ],
                disabled: false
            }
        ];

        this.construirMenu(menu);

        return of(menu);
    }

    construirMenu(menu: Menu[]) {
        menu.forEach((menu) => {
            const tagDados = this.obterTag(menu.tag);
            if (tagDados) {
                menu.detalhes = tagDados;
                if (menu.nomeExibicao === '') {
                    menu.nomeExibicao = menu.detalhes.nomeExibicao;
                }
                menu.disabled = !tagDados.rota && !tagDados.funcao;
            }

            if (menu.itens.length === 0) {
                return;
            } else {
                this.construirMenu(menu.itens);
            }
        });
    }
}
