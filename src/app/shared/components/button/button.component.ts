import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() text: string;
    @Input() background: string;
    @Input() textTransform: string;
    @Input() fontSize: number = 14;
    @Input() color: string = '#08FDD8';
    @Input() border: string = '1px solid #08FDD8';
    @Input() direction: string = 'left';
    @Input() hover: object;
    @Input() padding: Array<number>;
    @Input() margin: Array<string>;
    @Output() onClick = new EventEmitter<any>();
    @ViewChild('buttonParent') buttonParent: ElementRef;
    @ViewChild('childRef') childRef: ElementRef;
    public style: object        = {};
    private beforeStyle: object = {};
    constructor (
        private renderer2: Renderer2
    ) {
    }

    sendOutput () {
        this.onClick.emit();
    }
    __margin () {
        return {
            marginTop: this.margin[0] || '0px',
            marginLeft: this.margin[1] || '0px',
            marginBottom: this.margin[2] || '0px',
            marginRight: this.margin[3] || '0px',
        };
    }
    __padding () {
        return {
            paddingTop: this.padding[0] + 'px' || '0px',
            paddingLeft: this.padding[1] + 'px' || '0px',
            paddingBottom: this.padding[2] + 'px' || '0px',
            paddingRight: this.padding[3] + 'px' || '0px',
        };
    }
    __setHover (isEnter) {
        if (isEnter) {
            for (const prop in this.hover) {
                if (this.childRef.nativeElement.style.hasOwnProperty(prop)) {
                    this.beforeStyle[prop] = JSON.parse(JSON.stringify(this.childRef.nativeElement.style[prop]));
                }
            }
        }
        // tslint:disable-next-line:forin
        for (const prop in this.hover) {
            this.childRef.nativeElement.style[prop] = isEnter ? this.hover[prop] : this.beforeStyle[prop];
        }
    }
    ngAfterViewInit (): void {
        this.renderer2.setAttribute(this.buttonParent.nativeElement, 'style', `display: flex; justify-content: ${this.direction === 'left' ? 'flex-start' : 'flex-end' }`);
        if (this.hover) {
            this.childRef.nativeElement.addEventListener('mouseenter', this.__setHover.bind(this, true));
            this.childRef.nativeElement.addEventListener('mouseleave', this.__setHover.bind(this, false));
        }
    }

    ngOnInit (): void {
        Object.assign(this.style, {
            ...this.__margin(),
            ...this.__padding(),
            border: this.border,
            color: this.color,
            fontSize: this.fontSize + 'px',
            ...(this.textTransform && {textTransform: this.textTransform})
        });
    }
    ngOnDestroy () {
        this.childRef.nativeElement.removeEventListener('mouseenter', this.__setHover.bind(this, true));
        this.childRef.nativeElement.removeEventListener('mouseleave', this.__setHover.bind(this, false));
    }
}
