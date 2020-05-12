import {Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import '@lib/escanvas.min';
import TagCanvas from '@lib/tagCanvas';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('myTagCloud') myTagCloud: ElementRef;
    @ViewChild('middleContent') middleContent: ElementRef;
    @ViewChild('rightPanel') rightPanel: ElementRef;
    constructor () {
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
    }
    ngOnInit (): void {
    }

    ngOnDestroy (): void {
        removeEventListener('resize', this.matchMediaCanvas);
    }
}
