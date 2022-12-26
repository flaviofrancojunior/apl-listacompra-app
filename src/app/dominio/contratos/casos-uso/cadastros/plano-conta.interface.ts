import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Observable } from 'rxjs';
import { PlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';

export abstract class ICadastrosPlanoContaUseCase {
    abstract cadastrarPlanoConta(idRaiz: ID, idPai: ID, dados: PlanoConta): Observable<ID>;
    abstract alterarPlanoConta(idRaiz: ID, idPai: ID, idFilho: ID, dados: PlanoConta): Observable<any>;
    abstract removerPlanoConta(idRaiz: ID, idPai: ID, idFilho: ID): Observable<any>;
    abstract obterListaPlanoContas(): Observable<PlanoConta[]>;
    abstract obterListaPlanoContasSelect(): Observable<ListaOpcoesSelect[]>;
    abstract obterListaPlanoContasFlat(): Observable<PlanoConta[]>;
}
