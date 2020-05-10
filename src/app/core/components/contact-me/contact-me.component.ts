import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';
import { ValidationService } from '@app/shared/services/form-validation.service';

@Component({
    selector: 'app-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
    public contactForm: FormGroup;
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    public isSubmitted: boolean = false;
    constructor (
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit (): void {
        this.contactForm  =  this.formBuilder.group({
            email: ['', [Validators.required, ValidationService.emailValidator]],
            message: ['', Validators.required],
            name: ['', Validators.required]
        });
    }

    sendMessage () {}

}
