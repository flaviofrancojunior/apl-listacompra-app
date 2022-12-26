import { Usuario, UsuarioBusca } from '@/app/dominio/entidades/usuario/usuario.model';

import { Observable } from 'rxjs';

export abstract class IUsuariosServico {
    abstract obterListaUsuarios(): Observable<UsuarioBusca[]>;
    abstract obterDadosUsuario(): Observable<Usuario>;
}
