import {Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit, ApplicationRef} from '@angular/core';
import '@lib/escanvas.min';
import TagCanvas from '@lib/tagCanvas';
import {Common} from '@app/core/enums';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';
import {AuthService} from '@app/shared/services/auth.service';
import {
    SkillsList,
    SkillsTitle,
} from '@app/core/models/common';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('myTagCloud') myTagCloud: ElementRef;
    @ViewChild('middleContent') middleContent: ElementRef;
    @ViewChild('rightPanel') rightPanel: ElementRef;
    public isLogged: boolean             = false;
    public pageName: string              = Common.pageSkillsName;
    public fieldTitleName: string        = Common.pageSkillsTitleFieldName;
    public fieldListName: string         = Common.pageSkillsListFieldName;
    public backEndDataTitle: SkillsTitle = {
        title: '',
        description1: '',
        description2: '',
        description3: '',
    };
    public backEndDataList: SkillsList   = {
        list: []
    };
    constructor (
        private appTick: ApplicationRef,
        private firebaseService: FirebaseSnapshotsService,
        private authService: AuthService
    ) {
        this.authService.isLoggedIn().subscribe(res => {
            this.isLogged = !!res;
        }, err => this.isLogged = false);
    }

    matchMediaCanvas () {
        if (matchMedia('(max-width: 767px)').matches) {
            this.middleContent.nativeElement.appendChild(this.myTagCloud.nativeElement);
        } else {
            this.rightPanel.nativeElement.appendChild(this.myTagCloud.nativeElement);
        }
    }
    ngAfterViewInit () {
        this.matchMediaCanvas();
        addEventListener('resize', this.matchMediaCanvas.bind(this));
    }
    ngOnInit (): void {
        this.firebaseService.Skills().title.subscribe(data => {
            Object.assign(this.backEndDataTitle, data.payload.data());
        });
        this.firebaseService.Skills().list.subscribe(data => {
            Object.assign(this.backEndDataList, data.payload.data());
            this.appTick.tick();
            try {
                TagCanvas.Start('myCanvas', 'tags', {
                    textColour : '#ffffff',
                    activeCursor: 'default',
                    outlineColour: 'transparent'
                });
            } catch (e) {
                // something went wrong, hide the canvas container
                document.getElementById('myCanvasContainer').style.display = 'none';
            }
        });
    }


    ngOnDestroy (): void {
        removeEventListener('resize', this.matchMediaCanvas);
    }
}
