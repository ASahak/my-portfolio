import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
    Common
} from '@app/core/enums';

@Injectable({
    providedIn: 'root'
})
export class FirebaseSnapshotsService {
    // Aside Bar
    public asideBar: string                  = Common.asideBar;
    public asideBarFieldName: string         = Common.asideBarFieldName;
    // Home Page
    public pageHomeName: string              = Common.pageHomeName;
    public homeFieldName: string             = Common.pageHomeFieldName;

    // Programs Page
    public pageProjectName: string           = Common.pageProjectName;
    public programsFieldName: string         = Common.pageProgramsFieldName;

    // Works Page
    public worksFieldName: string            = Common.pageWorksFieldName;

    // About Page
    public pageAboutName: string             = Common.pageAboutName;
    public homeFieldAboutTitleName: string   = Common.pageAboutTitleFieldName;
    public homeFieldAboutMeName: string      = Common.pageAboutMeFieldName;

    // Skills Page
    public pageSkillsName: string            = Common.pageSkillsName;
    public homeFieldSkillsTitleName: string  = Common.pageSkillsTitleFieldName;
    public homeFieldSkillsListName: string   = Common.pageSkillsListFieldName;
    constructor (
        private firestore: AngularFirestore,
    ) {
    }

    public AsideBar () {
        return this.firestore.doc(`${this.asideBar}/${this.asideBarFieldName}`).snapshotChanges();
    }

    public Home () {
        return this.firestore.doc(`${this.pageHomeName}/${this.homeFieldName}`).snapshotChanges();
    }

    public Programs () {
        return this.firestore.doc(`${this.pageProjectName}/${this.programsFieldName}`).snapshotChanges();
    }

    public Works () {
        return this.firestore.doc(`${this.pageProjectName}/${this.worksFieldName}`).snapshotChanges();
    }

    public About () {
        return {
            title: this.firestore.doc(`${this.pageAboutName}/${this.homeFieldAboutTitleName}`).snapshotChanges(),
            me: this.firestore.doc(`${this.pageAboutName}/${this.homeFieldAboutMeName}`).snapshotChanges()
        };
    }

    public Skills () {
        return {
            title: this.firestore.doc(`${this.pageSkillsName}/${this.homeFieldSkillsTitleName}`).snapshotChanges(),
            list: this.firestore.doc(`${this.pageSkillsName}/${this.homeFieldSkillsListName}`).snapshotChanges()
        };
    }
}
