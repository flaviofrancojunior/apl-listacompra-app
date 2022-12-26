import { ErroConectividade, ErroDetalhe, ErroDispositivo, ErroNegocio, ErroSistema, ErroValidacao } from './erro.model';

describe('quando um erro de validacao for criado', () => {
    it('deve ser do tipo [ErroValidacao]', () => {
        const erro = new ErroValidacao();
        expect(erro).toBeInstanceOf(Error);
    });
    it('deve conter os parâmetros default na ausência de parâmetros', () => {
        const erro = new ErroValidacao();

        expect(erro).toBeTruthy();
        expect(erro.codigo).toBe('ERRO_VALIDACAO');
    });
    it('deve conter os parâmetros customizados na presença de parâmetros', () => {
        const dados: ErroDetalhe = { codigo: 'CODIGO_TESTE', mensagem: 'Mensagem Teste', detalhes: 'Detalhes teste' };

        const erro = new ErroValidacao(dados);

        expect(erro.codigo).toBe(dados.codigo);
        expect(erro.mensagem).toBe(dados.mensagem);
        expect(erro.detalhes).toBe(dados.detalhes);
    });
});

describe('quando um erro de negócio for criado', () => {
    it('deve ser do tipo [ErroNegocio]', () => {
        const erro = new ErroNegocio();
        expect(erro).toBeInstanceOf(Error);
    });
    it('deve conter os parâmetros default na ausência de parâmetros', () => {
        const erro = new ErroNegocio();

        expect(erro).toBeTruthy();
        expect(erro.codigo).toBe('ERRO_NEGOCIO');
    });
    it('deve conter os parâmetros customizados na presença de parâmetros', () => {
        const dados: ErroDetalhe = { codigo: 'CODIGO_TESTE', mensagem: 'Mensagem Teste', detalhes: 'Detalhes teste' };

        const erro = new ErroNegocio(dados);

        expect(erro.codigo).toBe(dados.codigo);
        expect(erro.mensagem).toBe(dados.mensagem);
        expect(erro.detalhes).toBe(dados.detalhes);
    });
});

describe('quando um erro de sistema for criado', () => {
    it('deve ser do tipo [ErroSistema]', () => {
        const erro = new ErroSistema();
        expect(erro).toBeInstanceOf(Error);
    });
    it('deve conter os parâmetros default na ausência de parâmetros', () => {
        const erro = new ErroSistema();

        expect(erro).toBeTruthy();
        expect(erro.codigo).toBe('ERRO_SISTEMA');
    });
    it('deve conter os parâmetros customizados na presença de parâmetros', () => {
        const dados: ErroDetalhe = { codigo: 'CODIGO_TESTE', mensagem: 'Mensagem Teste', detalhes: 'Detalhes teste' };

        const erro = new ErroSistema(dados);

        expect(erro.codigo).toBe(dados.codigo);
        expect(erro.mensagem).toBe(dados.mensagem);
        expect(erro.detalhes).toBe(dados.detalhes);
    });
});

describe('quando um erro de conectividade for criado', () => {
    it('deve ser do tipo [ErroConectividade]', () => {
        const erro = new ErroConectividade();
        expect(erro).toBeInstanceOf(Error);
    });
    it('deve conter os parâmetros default na ausência de parâmetros', () => {
        const erro = new ErroConectividade();

        expect(erro).toBeTruthy();
        expect(erro.codigo).toBe('ERRO_CONECTIVIDADE');
    });
    it('deve conter os parâmetros customizados na presença de parâmetros', () => {
        const dados: ErroDetalhe = { codigo: 'CODIGO_TESTE', mensagem: 'Mensagem Teste', detalhes: 'Detalhes teste' };

        const erro = new ErroConectividade(dados);

        expect(erro.codigo).toBe(dados.codigo);
        expect(erro.mensagem).toBe(dados.mensagem);
        expect(erro.detalhes).toBe(dados.detalhes);
    });
});

describe('quando um erro de dispositivo for criado', () => {
    it('deve ser do tipo [ErroDispositivo]', () => {
        const erro = new ErroDispositivo();
        expect(erro).toBeInstanceOf(Error);
    });
    it('deve conter os parâmetros default na ausência de parâmetros', () => {
        const erro = new ErroDispositivo();

        expect(erro).toBeTruthy();
        expect(erro.codigo).toBe('ERRO_DISPOSITIVO');
    });
    it('deve conter os parâmetros customizados na presença de parâmetros', () => {
        const dados: ErroDetalhe = { codigo: 'CODIGO_TESTE', mensagem: 'Mensagem Teste', detalhes: 'Detalhes teste' };

        const erro = new ErroDispositivo(dados);

        expect(erro.codigo).toBe(dados.codigo);
        expect(erro.mensagem).toBe(dados.mensagem);
        expect(erro.detalhes).toBe(dados.detalhes);
    });
});
