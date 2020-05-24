import {Component, OnInit, ApplicationRef} from '@angular/core';
import 'jquery/dist/jquery.min.js';
import Isotope from '@lib/isotope.pkgd.min';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';
import {AuthService} from '@app/shared/services/auth.service';
import {Common} from '@app/core/enums';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
    selector: 'app-programs',
    templateUrl: './programs.component.html',
    styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
    private isLogged: boolean           = false;
    public myPrograms: any              = [];
    public publicLanguage: string       = '*';
    private isotope: any;
    public pageName: string             = Common.pageProjectName;
    public fieldProgramsName: string    = Common.pageProgramsFieldName;
    constructor (
        private appTick: ApplicationRef,
        private firebaseService: FirebaseSnapshotsService,
        private authService: AuthService,
        private firestore: AngularFirestore,
    ) {
        this.authService.isLoggedIn().subscribe(res => {
            this.isLogged = !!res;
        }, err => {
            this.isLogged = false;
            this.appTick.tick();
            const elem = document.querySelector('.grid');
            this.isotope = new Isotope( elem, {
                // options
                itemSelector: '.grid-item',
                layoutMode: 'fitRows'
            });
        });

        this.firebaseService.Programs().subscribe(res => {
            this.myPrograms = res.payload.data()['list'];
            this.appTick.tick();
            const elem = document.querySelector('.grid');
            this.isotope = new Isotope( elem, {
                // options
                itemSelector: '.grid-item',
                layoutMode: 'fitRows'
            });
        });
    }

    public removeProject (id) {
        let mainData = [];
        this.firestore.doc(this.pageName + '/' + this.fieldProgramsName).get().subscribe(data => {
            mainData = data.data()?.list;
            const findIndex = mainData.findIndex(project => project.id === id);
            if (findIndex !== -1) {
                mainData.splice(findIndex, 1);
                this.firestore.doc(this.pageName + '/' + this.fieldProgramsName)
                    .update({list: mainData});
            }
        });
    }

    public filterPrograms (type) {
        const mainTag = document.querySelector('main');
        mainTag?.setAttribute('style', 'overflow: hidden');
        this.isotope.arrange({filter: (type === '*') ? '*' : '.' + type});
        this.publicLanguage = type;
        setTimeout(() => {
            mainTag?.removeAttribute('style');
        }, 400);
    }

    public generateBtns () {
        return this.myPrograms.reduce((acc, item) => {
            if (acc.indexOf(item.language) === -1) {
                acc.push(item.language);
            }
            return acc;
        }, []);
    }

    public replaceLanguage (language) {
        return language?.replace(/[&\/\\#,+()$~% .'":*?<>{}]/g, '').toLowerCase();
    }
    ngOnInit (): void {
    }

}
