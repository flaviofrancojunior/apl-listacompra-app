import { Pessoa, PessoaDetalhe, Resumo } from '@/app/dominio/entidades/pessoas/pessoa.model';

import { Cartao } from '@/app/dominio/entidades/pessoas/cartao.model';
import { Conta } from '@/app/dominio/entidades/pessoas/conta.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { Observable } from 'rxjs';

export abstract class IPessoasServico {
    abstract obterResumoCadastradas(): Observable<Resumo>;

    abstract cadastrarPessoa(pessoa: Pessoa): Observable<any>;
    abstract alterarPessoa(pessoa: Pessoa): Observable<any>;
    abstract obterListaPessoas(): Observable<Pessoa[]>;
    abstract removerPessoa(pessoaId: ID): Observable<void>;

    abstract obterPessoa(id: ID): Observable<PessoaDetalhe>;

    abstract cadastrarConta(conta: Conta): Observable<any>;
    abstract alterarConta(conta: Conta): Observable<any>;
    abstract removerConta(pessoaId: ID, bancoId: ID, contaID: ID): Observable<any>;

    abstract cadastrarCartao(cartao: Cartao): Observable<any>;
    abstract alterarCartao(cartao: Cartao): Observable<any>;
}
