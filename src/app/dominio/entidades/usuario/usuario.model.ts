/** Modelo de um usuário
 * @param cargo Cargo
 * @param cpf CPF
 * @param departamento Departamento
 * @param email E-mail
 * @param fotoBase64 Foto (em Base64)
 * @param nome Nome
 * @param sexo Sexo
 * @param telefone Telefone
 */
export class Usuario {
    cargo: string;
    cpf: string;
    departamento: string;
    email: string;
    fotoBase64: string;
    nome: string;
    sexo: string;
    telefone: string;
}

export class UsuarioBusca {
    cpf: string;
    matricula: string;
    nome: string;
}

export class UsuarioCadastro {
    cargo: string;
    cpf: string;
    login: string;
    matricula: string;
    nome: string;
}
