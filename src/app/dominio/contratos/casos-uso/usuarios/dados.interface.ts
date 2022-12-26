import { Observable } from 'rxjs';
import { Usuario } from '@/app/dominio/entidades/usuario/usuario.model';

export abstract class IUsuariosDadosUseCase {
    abstract obterUsuario(): Observable<Usuario>;
}
