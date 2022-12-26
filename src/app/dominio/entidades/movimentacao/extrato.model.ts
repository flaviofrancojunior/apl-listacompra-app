import { ID } from '@/app/dominio/entidades/sistema/types.model';

export class Lancamento {
    id: ID;
    descricao: string;
    data: string;
    numero: string;
    valor: number;
    favorecidoNome: string;
    favorecidoDocumento: string;
    extorno: boolean;

    consolidado?: boolean;
    expandido?: boolean;
}
