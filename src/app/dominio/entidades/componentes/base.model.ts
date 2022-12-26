export class Propriedades {
    [chave: string]: string[];
}

export class ValidacaoMensagem<R> {
    erro: R;
    mensagem: string;
}
