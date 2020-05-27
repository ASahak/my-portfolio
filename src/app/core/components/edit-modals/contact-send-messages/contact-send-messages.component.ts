import {Component, OnInit} from '@angular/core';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';
import {DialogConfig} from '@app/shared/components/dialog/dialog-config';
import {DialogRef} from '@app/shared/components/dialog/dialog-ref';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';

@Component({
    selector: 'app-contact-send-messages',
    templateUrl: './contact-send-messages.component.html',
    styleUrls: ['./contact-send-messages.component.scss']
})
export class ContactSendMessagesComponent implements OnInit {
    public messages = [];
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    constructor (
        private dialog: DialogRef,
        private config: DialogConfig,
        private firebaseService: FirebaseSnapshotsService,
    ) {
        this.firebaseService.Messages().subscribe(res => {
            this.messages = res.payload?.data()['messages'];
        });
    }

    ngOnInit (): void {
    }
    onClose () {
        this.dialog.close();
    }
}
