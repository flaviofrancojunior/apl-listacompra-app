import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

/* eslint-disable @angular-eslint/directive-selector */

export class Filtro {
    tipo: 'input' | 'select';
    tipoDetalhe?: 'texto' | 'busca' | 'data' | '';
    titulo?: string;
    placeholder: string;
    filtroGlobal: boolean;
    colunaFiltrada: string;
    pesquisa?: string;
    opcoes: ListaOpcoesSelect[];
}

@Component({
    selector: 'sfr-table-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class TableFilterComponent implements OnInit {
    _form: UntypedFormGroup;

    @Input() config: Filtro[];

    _dadosTabela: MatTableDataSource<any>;
    @Input()
    public get dadosTabela(): MatTableDataSource<any> {
        return this._dadosTabela;
    }
    public set dadosTabela(value: MatTableDataSource<any>) {
        this._dadosTabela = value;

        if (this._dadosTabela) {
            this.config.forEach((elemento) => {
                if (elemento.tipo == 'select') {
                    let opcoes: any[] = [];

                    this._dadosTabela.data.forEach((dados: any) => {
                        opcoes.push(dados[elemento.colunaFiltrada as keyof any]);
                    });

                    opcoes.sort();

                    opcoes = [...new Set(opcoes)];

                    elemento.opcoes = opcoes.map((elemento) => {
                        return { id: elemento, descricao: elemento };
                    });
                }
            });

            this.aplicarFiltroColuna(this._form.get('filtros')?.value);
        }
    }

    constructor(private _formBuilder: UntypedFormBuilder) {
        this._form = this._formBuilder.group({
            filtros: this._formBuilder.array([])
        });
    }

    ngOnInit(): void {
        this.inicializarFiltros();
    }

    inicializarFiltros() {
        this.config.forEach((filtro) => {
            this.adicionarFiltro(filtro);
        });

        this._form.get('filtros')?.valueChanges.subscribe((dados) => {
            this.aplicarFiltroColuna(dados);
        });
    }

    adicionarFiltro(filtro: Filtro) {
        const controle = <UntypedFormArray>this._form.controls['filtros'];

        controle.push(this.criarFiltroControle(filtro));
    }

    criarFiltroControle(filtro: Filtro): UntypedFormGroup {
        const auxiliar = this._formBuilder.group({
            tipo: [filtro?.tipo ? filtro.tipo : 'input'],
            tipoDetalhe: [filtro?.tipoDetalhe ? filtro.tipoDetalhe : ''],
            titulo: [filtro?.titulo ? filtro.titulo : ''],
            placeholder: [filtro?.placeholder ? filtro.placeholder : ''],
            filtroGlobal: [filtro?.filtroGlobal ? filtro.filtroGlobal : false],
            colunaFiltrada: [filtro?.colunaFiltrada ? filtro.colunaFiltrada : ''],
            pesquisa: [filtro?.pesquisa ? filtro.pesquisa : '']
        });

        return auxiliar;
    }

    removerFiltro() {
        console.log('Removeu Filtro');
    }

    obterControleFiltros() {
        return <UntypedFormArray>this._form.get('filtros');
    }

    obterControleFiltro(indice: number): UntypedFormGroup {
        return this.obterControleFiltros().at(indice) as UntypedFormGroup;
    }

    aplicarFiltroColuna(filtros: Filtro[]) {
        this.dadosTabela.filterPredicate = function (data: any, filter: string): boolean {
            let resultadoColuna = true;
            let resultadoGlobal: boolean[] = [];

            let filtroGlobal = filtros.find((filtro) => {
                return filtro.filtroGlobal;
            });

            filtros
                .filter((filtro) => {
                    return !filtro.filtroGlobal;
                })
                .forEach((filtro) => {
                    if (filtro.pesquisa && filtroGlobal?.pesquisa) {
                        if (!String(data[filtro.colunaFiltrada]).toLowerCase().includes(filtro.pesquisa?.toLowerCase())) {
                            resultadoColuna = false;
                        } else {
                            resultadoColuna = true;

                            if (!String(data[filtro.colunaFiltrada]).toLowerCase().includes(filtroGlobal.pesquisa?.toLowerCase())) {
                                resultadoGlobal.push(false);
                            } else {
                                resultadoGlobal.push(true);
                            }
                        }
                    }

                    if (filtro.pesquisa && !filtroGlobal?.pesquisa) {
                        if (!String(data[filtro.colunaFiltrada]).toLowerCase().includes(filtro.pesquisa?.toLowerCase())) {
                            resultadoColuna = false;
                        }
                    }

                    if (!filtro.pesquisa && filtroGlobal?.pesquisa) {
                        if (!String(data[filtro.colunaFiltrada]).toLowerCase().includes(filtroGlobal.pesquisa?.toLowerCase())) {
                            resultadoGlobal.push(false);
                        } else {
                            resultadoGlobal.push(true);
                        }
                    }
                });

            if (filtroGlobal?.pesquisa) {
                if (resultadoColuna) {
                    return resultadoGlobal.some((elemento) => elemento);
                } else {
                    return false;
                }
            } else {
                return resultadoColuna;
            }
        };

        this.dadosTabela.filter = 'Busca';
    }

    limparTodosFiltros() {
        const controle = <UntypedFormArray>this._form.controls['filtros'];

        controle.controls.forEach((filtro) => {
            filtro.get('pesquisa')?.setValue('');
        });

        this.dadosTabela.filter = 'Busca';
    }

    existeFiltroAplicado() {
        const controle = <UntypedFormArray>this._form.controls['filtros'];

        return controle.controls.find((filtro) => filtro.get('pesquisa')?.value) ? true : false;
    }
}
