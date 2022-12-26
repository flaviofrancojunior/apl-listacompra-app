import { Configuracao } from './configuracao.model';

describe('dominio:entidades:sistema:configuracao', () => {
    it('deve criar uma instância de [Configuracao]', () => {
        expect(new Configuracao()).toBeTruthy();
    });
});
