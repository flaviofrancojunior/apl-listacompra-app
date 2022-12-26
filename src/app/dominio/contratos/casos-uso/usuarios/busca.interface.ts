import { Observable } from 'rxjs';
import { UsuarioBusca } from '@/app/dominio/entidades/usuario/usuario.model';

export abstract class IUsuariosBuscaUseCase {
    abstract obterListaUsuarios(): Observable<UsuarioBusca[]>;
}
