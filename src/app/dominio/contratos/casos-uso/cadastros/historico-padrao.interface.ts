import { HistoricoPadrao } from '@/app/dominio/entidades/cadastros/historico-padrao.model';
import { Observable } from 'rxjs';

export abstract class ICadastrosHistoricoPadraoUseCase {
    abstract cadastrarHistoricoPadrao(historico: HistoricoPadrao): Observable<any>;
    abstract alterarHistoricoPadrao(historico: HistoricoPadrao): Observable<any>;
    abstract obterListaHistoricoPadroes(): Observable<HistoricoPadrao[]>;
}
