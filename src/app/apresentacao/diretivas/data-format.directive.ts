/* eslint-disable @angular-eslint/directive-selector */

import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const FORMAT_YEAR_MONTH_DAY = {
    parse: {
        dateInput: 'YYYY-MM-DD'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM'
    }
};

export const FORMAT_YEAR_MONTH = {
    parse: {
        dateInput: 'YYYY-MM'
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM'
    }
};

@Directive({
    selector: '[data-year-month-day]',
    providers: [{ provide: MAT_DATE_FORMATS, useValue: FORMAT_YEAR_MONTH_DAY }]
})
export class DataFormatYearMonthDayDirective {}

@Directive({
    selector: '[data-year-month]',
    providers: [{ provide: MAT_DATE_FORMATS, useValue: FORMAT_YEAR_MONTH }]
})
export class DataFormatYearMonthDirective {}
