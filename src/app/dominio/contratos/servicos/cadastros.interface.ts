import { Banco } from '@/app/dominio/entidades/cadastros/banco.model';
import { HistoricoPadrao } from '@/app/dominio/entidades/cadastros/historico-padrao.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Moeda } from '@/app/dominio/entidades/cadastros/moeda.model';
import { Observable } from 'rxjs';
import { PlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';
import { PlanoContabil } from '@/app/dominio/entidades/cadastros/plano-contabil.model';
import { UsuarioCadastro } from '@/app/dominio/entidades/usuario/usuario.model';

export abstract class ICadastrosServico {
    abstract cadastrarMoeda(moeda: Moeda): Observable<any>;
    abstract alterarMoeda(moeda: Moeda): Observable<any>;
    abstract removerMoeda(moedaId: string): Observable<any>;
    abstract obterListaMoedas(): Observable<Moeda[]>;

    abstract cadastrarBanco(banco: Banco): Observable<any>;
    abstract alterarBanco(banco: Banco): Observable<any>;
    abstract removerBanco(bancoId: string): Observable<any>;
    abstract obterListaBancos(): Observable<Banco[]>;

    abstract cadastrarUsuario(cpf: string, nome: string): Observable<any>;
    abstract removerUsuario(cpf: string): Observable<any>;
    abstract obterListaUsuarios(): Observable<UsuarioCadastro[]>;

    abstract cadastrarHistoricoPadrao(historico: HistoricoPadrao): Observable<any>;
    abstract alterarHistoricoPadrao(historico: HistoricoPadrao): Observable<any>;
    abstract obterListaHistoricoPadroes(): Observable<HistoricoPadrao[]>;

    abstract cadastrarPlanoConta(idRaiz: ID, idPai: ID, dados: PlanoConta): Observable<ID>;
    abstract alterarPlanoConta(idRaiz: ID, idPai: ID, idFilho: ID, dados: PlanoConta): Observable<any>;
    abstract removerPlanoConta(idRaiz: ID, idPai: ID, idFilho: string): Observable<any>;
    abstract obterListaPlanoContas(): Observable<PlanoConta[]>;

    abstract obterListaPlanosContabeis(): Observable<PlanoContabil[]>;
}
