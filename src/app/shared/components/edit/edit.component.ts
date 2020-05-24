import {Component, ElementRef, Renderer2, OnInit, Input} from '@angular/core';
import {DialogService} from '@app/shared/services/dialog.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    @Input('modal-name') modalName: string;
    @Input('collection-field-name') collectionFieldFame: string;
    @Input('page') page: string;
    @Input('update-id') updateId: string;
    @Input('hint') hint: any;
    @Input('icon') iconClassName: string = 'lnr-pencil';
    @Input('modal-title') modalTitle: string;
    constructor (
        public dialog: DialogService,
        private $el: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    private getModuleName (name) {
        return name.split('-').map(word => word.replace(word[0], word[0].toUpperCase())).join('');
    }

    public editHOK () {
        const path = 'core/components/edit-modals/' + this.modalName + '/' + this.modalName + '.component.ts';
        import('../../../' + path).then(module => {
            this.dialog.open(module[this.getModuleName(this.modalName) + 'Component'], {
                data: {
                    title: this.modalTitle,
                    firebaseCollection: {
                        ...(this.updateId && {id: this.updateId}),
                        ...(this.hint && {hint: this.hint}),
                        page: this.page,
                        collectionField: this.collectionFieldFame || this.modalName
                    }
                },
            });
        });
        //
        // ref.afterClosed.subscribe(result => {
        //     console.log('Dialog closed', result);
        // });
    }

    ngOnInit (): void {
        if (this.$el.nativeElement?.parentNode) {
            this.renderer.setStyle(this.$el.nativeElement.parentNode, 'position', 'relative');
        }
    }

}
