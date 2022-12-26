import {
    BibliotecaModalTipoConfirmacao,
    IModaisHelper,
    ModalFormularioConfiguracaoNovaConta,
    ModalFormularioConfiguracaoNovaMoeda,
    ModalFormularioConfiguracaoNovaMovimentacaoContabil,
    ModalFormularioConfiguracaoNovaMovimentacaoContabilDetalhe,
    ModalFormularioConfiguracaoNovaMovimentacaoFinanceira,
    ModalFormularioConfiguracaoNovaPessoa,
    ModalFormularioConfiguracaoNovoBanco,
    ModalFormularioConfiguracaoNovoCartao,
    ModalFormularioConfiguracaoNovoParametro,
    ModalFormularioConfiguracaoNovoPlanoConta,
    ModalTipoConfirmacao,
    ModalTipoHistoricoDetalhe,
    ModalTipoInformacao
} from '@/app/dominio/contratos/helpers/modais.interface';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { CalendarioConfiguracao } from '@/app/dominio/entidades/componentes/calendario.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Injectable } from '@angular/core';
import { ModaisConfirmacaoComponent } from '@/app/apresentacao/componentes/modais/confirmacao/confirmacao.component';
import { ModaisContabilizacaoComponent } from '../componentes/modais/contabilizacao/contabilizacao.component';
import { ModaisFormulariosNovaContaComponent } from '@/app/apresentacao/componentes/modais/formularios/nova-conta/nova-conta.component';
import { ModaisFormulariosNovaMoedaComponent } from '@/app/apresentacao/componentes/modais/formularios/nova-moeda/nova-moeda.component';
import { ModaisFormulariosNovaMovimentacaoContabilComponent } from '../componentes/modais/formularios/nova-movimentacao-contabil/nova-movimentacao-contabil.component';
import { ModaisFormulariosNovaMovimentacaoContabilDetalheComponent } from '../componentes/modais/formularios/nova-movimentacao-contabil-detalhe/nova-movimentacao-contabil-detalhe.component';
import { ModaisFormulariosNovaMovimentacaoFinanceiraComponent } from '../componentes/modais/formularios/nova-movimentacao-financeira/nova-movimentacao-financeira.component';
import { ModaisFormulariosNovaPessoaComponent } from '@/app/apresentacao/componentes/modais/formularios/nova-pessoa/nova-pessoa.component';
import { ModaisFormulariosNovoBancoComponent } from '@/app/apresentacao/componentes/modais/formularios/novo-banco/novo-banco.component';
import { ModaisFormulariosNovoCartaoComponent } from '@/app/apresentacao/componentes/modais/formularios/novo-cartao/novo-cartao.component';
import { ModaisFormulariosNovoHistoricoPadraoComponent } from '@/app/apresentacao/componentes/modais/formularios/novo-historico-padrao/novo-historico-padrao.component';
import { ModaisFormulariosNovoParametroComponent } from '@/app/apresentacao/componentes/modais/formularios/novo-parametro/novo-parametro.component';
import { ModaisFormulariosNovoPlanoContaComponent } from '../componentes/modais/formularios/novo-plano-conta/novo-plano-conta.component';
import { ModaisFormulariosNovoUsuarioComponent } from '@/app/apresentacao/componentes/modais/formularios/novo-usuario/novo-usuario.component';
import { ModaisHistoricoComponent } from '../componentes/modais/historico/historico.component';
import { ModaisInformacaoComponent } from '@/app/apresentacao/componentes/modais/informacao/informacao.component';

@Injectable({ providedIn: 'root' })
export class ModaisHelper implements IModaisHelper {
    modalRef: MatDialogRef<any>;

    constructor(public dialog: MatDialog) {}

    exibirInformacao(tipo: keyof typeof ModalTipoInformacao): MatDialogRef<any, any> {
        this.modalRef = this.dialog.open(ModaisInformacaoComponent, {
            data: tipo,
            disableClose: true,
            minWidth: '300px'
        });

        return this.modalRef;
    }
    exibirConfirmacao(tipo: keyof typeof ModalTipoConfirmacao): MatDialogRef<any, any> {
        this.modalRef = this.dialog.open(ModaisConfirmacaoComponent, {
            data: BibliotecaModalTipoConfirmacao[tipo],
            disableClose: true,
            width: '400px',
            panelClass: 'modal-base-container'
        });

        return this.modalRef;
    }
    exibirHistorico(dados: ModalTipoHistoricoDetalhe[]): MatDialogRef<any, any> {
        this.modalRef = this.dialog.open(ModaisHistoricoComponent, {
            data: dados,
            disableClose: true,
            minWidth: '400px',
            autoFocus: false
        });

        return this.modalRef;
    }

    exibirContabilizacao(pessoaId: ID): MatDialogRef<any, any> {
        this.modalRef = this.dialog.open(ModaisContabilizacaoComponent, {
            data: pessoaId,
            disableClose: true,
            minWidth: '300px',
            autoFocus: false
        });

        return this.modalRef;
    }

    exibirCalendario(dados: CalendarioConfiguracao): MatDialogRef<any, any> {
        throw new Error('Method not implemented.');
    }

    exibirFomulario(
        config:
            | ModalFormularioConfiguracaoNovaMoeda
            | ModalFormularioConfiguracaoNovoBanco
            | ModalFormularioConfiguracaoNovoParametro
            | ModalFormularioConfiguracaoNovaPessoa
            | ModalFormularioConfiguracaoNovoCartao
            | ModalFormularioConfiguracaoNovaConta
            | ModalFormularioConfiguracaoNovoPlanoConta
            | ModalFormularioConfiguracaoNovaMovimentacaoFinanceira
            | ModalFormularioConfiguracaoNovaMovimentacaoContabil
            | ModalFormularioConfiguracaoNovaMovimentacaoContabilDetalhe
    ): MatDialogRef<any, any> {
        var configuracao: MatDialogConfig = {
            data: {
                operacao: config.operacao ?? '',
                dados: config.dados,
                listasValidacao: config.listasValidacao ?? []
            },
            disableClose: true,
            panelClass: 'modal-base-container'
        };

        switch (config.tipo) {
            case 'sistema_nova-moeda':
                this.modalRef = this.dialog.open(ModaisFormulariosNovaMoedaComponent, configuracao);
                break;
            case 'cadastros_novo-banco':
                this.modalRef = this.dialog.open(ModaisFormulariosNovoBancoComponent, configuracao);
                break;
            case 'cadastros_novo-historico-padrao':
                this.modalRef = this.dialog.open(ModaisFormulariosNovoHistoricoPadraoComponent, configuracao);
                break;
            case 'cadastros_novo-parametro':
                this.modalRef = this.dialog.open(ModaisFormulariosNovoParametroComponent, configuracao);
                break;
            case 'cadastros_novo-plano-conta':
                this.modalRef = this.dialog.open(ModaisFormulariosNovoPlanoContaComponent, configuracao);
                break;
            case 'cadastros_novo-usuario':
                this.modalRef = this.dialog.open(ModaisFormulariosNovoUsuarioComponent, configuracao);
                break;
            case 'pessoas_nova-pessoa':
                this.modalRef = this.dialog.open(ModaisFormulariosNovaPessoaComponent, configuracao);
                break;
            case 'pessoas_nova-conta':
                this.modalRef = this.dialog.open(ModaisFormulariosNovaContaComponent, configuracao);
                break;
            case 'pessoas_novo-cartao':
                this.modalRef = this.dialog.open(ModaisFormulariosNovoCartaoComponent, configuracao);
                break;
            case 'movimentacao_nova-movimentacao-financeira':
                this.modalRef = this.dialog.open(ModaisFormulariosNovaMovimentacaoFinanceiraComponent, configuracao);
                break;
            case 'movimentacao_nova-movimentacao-contabil':
                this.modalRef = this.dialog.open(ModaisFormulariosNovaMovimentacaoContabilComponent, configuracao);
                break;
            case 'movimentacao_nova-movimentacao-contabil-detalhe':
                configuracao.panelClass = 'modal-drawer-right';
                configuracao.height = '100vh';
                this.modalRef = this.dialog.open(ModaisFormulariosNovaMovimentacaoContabilDetalheComponent, configuracao);
                break;

            default:
                break;
        }

        return this.modalRef;
    }

    fechar(): void {
        this.dialog.closeAll();
    }
}
