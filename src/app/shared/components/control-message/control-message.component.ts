import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '@app/shared/services/form-validation.service';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';

@Component({
    selector: 'app-control-messages',
    styles: [`
        .error-wrapper {
            font-size: 10px;
            color: red;
            transition: .4s;
        }
    `],
    animations: [ trigger('load', [
        transition(':enter', [
            style({ opacity: 0, maxHeight: '0px'}),
            animate(600, style({ opacity: 1, maxHeight: '100px' }))
        ]),
        transition(':leave', [
            style({ opacity: 1, maxHeight: '0px' }),
            animate(600, style({ opacity: 0, maxHeight: '0px' }))
        ])

    ])
    ],
    template: `
        <div @load #errorWrap *ngIf="errorMessage !== null" class="error-wrapper">{{errorMessage}}</div>
  `
})
export class ControlMessagesComponent {
    @Input() control: FormControl;
    @ViewChild('errorWrap') errorWrap: ElementRef;
    constructor () {}

    get errorMessage () {
        for (const propertyName in this.control.errors) {
            if (
                this.control.errors.hasOwnProperty(propertyName) &&
                this.control.touched
            ) {
                return ValidationService.getValidatorErrorMessage(
                    propertyName,
                    this.control.errors[propertyName]
                );
            }
        }

        return null;
    }
}
