import { Pipe, PipeTransform } from '@angular/core';

/*
 * Transforma os valores de um array em string
 * O separador default, caso não seja setado será espaço ' '.
 * Uso:
 *   value | JoinPipe:separator
 * Exemplo:
 *   {{ ['palavra1', 'palavra2'] | JoinPipe:',' }}
 * Saída: palavra1,palavra2
 */
@Pipe({ name: 'JoinPipe' })
export class JoinPipe implements PipeTransform {
    transform(data: string[], separator?: string): string {
        if (data) {
            return data.join(separator === undefined ? ' ' : separator);
        } else {
            return '';
        }
    }
}
