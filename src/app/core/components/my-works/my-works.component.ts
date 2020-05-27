import {
    Component,
    OnInit,
    OnDestroy,
    ViewContainerRef,
    Compiler,
    NgModule,
    Type,
    ComponentFactory,
    ViewChild, ComponentRef, ElementRef
} from '@angular/core';
import {SingleWorkComponent} from '@corePath/components/my-works/single-work/single-work.component';
import {RouterStateService} from '@app/shared/services/router-state.service';
import {Common} from '@app/core/enums';
import {FirebaseSnapshotsService} from '@app/shared/services/firebase-snapshots.service';
import {AuthService} from '@app/shared/services/auth.service';

@Component({
    selector: 'app-my-works',
    templateUrl: './my-works.component.html',
    styleUrls: ['./my-works.component.scss']
})
export class MyWorksComponent implements OnInit, OnDestroy {
    public myWorks: any                 = [];
    public rowCount: number             = 4;
    public columnCount: number          = 4;
    public previousRoute: string        = '';
    private debounceDrawCards: any;
    private magicSlide: any;
    private showItems: any              = [];
    private rowsLeftRestrict            = {};
    public pageName: string             = Common.pageProjectName;
    public fieldWorksName: string       = Common.pageWorksFieldName;
    public isLogged: boolean            = false;
    @ViewChild('viewWorkContainer', {read : ViewContainerRef}) viewWorkContainer: ViewContainerRef;
    constructor (
        private $el: ElementRef,
        private compiler: Compiler,
        private routingState: RouterStateService,
        private firebaseService: FirebaseSnapshotsService,
        private authService: AuthService,
    ) {
        this.authService.isLoggedIn().subscribe(res => {
            this.isLogged = !!res;
        }, err => {
            this.isLogged = false;
            clearInterval(this.magicSlide);
            this.drawCards();
        });
        this.firebaseService.Works().subscribe(res => {
            this.myWorks = res.payload.data()['list'];
            this.previousRoute = this.routingState.getPreviousUrl();
            if (this.previousRoute) {
                setTimeout(() => {
                    this.matchElementWidth();
                }, 3100);
            } else {
                this.matchElementWidth();
            }
        });
    }

    private matchElementWidth () {
        this.viewWorkContainer?.clear();
        if (matchMedia('(max-width: 576px)').matches) {
            this.rowCount = 1;
            this.columnCount = 1;
        } else if (matchMedia('(min-width: 577px) and (max-width: 767px)').matches) {
            this.rowCount = 2;
            this.columnCount = 2;
        } else if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
            this.rowCount = 3;
            this.columnCount = 3;
        } else if (matchMedia('(min-width: 992px) and (max-width: 1400px)').matches) {
            this.rowCount = 3;
            this.columnCount = 4;
        } else if (matchMedia('(min-width: 1401px)').matches) {
            this.rowCount = 4;
            this.columnCount = 5;
        }
        if (this.debounceDrawCards) {
            clearTimeout(this.debounceDrawCards);
        }
        this.debounceDrawCards = setTimeout(() => {
            this.drawCards();
        }, 400);
    }
    private drawCards () {
        this.rowsLeftRestrict = {};
        this.showItems = [];
        let divWidth: number = 0;
        let divHeight: number = 0;
        const hostComputedData = this.$el.nativeElement.getBoundingClientRect();
        if (!this.isLogged ) {
            this.myWorks = this.myWorks.filter(project => project.isPublic === true);
        }
        for (let i = 0; i < Math.ceil(this.myWorks.length / this.rowCount); i++) {
            for (let j = 0; j < this.rowCount; j++) {
                if (i * this.rowCount + j < this.myWorks.length) {
                    this.createComponentFactory(SingleWorkComponent)
                        .then((factory: ComponentFactory<SingleWorkComponent>) => {
                            return this.viewWorkContainer.createComponent(factory);
                        })
                        .then((comp: ComponentRef<SingleWorkComponent>) => {
                            divWidth = hostComputedData.width / this.columnCount;
                            divHeight = hostComputedData.height / this.rowCount;
                            const everyElement: {width: number, height: number, x: number, y: number} = {
                                width: divWidth,
                                height: divHeight,
                                x: i * (hostComputedData.width / this.columnCount),
                                y: j * (hostComputedData.height / this.rowCount),
                            };
                            this.showItems.push(comp);
                            Object.assign(this.rowsLeftRestrict, {
                                [j]: {
                                    width: (this.rowsLeftRestrict[j]?.width || 0) + divWidth,
                                    direction: 'left'
                                }
                            });
                            comp.instance.isLogged       = this.isLogged;
                            comp.instance.isPublic       = this.myWorks[i * this.rowCount + j].isPublic;
                            comp.instance.pageName       = this.pageName;
                            comp.instance.idProject      = this.myWorks[i * this.rowCount + j].id;
                            comp.instance.fieldWorksName = this.fieldWorksName;
                            comp.instance.name           = this.myWorks[i * this.rowCount + j].name;
                            comp.instance.date           = this.myWorks[i * this.rowCount + j].preparedDate;
                            comp.instance.imgSrc         = this.myWorks[i * this.rowCount + j].linkURL;
                            comp.instance.elementData    = everyElement;
                            comp.instance.dataPosition   = i * this.rowCount + j;
                            comp.instance.projectURL     = this.myWorks[i * this.rowCount + j].link;
                        })
                        .catch((err: any) => console.error(err));
                }
            }
        }
        if (this.magicSlide) {
            clearInterval(this.magicSlide);
        }
        let slideRow: number = -1;
        this.magicSlide = setInterval(() => {
            let widthEveryLine = 0;
            slideRow = (slideRow === this.rowCount - 1) ? 0 : slideRow += 1;
            for (let i = 0; i < Math.ceil(this.myWorks.length / this.rowCount); i++) {
                if (this.showItems[i * this.rowCount + slideRow]) {
                    widthEveryLine += divWidth;
                }
            }
            if (Math.round(widthEveryLine) > Math.round(hostComputedData.width)) {
                new Array(Math.ceil(this.myWorks.length / this.rowCount)).fill('').map((el, index) => {
                    if (index * this.rowCount + slideRow < this.myWorks.length && this.showItems[index * this.rowCount + slideRow]) {
                        this.showItems[index * this.rowCount + slideRow].instance.elementData.x -= this.rowsLeftRestrict[slideRow]?.direction === 'left' ? divWidth : (-divWidth);
                    }
                });
            }
            if (Math.round(hostComputedData?.width - this.rowsLeftRestrict[slideRow]?.width) === Math.round(this.showItems[slideRow]?.instance.elementData.x)) {
                this.rowsLeftRestrict[slideRow].direction = 'right';
            } else if (this.showItems[slideRow]?.instance.elementData.x >= 0 && this.showItems[slideRow]?.instance.elementData.x < divWidth){
                this.rowsLeftRestrict[slideRow].direction = 'left';
            }
        }, 2000);
    }
    private createComponentFactory (componentType: Type<SingleWorkComponent>): Promise<ComponentFactory<SingleWorkComponent>> {
        const runtimeModule = this.createDynamicModule(componentType);
        // compile module
        return this.compiler
            .compileModuleAndAllComponentsAsync(runtimeModule)
            // All factories available in this module are returned instead of just the one we are interested in.
            // We filter the array to just get the factory for this componentType.
            .then(moduleWithFactories =>
                moduleWithFactories.componentFactories.find(fact => fact.componentType === componentType));
    }

    // The component could have been created dynamically with a similar approach,
    // for example to define its template dynamically.
    private createDynamicModule (componentType: Type<SingleWorkComponent>): any {
        const moduleClass = class RuntimeComponentModule {
        };
        NgModule({ imports: [], declarations: [componentType] })(moduleClass);

        // a module for just this Type
        return moduleClass;
    }
    ngOnInit (): void {
        addEventListener('resize', this.matchElementWidth.bind(this));
    }

    ngOnDestroy (): void {
        clearInterval(this.magicSlide);
        removeEventListener('resize', this.matchElementWidth.bind(this));
    }
}
