import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';
import {AngularFirestore} from '@angular/fire/firestore';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import {Router} from '@angular/router';

@Component({
    selector: 'app-edit-links',
    templateUrl: './edit-links.component.html',
    styleUrls: ['./edit-links.component.scss']
})
export class EditLinksComponent implements OnInit {
    public editLinksForm: FormGroup;
    public mainBlueColor: string = MAIN_FONT_BLUE_COLOR;

    constructor (
        private firestore: AngularFirestore,
        private dialog: DialogRef,
        public config: DialogConfig,
        private router: Router,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit (): void {
        this.editLinksForm  =  this.formBuilder.group({
            fb: [{value: '', disabled: true}, Validators.required],
            linkedin: [{value: '', disabled: true}, Validators.required],
            github: [{value: '', disabled: true}, Validators.required],
        });
        this.getData();
    }

    private getData () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            for (const prop in data.data()) {
                this.editLinksForm.controls[prop].enable();
                this.editLinksForm.controls[prop].setValue(data.data()[prop]);
            }
        });
    }

    public save () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
            .update(this.editLinksForm.value).then(res => {
            this.onClose();
        });
        this.editLinksForm.reset();
    }

    onClose () {
        this.dialog.close();
    }

}
