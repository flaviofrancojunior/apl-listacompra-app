import { BibliotecaTags } from './tag.model';
import { Tag } from '@/app/dominio/entidades/acesso/tag.model';

export type Menu = { nomeExibicao: string; tag: keyof typeof BibliotecaTags; itens: Menu[]; detalhes?: Tag; disabled: boolean };
