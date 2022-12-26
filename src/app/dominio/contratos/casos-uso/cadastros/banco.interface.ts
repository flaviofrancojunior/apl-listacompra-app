import { Banco } from '@/app/dominio/entidades/cadastros/banco.model';
import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Observable } from 'rxjs';

export abstract class ICadastrosBancoUseCase {
    abstract cadastrarBanco(banco: Banco): Observable<any>;
    abstract alterarBanco(banco: Banco): Observable<any>;
    abstract removerBanco(bancoId: string): Observable<any>;
    abstract obterListaBancos(): Observable<Banco[]>;
    abstract obterListaBancosSelect(somenteAtivos: boolean): Observable<ListaOpcoesSelect[]>;
}
