import { Observable } from 'rxjs';
import { UsuarioCadastro } from '@/app/dominio/entidades/usuario/usuario.model';

export abstract class ICadastrosUsuarioUseCase {
    abstract cadastrarUsuario(cpf: string, nome: string): Observable<any>;
    abstract removerUsuario(cpf: string): Observable<any>;
    abstract obterListaUsuarios(): Observable<UsuarioCadastro[]>;
}
