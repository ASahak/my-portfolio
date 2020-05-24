import {
    Component,
    Type,
    OnDestroy,
    AfterViewInit,
    ComponentFactoryResolver,
    ComponentRef,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core';
import { InsertionDirective } from '../../directives/insertion.directive';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit, OnDestroy {
    // tslint:disable-next-line:variable-name
    private readonly _onClose = new Subject<any>();

    public componentRef: ComponentRef<any>;
    public childComponentType: Type<any>;
    public onClose = this._onClose.asObservable();

    // add this:
    @ViewChild(InsertionDirective)
    insertionPoint: InsertionDirective;

    // and this:
    constructor (private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {}

    ngAfterViewInit () {
        this.loadChildComponent(this.childComponentType);
        this.cd.detectChanges();
    }

    ngOnDestroy () {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    onOverlayClicked (evt: MouseEvent) {
        // close the dialog
    }

    onDialogClicked (evt: MouseEvent) {
        evt.stopPropagation();
    }
    loadChildComponent (componentType: Type<any>) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        const viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }
}
