/** Modelo de um erro
 * @param codigo Código
 * @param mensagem Mensagem
 * @param detalhes Detalhes
 */
export class ErroDetalhe {
    codigo?: string;
    mensagem?: string;
    detalhes?: string;
    fluxo?: string;
}

export class ErroBase extends Error {
    codigo: string;
    mensagem: string;
    detalhes: string;
    nome: string;
    fluxo: string;

    constructor(codigo: string, mensagem: string, detalhes?: string, fluxo?: string) {
        super(mensagem);

        this.codigo = codigo;
        this.mensagem = mensagem;
        if (detalhes) {
            this.detalhes = detalhes;
        }

        this.nome = this.constructor.name;
        if (fluxo) {
            this.fluxo = fluxo;
        }

        // Capturing stack trace, excluding constructor call from it.
        //Error.captureStackTrace(this, this.constructor);
    }
}

export class ErroValidacao extends ErroBase {
    constructor(data?: ErroDetalhe) {
        super(data?.codigo ? data.codigo : 'ERRO_VALIDACAO', data?.mensagem ? data.mensagem : 'Ocorreu um erro de validação.', data?.detalhes ? data.detalhes : '', data?.fluxo);
    }
}
export class ErroNegocio extends ErroBase {
    constructor(data?: ErroDetalhe) {
        super(data?.codigo ? data.codigo : 'ERRO_NEGOCIO', data?.mensagem ? data.mensagem : 'Ocorreu um erro de negócio.', data?.detalhes ? data.detalhes : '', data?.fluxo);
    }
}
export class ErroSistema extends ErroBase {
    constructor(data?: ErroDetalhe) {
        super(data?.codigo ? data.codigo : 'ERRO_SISTEMA', data?.mensagem ? data.mensagem : 'Ocorreu um erro de inesperado de sistema', data?.detalhes ? data.detalhes : '', data?.fluxo);
    }
}
export class ErroConectividade extends ErroBase {
    constructor(data?: ErroDetalhe) {
        super(data?.codigo ? data.codigo : 'ERRO_CONECTIVIDADE', data?.mensagem ? data.mensagem : 'Ocorreu um erro de conexão', data?.detalhes ? data.detalhes : '', data?.fluxo);
    }
}

export class ErroDispositivo extends ErroBase {
    constructor(data?: ErroDetalhe) {
        super(data?.codigo ? data.codigo : 'ERRO_DISPOSITIVO', data?.mensagem ? data.mensagem : 'Ocorreu um erro no device', data?.detalhes ? data.detalhes : '', data?.fluxo);
    }
}

export type Erro = ErroValidacao | ErroNegocio | ErroSistema | ErroConectividade | ErroDispositivo;
