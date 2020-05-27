import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';
import { ValidationService } from '@app/shared/services/form-validation.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
    public contactForm: FormGroup;
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    public isSubmitted: boolean   = false;
    private messageSent: boolean  = false;
    constructor (
        private firestore: AngularFirestore,
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

    sendMessage () {
        this.isSubmitted = true;
        this.firestore.doc('messages/contact-send-messages').get().subscribe(data => {
            const getMsgData = data.data();
            getMsgData.messages.push(this.contactForm.value);
            this.firestore.doc('messages/contact-send-messages')
                .update({messages: getMsgData.messages}).then(res => {
                this.isSubmitted = false;
                this.messageSent = true;
                setTimeout(() => this.messageSent = false, 3000);
                this.contactForm.reset();
            });
        });
    }

}
