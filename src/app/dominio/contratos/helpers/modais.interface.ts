import { BibliotecaImagens } from '@/app/dominio/contratos/repositorios/imagens.interface';
import { CalendarioConfiguracao } from '@/app/dominio/entidades/componentes/calendario.model';
import { Historico } from '@/app/dominio/entidades/sistema/auditoria.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Parametro } from '@/app/dominio/entidades/sistema/parametro.model';

//#region Modais Informativos
export type ModalTipoInformacaoDetalhe = {
    imagemNome: keyof typeof BibliotecaImagens;
    mensagem: string;
    textoBotaoPrimario: string;
};
export type ModalTipoInformacaoDados = {
    [chave in ModalTipoInformacao]: ModalTipoInformacaoDetalhe;
};

export enum ModalTipoInformacao {}
export const BibliotecaModalTipoInformacao: ModalTipoInformacaoDados = {};
//#endregion

//#region Modais Confirmação
export type ModalTipoConfirmacaoDetalhe = {
    imagem?: string;
    titulo: string;
    mensagem: string;
    textoBotaoPrimario: string;
    textoBotaoSecundario: string;
};
export type ModalTipoConfirmacaoDados = {
    [chave in keyof typeof ModalTipoConfirmacao]: ModalTipoConfirmacaoDetalhe;
};
export enum ModalTipoConfirmacao {
    'cadastros_remover-banco',
    'cadastros_remover-moeda',
    'cadastros_remover-parametro',
    'cadastros_remover-plano-conta',
    'cadastros_remover-usuario',
    'contabilizacao_abrir-lote',
    'contabilizacao_fechar-lote',
    'movimentacao_remover-lancamento',
    'pessoas_remover-conta',
    'pessoas_remover-pessoa'
}
export const BibliotecaModalTipoConfirmacao: ModalTipoConfirmacaoDados = {
    'cadastros_remover-banco': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover esse banco?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'cadastros_remover-moeda': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover essa moeda?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'cadastros_remover-parametro': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover esse parâmetro?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'cadastros_remover-plano-conta': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover essa conta?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'cadastros_remover-usuario': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover esse usuário?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'contabilizacao_abrir-lote': {
        titulo: 'Confirmação',
        mensagem: 'Deseja abrir esse lote?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'contabilizacao_fechar-lote': {
        titulo: 'Confirmação',
        mensagem: 'Deseja fechar esse lote?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'movimentacao_remover-lancamento': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover esse lançamento?',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'pessoas_remover-conta': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover essa conta? A remoção só é possível caso não existam movimentações vinculadas à ela.',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    },
    'pessoas_remover-pessoa': {
        titulo: 'Confirmação',
        mensagem: 'Deseja remover essa pessoa? A remoção só é possível caso não existam bancos, contas e movimentações vinculadas à ela.',
        textoBotaoPrimario: 'Sim',
        textoBotaoSecundario: 'Não'
    }
};
//#endregion

//#region Modal Historico
export type ModalTipoHistoricoDetalhe = Historico;
//#endregion

export const enum ModalTipoFormularios {
    'cadastros_novo-banco',
    'cadastros_novo-historico-padrao',
    'cadastros_novo-parametro',
    'cadastros_novo-plano-conta',
    'cadastros_novo-usuario',
    'movimentacao_nova-movimentacao-financeira',
    'movimentacao_nova-movimentacao-contabil',
    'movimentacao_nova-movimentacao-contabil-detalhe',
    'pessoas_nova-conta',
    'pessoas_nova-pessoa',
    'pessoas_novo-cartao',
    'sistema_nova-moeda'
}

export type ModalFormularioConfiguracao = {
    tipo: keyof typeof ModalTipoFormularios;
    operacao: keyof typeof FormularioOperacao;
};

export type ModalFormularioConfiguracaoNovoParametro = ModalFormularioConfiguracao & { dados?: Parametro; listasValidacao?: any };

export const enum FormularioOperacao {
    'cadastrar' = 'cadastrar',
    'editar' = 'editar',
    'visualizar' = 'visualizar'
}

export abstract class IModaisHelper {
    abstract exibirInformacao(modal: keyof typeof ModalTipoInformacao): MatDialogRef<any>;
    abstract exibirConfirmacao(tipo: keyof typeof ModalTipoConfirmacao): MatDialogRef<any>;
    abstract exibirCalendario(dados: CalendarioConfiguracao): MatDialogRef<any>;
    abstract exibirFomulario(config: ModalFormularioConfiguracaoNovoParametro): MatDialogRef<any>;
    abstract fechar(): void;
}
