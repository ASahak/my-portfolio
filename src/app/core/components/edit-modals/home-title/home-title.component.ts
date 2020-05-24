import {Component, OnInit} from '@angular/core';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {
    MAIN_FONT_BLUE_COLOR
} from '@app/core/constants';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
    selector: 'app-home-title',
    templateUrl: './home-title.component.html',
    styleUrls: ['./home-title.component.scss']
})
export class HomeTitleComponent implements OnInit {
    public homeForm: FormGroup;
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
        this.homeForm  =  this.formBuilder.group({
            title: [{value: '', disabled: true}, Validators.required],
            subTitle: [{value: '', disabled: true}, Validators.required]
        });
        this.getData();
    }

    private getData () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            for (const prop in data.data()) {
                this.homeForm.controls[prop].enable();
                this.homeForm.controls[prop].setValue(data.data()[prop]);
            }
        });
    }

    private save () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
        .update(this.homeForm.value).then(res => {
            this.onClose();
        });
        this.homeForm.reset();
    }

    onClose () {
        this.dialog.close();
    }
}
