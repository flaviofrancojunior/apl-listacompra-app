import { Observable } from 'rxjs';
import { PlanoContabil } from '@/app/dominio/entidades/cadastros/plano-contabil.model';

export abstract class ICadastrosPlanoContabilUseCase {
    abstract obterListaPlanosContabeis(): Observable<PlanoContabil[]>;
}
