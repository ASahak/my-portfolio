import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-skills-list',
    templateUrl: './skills-list.component.html',
    styleUrls: ['./skills-list.component.scss']
})
export class SkillsListComponent implements OnInit {
    public skillsListForm: FormGroup;
    public listSkills: Array<string> = [];
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    constructor (
        private firestore: AngularFirestore,
        private dialog: DialogRef,
        public config: DialogConfig,
        private formBuilder: FormBuilder
    ) {
        this.skillsListForm  =  this.formBuilder.group({
            list: [''],
        });
    }

    ngOnInit (): void {
        this.getData();
    }
    private getData () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField).get().subscribe(data => {
            for (const i of data.data()?.list) {
                this.listSkills.push(i);
            }
        });
    }
    onClose () {
        this.dialog.close();
    }
    public save () {
        this.firestore.doc(this.config.data.firebaseCollection.page + '/' + this.config.data.firebaseCollection.collectionField)
            .update({list: this.listSkills}).then(res => {
            this.onClose();
        });
        this.skillsListForm.reset();
    }

    public add () {
        if (this.listSkills.indexOf(this.skillsListForm.value.list) !== -1) {
            this.skillsListForm.reset();
            alert('There is like that skill already!');
            return;
        }
        this.listSkills.push(this.skillsListForm.value.list);
        this.skillsListForm.reset();
    }
    public removeSkill (index) {
        this.listSkills.splice(index, 1);
    }

}
