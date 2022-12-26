import { ID } from '@/app/dominio/entidades/sistema/types.model';

export class PlanoConta {
    id: ID;
    numero: string;
    grau: number;
    descricao: string;
    tipoId: typeof TipoPlanoConta | null;
    tipoDescricao: string;
    responsabilidadeId: typeof ResponsabilidadePlanoConta | null;
    responsabilidadeDescricao: string;
    subcontas: PlanoConta[];
    indice?: number;
    idPai?: ID;
}

export enum TipoPlanoConta {
    'Ativo' = 1,
    'Passivo' = 2,
    'Receita' = 3,
    'Despesa' = 4
}

export enum ResponsabilidadePlanoConta {
    'Credor' = 1,
    'Devedor' = 2
}
