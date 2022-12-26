import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Observable } from 'rxjs';

export abstract class IPessoasContasUseCase {
    abstract cadastrarConta(conta: Conta): Observable<any>;
    abstract alterarConta(conta: Conta): Observable<any>;
    abstract removerConta(pessoaId: ID, bancoId: ID, contaId: ID): Observable<void>;
}
