import { Usuario } from './usuario.model';

describe('quando um usuário for criado', () => {
    it('deve existir uma instância de [Usuário]', () => {
        expect(new Usuario()).toBeTruthy();
    });
});
