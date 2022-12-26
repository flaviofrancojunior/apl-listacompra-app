import { BibliotecaImagens, IRepositorioImagens, Imagem } from '@/app/dominio/contratos/repositorios/imagens.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

let mockData: Imagem = {
    nome: 'avatar_usuario-generico',
    nomeArquivo: 'avatar_usuario-generico.svg',
    caminho: 'assets/img/avatar_usuario-generico.svg'
};

class RepositorioImagensMock {
    obter(chave: keyof typeof BibliotecaImagens): Imagem | undefined {
        return mockData;
    }
}

describe('quando um novo avatar for instanciado', () => {
    let sut: AvatarComponent;
    let fixture: ComponentFixture<AvatarComponent>;
    let element: HTMLElement;

    const imageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AvatarComponent],
            providers: [{ provide: IRepositorioImagens, useClass: RepositorioImagensMock }]
        }).compileComponents();
        fixture = TestBed.createComponent(AvatarComponent);

        sut = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve ser criado na ausência de todos inputs com [size="medium"]', () => {
        expect(sut._size).toBe('medium');
        expect(sut).toBeTruthy();
    });

    it('deve conter a imagem quando o input[picture] é definido', () => {
        sut.picture = imageBase64;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('img');
        const srcAttr = element.getAttribute('src');
        expect(srcAttr).toBe('data:image/jpg;base64,' + imageBase64);
        expect(sut.picture).toBe('data:image/jpg;base64,' + imageBase64);
    });

    it('deve conter a propriedade[src]="avatar_usuario-generico.svg" quando o input[picture] não é definido', () => {
        element = fixture.nativeElement.querySelector('img');
        const src = element.getAttribute('src');
        expect(src).toContain('assets/img/avatar_usuario-generico.svg');
    });

    it('deve conter a propriedade[size] quando o input[size] é definido', () => {
        const size = 'small';
        sut.size = size;
        fixture.detectChanges();

        element = fixture.nativeElement.querySelector('.avatar');
        const sizeAttr = element.getAttribute('size');
        expect(sizeAttr).toBe(size);
        expect(sut.size).toBe(size);
    });
});
