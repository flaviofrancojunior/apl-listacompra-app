import { Cartao } from '@/app/dominio/entidades/pessoas/cartao.model';
import { Observable } from 'rxjs';

export abstract class IPessoasCartoesUseCase {
    abstract cadastrarCartao(cartao: Cartao): Observable<any>;
    abstract alterarCartao(cartao: Cartao): Observable<any>;
}
