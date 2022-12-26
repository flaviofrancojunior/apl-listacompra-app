import { ListaOpcoesSelect } from '@/app/apresentacao/componentes/base/select/select.component';
import { EstadosHelper } from '@/app/apresentacao/helpers/estados.helper';
import { ICadastrosPlanoContaUseCase } from '@/app/dominio/contratos/casos-uso/cadastros/plano-conta.interface';
import { Estados, IEstadosHelper } from '@/app/dominio/contratos/helpers/estados.interface';
import { ISnackbarHelper } from '@/app/dominio/contratos/helpers/snackbar.interface';
import { PlanoConta, ResponsabilidadePlanoConta, TipoPlanoConta } from '@/app/dominio/entidades/cadastros/plano-conta.model';
import { ID } from '@/app/dominio/entidades/sistema/types.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

// export class POST = {
//     idRaiz: string;
//     idPai: string
//     dados: {}
// }

// export class DELETE_PUT = {
//     idRaiz: string;
//     idPai: string;
//     idFilho: string;
//     dados:? {}
// }

export class PlanoContaNo {
    id: ID;
    numero: string;
    grau: number;
    descricao: string;
    tipoId: typeof TipoPlanoConta | null;
    tipoDescricao: string;
    responsabilidadeId: typeof ResponsabilidadePlanoConta | null;
    responsabilidadeDescricao: string;
    subcontas: PlanoContaNo[];
    indice: number;
}

/** Flat to-do item node with expandable and level information */
export class PlanoContaNoFlat {
    id: ID;
    numero: string;
    grau: number;
    descricao: string;

    tipoId: typeof TipoPlanoConta | null;
    tipoDescricao: string;
    responsabilidadeId: typeof ResponsabilidadePlanoConta | null;
    responsabilidadeDescricao: string;

    level: number;
    expansivel: boolean;
    indice: number;
}

@Component({
    selector: 'sfr-cadastros-tree-plano-contas',
    templateUrl: './tree-plano-contas.component.html',
    styleUrls: ['./tree-plano-contas.component.scss'],
    providers: [{ provide: IEstadosHelper, useClass: EstadosHelper }]
})
export class CadastrosTreePlanoContasComponent {
    flatNodeMap = new Map<PlanoContaNoFlat, PlanoContaNo>();
    nestedNodeMap = new Map<PlanoContaNo, PlanoContaNoFlat>();
    treeControl: FlatTreeControl<PlanoContaNoFlat>;
    treeFlattener: MatTreeFlattener<PlanoContaNo, PlanoContaNoFlat>;
    dataSource: MatTreeFlatDataSource<PlanoContaNo, PlanoContaNoFlat>;

    _form: UntypedFormGroup;

    _listaTipos: ListaOpcoesSelect[];
    _listaResponsabilidades: ListaOpcoesSelect[];

    _nosExpandidos: PlanoContaNoFlat[];

    _dados: PlanoConta[];
    @Input()
    public get dados(): PlanoConta[] {
        return this._dados;
    }
    public set dados(value: PlanoConta[]) {
        this._dados = value;

        if (this._dados != undefined) {
            this.inicializarArvore(this._dados);
        }
    }

    constructor(public estado: IEstadosHelper, private _formBuilder: UntypedFormBuilder, private _snackbarHelper: ISnackbarHelper, private _cadastrosPlanoContaUseCase: ICadastrosPlanoContaUseCase) {
        this.inicializarListas();
        this.inicializarControle();
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<PlanoContaNoFlat>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.dataSource.data = [];
    }

    inicializarArvore(planoContas: PlanoConta[]) {
        let dados: PlanoContaNo[] = [];

        //Conserva o estado dos nós expandidos
        this._nosExpandidos = this.treeControl.expansionModel.selected;

        this.transformarArvoreEmLista(planoContas, dados);

        this.dataSource.data = dados;

        //Realiza a expanção do nó sem id (Inserção) e dos nós previamente expandidos
        this.nestedNodeMap.forEach((no) => {
            const noBusca = this._nosExpandidos.find((elemento) => {
                return elemento.id === no.id;
            });

            if (!no.id) {
                const parentNode = this.getParentNode(no);
                if (parentNode) {
                    this.treeControl.expand(parentNode);
                }
            }

            if (noBusca && noBusca.id === no.id) {
                this.treeControl.expand(no);
            }
        });
    }

    inicializarControle() {
        this._form = this._formBuilder.group({
            planoContas: this._formBuilder.array([])
        });
    }

    inicializarListas() {
        this._listaTipos = (Object.keys(TipoPlanoConta).filter((v) => isNaN(Number(v))) as (keyof typeof TipoPlanoConta)[]).map((chave) => {
            return { id: TipoPlanoConta[chave], descricao: chave };
        });

        this._listaResponsabilidades = (Object.keys(ResponsabilidadePlanoConta).filter((v) => isNaN(Number(v))) as (keyof typeof ResponsabilidadePlanoConta)[]).map((chave) => {
            return { id: ResponsabilidadePlanoConta[chave], descricao: chave };
        });
    }

    transformarArvoreEmLista(planoConta: PlanoConta[], listagem: PlanoContaNo[] | undefined) {
        planoConta.forEach((plano) => {
            if (listagem) {
                if (!plano.id) {
                    this.adicionarControle({
                        id: plano.id,
                        numero: plano.numero,
                        grau: plano.grau,
                        descricao: plano.descricao,

                        tipoId: plano.tipoId,
                        tipoDescricao: plano.tipoDescricao,
                        responsabilidadeId: plano.responsabilidadeId,
                        responsabilidadeDescricao: plano.responsabilidadeDescricao,

                        level: 0,
                        expansivel: false,
                        indice: this.obterControle().controls.length
                    });
                }

                listagem.push({
                    id: plano.id,
                    numero: plano.numero,
                    grau: plano.grau,
                    descricao: plano.descricao,
                    tipoId: plano.tipoId,
                    tipoDescricao: plano.tipoDescricao,
                    responsabilidadeId: plano.responsabilidadeId,
                    responsabilidadeDescricao: plano.responsabilidadeDescricao,
                    indice: plano.id ? -1 : this.obterControle().controls.length - 1,
                    subcontas: []
                });

                if (plano.subcontas.length == 0) {
                    return;
                } else {
                    this.transformarArvoreEmLista(plano.subcontas, listagem[listagem.length - 1]?.subcontas);
                }
            }
        });
    }

    getLevel = (node: PlanoContaNoFlat) => node.level;
    isExpandable = (node: PlanoContaNoFlat) => node.expansivel;
    getChildren = (node: PlanoContaNo): PlanoContaNo[] => node.subcontas;
    hasChild = (_: number, _nodeData: PlanoContaNoFlat) => _nodeData.expansivel;
    hasNoContent = (_: number, _nodeData: PlanoContaNoFlat) => _nodeData.id === '';

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: PlanoContaNo, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.id === node.id ? existingNode : new PlanoContaNoFlat();
        flatNode.id = node.id;
        flatNode.numero = node.numero;
        flatNode.grau = node.grau;
        flatNode.descricao = node.descricao;
        flatNode.tipoId = node.tipoId;
        flatNode.tipoDescricao = node.tipoDescricao;
        flatNode.responsabilidadeId = node.responsabilidadeId;
        flatNode.responsabilidadeDescricao = node.responsabilidadeDescricao;

        flatNode.indice = node.indice;
        flatNode.level = level;
        flatNode.expansivel = node.subcontas?.length > 0;

        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    /* Get the parent node of a node */
    getParentNode(node: PlanoContaNoFlat): PlanoContaNoFlat | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    adicionarFilho(node?: PlanoContaNoFlat) {
        if (node) {
            let dados = this.dados ? [...this.dados] : [];
            this.adicionarFilhoPorId(
                dados,
                {
                    id: '',
                    numero: node.numero + '.',
                    grau: node.grau + 1,
                    descricao: '',
                    tipoId: null,
                    tipoDescricao: '',
                    responsabilidadeId: null,
                    responsabilidadeDescricao: '',
                    indice: this.obterControle().controls.length,
                    subcontas: []
                },
                node.id
            );

            this.dados = dados;
        } else {
            let dados = this.dados ? [...this.dados] : [];

            dados.unshift({
                descricao: '',
                grau: 1,
                id: '',
                indice: 0,
                numero: '',
                responsabilidadeDescricao: '',
                responsabilidadeId: null,
                subcontas: [],
                tipoDescricao: '',
                tipoId: null
            });

            this.dados = dados;
        }
    }

    adicionarFilhoPorId(arvore: PlanoConta[], no: PlanoConta, id: ID) {
        arvore.forEach((elemento) => {
            if (elemento.id === id) {
                elemento.subcontas.unshift(no);
                return;
            } else {
                if (elemento.subcontas.length == 0) {
                    return;
                } else {
                    this.adicionarFilhoPorId(elemento.subcontas, no, id);
                }
            }
        });
    }

    removerFilhoPorId(arvore: PlanoConta[], id: ID) {
        arvore.forEach((elemento) => {
            if (elemento.id === id) {
                elemento.subcontas.shift();
                return;
            } else {
                if (elemento.subcontas.length == 0) {
                    return;
                } else {
                    this.removerFilhoPorId(elemento.subcontas, id);
                }
            }
        });
    }

    alterarFilhoPorId(arvore: PlanoConta[], no: PlanoConta, id: ID) {
        arvore.forEach((elemento) => {
            if (elemento.id === id) {
                elemento.subcontas[0] = no;
                this.sortNo(elemento.subcontas);

                return;
            } else {
                if (elemento.subcontas.length == 0) {
                    return;
                } else {
                    this.alterarFilhoPorId(elemento.subcontas, no, id);
                }
            }
        });
    }

    alterarFilhoVazio(arvore: PlanoConta[], id: ID) {
        arvore.forEach((elemento) => {
            if (elemento.id === '') {
                elemento.id = id;
                return;
            } else {
                if (elemento.subcontas.length == 0) {
                    return;
                } else {
                    this.alterarFilhoVazio(elemento.subcontas, id);
                }
            }
        });
    }

    obterIdNoPaiGrau1(node: PlanoContaNoFlat) {
        let parentNode = this.getParentNode(node);

        if (parentNode?.grau == 1 || node.grau === 1) {
            return parentNode?.id;
        } else {
            while (parentNode?.grau != 1) {
                if (parentNode) {
                    parentNode = this.getParentNode(parentNode);
                }
            }

            return parentNode.id;
        }
    }

    removerFilho(node: PlanoContaNoFlat) {
        const parentNode = this.getParentNode(node);
        let dados = Object.assign([], this.dados);

        if (parentNode) {
            this.removerFilhoPorId(dados, parentNode.id);
            this.removerControle(node.indice);

            this.dados = dados;
        } else {
            let dados = Object.assign([], this.dados);
            dados.shift();
            this.removerControle(node.indice);

            this.dados = dados;
        }
    }

    adicionarControle(node: PlanoContaNoFlat) {
        const controle = <FormArray>this._form.controls['planoContas'];
        controle.push(this.criarControleFormGroup(node));
    }

    criarControleFormGroup(node: PlanoContaNoFlat): FormGroup {
        const auxiliar = this._formBuilder.group({
            id: [''],
            numero: ['', Validators.required],
            grau: [node?.grau + 1, Validators.required],
            descricao: ['', Validators.required],
            tipoId: ['', Validators.required],
            tipoDescricao: [''],
            responsabilidadeId: ['', Validators.required],
            responsabilidadeDescricao: ['']
        });

        auxiliar.get('tipoId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaTipos.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                auxiliar.get('tipoDescricao')?.setValue(opcao.descricao);
            }
        });

        auxiliar.get('responsabilidadeId')?.valueChanges.subscribe((novoValor) => {
            const opcao = this._listaResponsabilidades.find((elemento) => {
                return elemento.id === novoValor;
            });
            if (opcao) {
                auxiliar.get('responsabilidadeDescricao')?.setValue(opcao.descricao);
            }
        });

        return auxiliar;
    }

    removerControle(indice: number) {
        const controle = <FormArray>this._form.controls['planoContas'];
        controle.removeAt(indice);
    }

    obterControlePorId(indice: number): FormGroup {
        const controle = <FormArray>this._form.get('planoContas');

        return controle.at(indice) as FormGroup;
    }

    obterControle(): FormArray {
        return <FormArray>this._form.get('planoContas');
    }

    cadastrarPlanoConta(node: PlanoContaNoFlat) {
        this.estado.definirEstado(Estados.carregando, 'Cadastrando plano de conta...', node.indice);
        const controle = this.obterControle();
        const dadosFormulario: PlanoContaNo = controle.at(node.indice).getRawValue();
        const parentNode = this.getParentNode(node);

        let dados: PlanoConta[] = Object.assign([], this.dados);

        let objeto: PlanoConta = {
            id: '',
            numero: node.numero + dadosFormulario.numero,
            grau: parentNode ? parentNode.grau + 1 : 1,
            descricao: dadosFormulario.descricao,
            tipoId: dadosFormulario.tipoId,
            tipoDescricao: dadosFormulario.tipoDescricao,
            responsabilidadeId: dadosFormulario.responsabilidadeId,
            responsabilidadeDescricao: dadosFormulario.responsabilidadeDescricao,
            subcontas: [],
            indice: -1
        };

        if (parentNode) {
            this.alterarFilhoPorId(dados, objeto, parentNode.id);

            const idNoPaiGrau1 = this.obterIdNoPaiGrau1(node);
            const arvorePaiGrau1 = dados.find((elemento) => {
                return elemento.id === idNoPaiGrau1;
            });

            if (arvorePaiGrau1) {
                if (idNoPaiGrau1) {
                    this._cadastrosPlanoContaUseCase.cadastrarPlanoConta(idNoPaiGrau1, parentNode.id, objeto).subscribe({
                        next: (id) => {
                            this.alterarFilhoVazio(dados, id);
                            this.removerControle(node.indice);
                            this.dados = dados;
                            this.estado.definirEstado(Estados.comDados, '', node.indice);
                            this._snackbarHelper.exibirSucesso('Plano de conta criado com sucesso!');
                        },
                        error: (erro) => {
                            this.estado.definirEstado(Estados.comDados, '', node.indice);
                            this._snackbarHelper.exibirErro(erro);
                        }
                    });
                }
            }
        } else {
            this._cadastrosPlanoContaUseCase.cadastrarPlanoConta('', '', objeto).subscribe({
                next: (id) => {
                    objeto.id = id;
                    dados[0] = objeto;
                    this.sortNo(dados);

                    this.removerControle(node.indice);
                    this.dados = dados;

                    this.estado.definirEstado(Estados.comDados, '', node.indice);

                    this._snackbarHelper.exibirSucesso('Plano de conta criado com sucesso!');
                },
                error: (erro) => {
                    this.estado.definirEstado(Estados.comDados, '', node.indice);
                    this._snackbarHelper.exibirErro(erro);
                }
            });
        }
    }

    sortNo(no: PlanoConta[]) {
        no.sort((a, b) => {
            if (a.numero < b.numero) {
                return -1;
            } else if (a.numero > b.numero) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    expandirTodos() {
        this.treeControl.expandAll();
    }

    retrairTodos() {
        this.treeControl.collapseAll();
    }
}
