import { LOCALE_ID, Pipe, PipeTransform, Inject } from '@angular/core';
import { formatCurrency, formatNumber } from '@angular/common';

/*
 * Transforma valores númericos em valores contábeis
 * Uso:
 *   value | accounting
 * Exemplo:
 *   {{ 5000.0 | accounting }}
 * Saída: 5.000,00
 */
@Pipe({ name: 'accounting' })
export class AccountingPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) public locale: string) {}

    transform(data: number): string {
        if (data !== undefined && data !== null) {
            if (data == 0) {
                return '-';
            } else if (data > 0) {
                return formatNumber(data, this.locale, '1.2');
            } else {
                return '(' + formatNumber(data * -1, this.locale, '1.2') + ')';
            }
        } else {
            return '';
        }
    }
}
