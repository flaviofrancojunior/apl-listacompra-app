import { BibliotecaTags, Tag } from '@/app/dominio/entidades/acesso/tag.model';

import { Menu } from '@/app/dominio/entidades/acesso/menu.model';
import { Observable } from 'rxjs';
import { Usuario } from '@/app/dominio/entidades/usuario/usuario.model';

export abstract class IAcessoUseCase {
    abstract autenticarUsuario(usuario: string, chave: string, lembrarUsuario: boolean): Observable<any>;
    abstract deslogarUsuario(): void;
    abstract obterUsuarioGuardado(): string;
    abstract obterUsuarioLogado(): Observable<Usuario>;
    abstract validarLogin(): boolean;

    abstract obterTag(tag: keyof typeof BibliotecaTags): Tag;
    abstract executarAcesso(tag: Tag): void;

    abstract obterMenu(): Observable<Menu[]>;
}
