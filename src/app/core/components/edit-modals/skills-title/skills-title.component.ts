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
    selector: 'app-skills-title',
    templateUrl: './skills-title.component.html',
    styleUrls: ['./skills-title.component.scss']
})
export class SkillsTitleComponent implements OnInit {
    public skillsTitleForm: FormGroup;
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    constructor (
        private firestore: AngularFirestore,
        private dialog: DialogRef,
        private config: DialogConfig,
        private router: Router,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit (): void {
        this.skillsTitleForm  =  this.formBuilder.group({
            title: [{value: '', disabled: true}, Validators.required],
            description1: [{value: '', disabled: true}],
            description2: [{value: '', disabled: true}],
            description3: [{value: '', disabled: true}],
        });
        this.getData();
    }

    private getData () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            for (const prop in data.data()) {
                this.skillsTitleForm.controls[prop].enable();
                this.skillsTitleForm.controls[prop].setValue(data.data()[prop]);
            }
        });
    }

    private save () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
            .update(this.skillsTitleForm.value).then(res => {
            this.onClose();
        });
        this.skillsTitleForm.reset();
    }

    onClose () {
        this.dialog.close();
    }
}
