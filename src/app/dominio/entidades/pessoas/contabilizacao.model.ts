import { ID } from './../sistema/types.model';

export class Lote {
    id?: ID;
    numero: string;
    data: string;
    tipoId: LoteTipo;
    tipoDescricao: string;
    total: number;
    totalLancado: number;
    saldoFaltante: number;
    totalDebitos: number;
    totalCreditos: number;
    dataFechamento: string | null;
    aberto: boolean;
    historico: {
        dataAlteracao: string;
        descricao: string;
        usuarioId: string;
        usuarioNome: string;
    }[];
}

export enum LoteTipo {
    automatico = 1,
    manual = 2
}
