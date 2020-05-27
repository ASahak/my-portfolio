import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';
import {finalize, map} from 'rxjs/operators';

@Component({
    selector: 'app-add-update-project',
    templateUrl: './add-update-project.component.html',
    styleUrls: ['./add-update-project.component.scss']
})
export class AddUpdateProjectComponent implements OnInit {
    public projectForm: FormGroup;
    public mainBlueColor: string        = MAIN_FONT_BLUE_COLOR;
    public downloadURL: string          = '';
    public uploadProgress: any;
    public progressNotStarted: boolean  = false;
    constructor (
        private afStorage: AngularFireStorage,
        private firestore: AngularFirestore,
        private dialog: DialogRef,
        public config: DialogConfig,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }

    protected ifNewProject () {
        return this.config.data.firebaseCollection.hint !== 'add';
    }

    private getToday () {
        const date = new Date();

        let day: number | string = date.getDate();
        let month: number | string = date.getMonth() + 1;
        const year = date.getFullYear();

        if (month < 10) {
            month = String(0) + month;
        }
        if (day < 10) {
            day = String(0) + day;
        }

        return year + '-' + month + '-' + day;
    }

    async ngOnInit () {
        if (this.ifNewProject() && this.config.data.firebaseCollection.id) {
            const getUpdatedData = await this.getData(this.config.data.firebaseCollection.id);
            this.projectForm  =  this.formBuilder.group({
                name: [{value: getUpdatedData['name'], disabled: false}, Validators.required],
                link: [{value: getUpdatedData['link'], disabled: false}, Validators.required],
                linkURL: [{value: getUpdatedData['linkURL'], disabled: false}, Validators.required],
                ...(this.config.data.firebaseCollection.collectionField === 'programs' && {language: [{value: getUpdatedData['language'], disabled: false}, Validators.required]}),
                isPublic: [getUpdatedData['isPublic']],
                preparedDate: [getUpdatedData['preparedDate'], Validators.required],
            });
            this.downloadURL = getUpdatedData['linkURL'];
        } else {
            this.projectForm  =  this.formBuilder.group({
                name: [{value: '', disabled: this.ifNewProject()}, Validators.required],
                link: [{value: '', disabled: this.ifNewProject()}, Validators.required],
                linkURL: [{value: '', disabled: this.ifNewProject()}, Validators.required],
                ...(this.config.data.firebaseCollection.collectionField === 'programs' && {language: [{value: '', disabled: this.ifNewProject()}, Validators.required]}),
                isPublic: [true],
                preparedDate: [this.getToday(), Validators.required],
            });
        }
    }

    public getData (id) {
        return new Promise(resolve => {
            this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
                resolve(data.data()?.list?.find(project => project.id === id));
            });
        });
    }

    public save () {
        let mainData = [];
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            mainData = data.data()?.list;
            if (this.config.data.firebaseCollection.id) {
                const findIndex = mainData.findIndex(project => project.id === this.config.data.firebaseCollection.id);
                if (findIndex !== -1) {
                    const _id = mainData[findIndex].id;
                    mainData[findIndex] = {
                        ...this.projectForm.value,
                        id: _id
                    };
                }
            } else {
                mainData.push({
                    ...this.projectForm.value,
                    id: '_' + Math.random().toString(36).substr(0, 10) + new Date(this.projectForm.value.preparedDate).getTime()
                });
            }
            this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
                .update({list: mainData}).then(res => {
                this.onClose();
                this.projectForm.reset();
                this.downloadURL = '';
            });
        });
    }

    public uploadImage (event) {
        this.progressNotStarted = true;
        this.downloadURL = '';
        const n = Date.now();
        const file = event.target.files[0];
        const filePath = `${this.config.data.firebaseCollection.collectionField}/${n}`;
        const fileRef = this.afStorage.ref(filePath);
        const task = this.afStorage.upload(filePath, file);
        this.uploadProgress = task.snapshotChanges().pipe(
            map(s => (s.bytesTransferred / s.totalBytes) * 100),
        );
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    const downloadURL = fileRef.getDownloadURL();
                    downloadURL.subscribe(url => {
                        if (url) {
                            this.downloadURL = url;
                            this.progressNotStarted = false;
                            this.projectForm.controls.linkURL.setValue(this.downloadURL);
                        }
                    });
                })
            ).subscribe(url => url);
    }
    onClose () {
        this.dialog.close();
    }
}
