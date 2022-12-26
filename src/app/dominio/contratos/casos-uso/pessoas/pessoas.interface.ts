import { Pessoa, PessoaDetalhe, Resumo } from '@/app/dominio/entidades/pessoas/pessoa.model';

import { BancoPessoa } from '@/app/dominio/entidades/pessoas/banco.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Observable } from 'rxjs';

export abstract class IPessoasUseCase {
    abstract cadastrarPessoa(pessoa: Pessoa): Observable<any>;
    abstract alterarPessoa(pessoa: Pessoa): Observable<any>;
    abstract obterListaPessoas(): Observable<Pessoa[]>;
    abstract removerPessoa(pessoaId: ID): Observable<void>;

    abstract obterPessoa(id: ID): Observable<PessoaDetalhe>;
    abstract obterPessoaBancoDetalhe(pessoaId: ID, bancoId: ID): Observable<BancoPessoa | undefined>;
    abstract obterPessoaBancoContaDetalhe(pessoaId: ID, bancoId: ID, contaId: ID): Observable<Conta | undefined>;

    abstract obterResumoCadastradas(): Observable<Resumo>;
}
