import { Observable } from 'rxjs';

export class RequisicaoAutenticarUsuario {
    idEstrategia: string;
    credenciais: {
        userId: string;
        password: string;
    };
}

export class RespostaAutenticarUsuario {
    token: string;
    workId: string;
    propriedades: {
        grupos: { cn: string; description: string; dn: string }[];
        usuario: {
            cn: string;
            displayName: string;
            dn: string;
            employeeID: string;
            givenName: string;
            lockoutTime: string;
            mail: string;
            pwdLastSet: string;
            sAMAccountName: string;
            sn: string;
            userAccountControl: string;
            userPrincipalName: string;
            whenCreated: string;
        };
    };
}

export abstract class IAcessoServico {
    abstract autenticarUsuario(usuario: string, chave: string): Observable<RespostaAutenticarUsuario>;
}
