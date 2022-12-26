export enum BibliotecaImagens {
    'avatar_usuario-generico' = 'avatar-usuario-generico.svg',
    'brasao_safra-branco' = 'brasao-safra-branco.svg',
    'logo_fam-azul' = 'logo-fam-azul.svg',
    'logo_safra-azul' = 'logo-safra-azul.svg',
    'logo_safra-branco' = 'logo-safra-branco.svg',
    'loading-safra' = 'loading-safra.gif'
}

export type Imagem = { nome: string; nomeArquivo: string; caminho: string };

export abstract class IRepositorioImagens {
    abstract obter(chave: keyof typeof BibliotecaImagens): Imagem | undefined;
}
