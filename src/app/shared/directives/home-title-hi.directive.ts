import {Directive, Renderer2, ElementRef, OnInit, Input} from '@angular/core';

@Directive({
    selector: '[appHomeTitleHi]'
})
export class HomeTitleHiDirective implements OnInit{
    @Input() title: string;
    @Input() time: number;
    constructor(
        private renderer2: Renderer2,
        private elementRef: ElementRef,
    ) {
    }

    ngOnInit(): void {
        let everyLetter = '';
        const splitWord = this.title.split(',');
        splitWord.map((word, index) => {
            word.split('').map((letter) => {
                everyLetter += `<span>${letter}</span>`;
            });
            if (index < splitWord.length - 1) { everyLetter += '<span>,<br></span>'; }
        });
        this.elementRef.nativeElement.innerHTML = everyLetter;
        setTimeout(() => {
            let delay = 0;
            this.title.split('').forEach((letter, index) => {
                delay += this.time / (this.title.length - 1);
                this.renderer2.setAttribute(this.elementRef.nativeElement.children[index], 'style', `transition: 0.4s; transition-delay: ${delay}s; opacity: 1;`)
            });
        }, 0);
    }
}
