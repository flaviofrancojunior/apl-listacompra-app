import { CalendarioConfiguracao } from './calendario.model';

describe('dominio:componentes:calendario', () => {
    it('deve criar uma instância', () => {
        expect(new CalendarioConfiguracao()).toBeTruthy();
    });
});
