import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-svg-icon',
    styles: [],
    template: `
        <svg
            [attr.width]="width"
            [attr.stroke]="stroke"
            [attr.stroke-width]="strokeWidth"
            [attr.height]="height"
            [attr.viewBox]="viewBox">
            <use [attr.xlink:href]="'assets/Icons/icons-defs.svg#' + type"></use>
        </svg>
    `
})
export class SVGComponent {
    @Input() width: number;
    @Input() stroke: string;
    @Input('stroke-width') strokeWidth: number;
    @Input() height: number;
    @Input() viewBox: string;
    @Input() type: string;
}
