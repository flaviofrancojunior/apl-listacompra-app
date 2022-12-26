import { FormControl, ValidationErrors } from '@angular/forms';

import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Moeda } from '@/app/dominio/entidades/cadastros/moeda.model';
import { Observable } from 'rxjs';
import { ValidacaoMensagem } from '@/app/dominio/entidades/componentes/base.model';

enum MensagensValidacao {
    'required',
    'simboloInvalido3Caracteres',
    'codigoMoedaExistente',
    'codigoPaisExistente'
}

export const MensagensValidacaoMoeda: ValidacaoMensagem<keyof typeof MensagensValidacao>[] = [
    { erro: 'required', mensagem: 'Campo obrigatório.' },
    { erro: 'simboloInvalido3Caracteres', mensagem: 'Deve conter 3 caracteres.' },
    { erro: 'codigoMoedaExistente', mensagem: 'Código de moeda já cadastrado.' },
    { erro: 'codigoPaisExistente', mensagem: 'Código de país já cadastrado.' }
];

export abstract class ISistemaMoedaUseCase {
    abstract cadastrarMoeda(moeda: Moeda): Observable<any>;
    abstract alterarMoeda(moeda: Moeda): Observable<any>;
    abstract removerMoeda(moedaId: string): Observable<any>;
    abstract obterListaMoedas(): Observable<Moeda[]>;
    abstract obterListaMoedasSelect(): Observable<ListaOpcoesSelect[]>;

    abstract validarSimbolo(control: FormControl<any>): ValidationErrors | null;
    abstract validarCodigoMoeda(listaCodigos: string[]): ValidationErrors | null;
    abstract validarCodigoPaises(listaCodigos: string[]): ValidationErrors | null;
}
