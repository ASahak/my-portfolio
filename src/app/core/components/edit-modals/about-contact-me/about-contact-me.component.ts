import { Component, OnInit } from '@angular/core';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/services/form-validation.service';
import {Router} from '@angular/router';
import {
    MAIN_FONT_BLUE_COLOR
} from '@app/core/constants';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-about-contact-me',
    templateUrl: './about-contact-me.component.html',
    styleUrls: ['./about-contact-me.component.scss']
})
export class AboutContactMeComponent implements OnInit {
    public aboutContactMeForm: FormGroup;
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    constructor (
        private firestore: AngularFirestore,
        private dialog: DialogRef,
        public config: DialogConfig,
        private router: Router,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit (): void {
        this.aboutContactMeForm  =  this.formBuilder.group({
            email: [{value: '', disabled: true}, [Validators.required, ValidationService.emailValidator]],
            phone: [{value: '', disabled: true}, Validators.required],
        });
        this.getData();
    }

    private getData () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            for (const prop in data.data()) {
                this.aboutContactMeForm.controls[prop].enable();
                this.aboutContactMeForm.controls[prop].setValue(data.data()[prop]);
            }
        });
    }

    public save () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
            .update(this.aboutContactMeForm.value).then(res => {
            this.onClose();
        });
        this.aboutContactMeForm.reset();
    }

    onClose () {
        this.dialog.close();
    }
}

