import { Component, OnInit } from '@angular/core';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {
    MAIN_FONT_BLUE_COLOR
} from '@app/core/constants';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-about-title',
  templateUrl: './about-title.component.html',
  styleUrls: ['./about-title.component.scss']
})
export class AboutTitleComponent implements OnInit {
    public aboutTitleForm: FormGroup;
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
        this.aboutTitleForm  =  this.formBuilder.group({
            title: [{value: '', disabled: true}, Validators.required],
            description: [{value: '', disabled: true}, Validators.required],
            workingPlaceName: [{value: '', disabled: true}, Validators.required],
            workingPlaceUrl: [{value: '', disabled: true}, Validators.required]
        });
        this.getData();
    }

    private getData () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            for (const prop in data.data()) {
                this.aboutTitleForm.controls[prop].enable();
                this.aboutTitleForm.controls[prop].setValue(data.data()[prop]);
            }
        });
    }

    public save () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
            .update(this.aboutTitleForm.value).then(res => {
            this.onClose();
        });
        this.aboutTitleForm.reset();
    }

    onClose () {
        this.dialog.close();
    }
}
