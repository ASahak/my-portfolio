import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {WithLabel} from '@app/core/models/common';


@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    host: {
        class: 'main-input-wrapper'
    }
})
export class InputComponent implements OnInit {
    @Input() inputType: string;
    @Input() controlName: string = '';
    @Input() withLabel: WithLabel = {id: '', name: ''};
    @Input() parentForm: FormGroup;
    @Input() getForm: string = '';
    @Input() control: any;
    @Input() placeholder: string = '';
    constructor () {
    }

    ngOnInit (): void {
    }
    checkboxChange (evt) {
        return (evt.target.checked ?
            this.parentForm.get(this.controlName).patchValue(true) : this.parentForm.get(this.controlName).patchValue(false));
    }

}
