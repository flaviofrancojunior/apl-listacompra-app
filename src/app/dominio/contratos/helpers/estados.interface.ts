export enum Estados {
    carregando = 'carregando',
    erro = 'erro',
    semDados = 'semDados',
    comDados = 'comDados',
    etapa1 = 'etapa1',
    etapa2 = 'etapa2',
    etapa3 = 'etapa3',
    etapa4 = 'etapa4',
    etapa5 = 'etapa5',
    etapa6 = 'etapa6',
    etapa7 = 'etapa7',
    etapa8 = 'etapa8',
    etapa9 = 'etapa9',
    etapa10 = 'etapa10'
}

export abstract class IEstadosHelper {
    spinnerId: string;
    spinnerMensagem: string;

    carregando: boolean;
    erro: boolean;
    semDados: boolean;
    comDados: boolean;
    etapa1: boolean;
    etapa2: boolean;
    etapa3: boolean;
    etapa4: boolean;
    etapa5: boolean;
    etapa6: boolean;
    etapa7: boolean;
    etapa8: boolean;
    etapa9: boolean;
    etapa10: boolean;

    abstract definirEstado(estado: keyof typeof Estados, mensagem?: string, idSpinner?: any): void;
    abstract definirCarregamentoGlobal(ativo: boolean): void;
}
