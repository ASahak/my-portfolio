import {
    Component,
    OnInit,
    OnDestroy,
    ViewContainerRef,
    AfterViewInit,
    Compiler,
    NgModule,
    Type,
    ComponentFactory,
    ViewChild, ComponentRef, ElementRef
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {SingleWorkComponent} from '@corePath/components/my-works/single-work/single-work.component';
import {Works} from '@corePath/interfaces/common';
import {RouterStateService} from '@app/shared/services/router-state.service';

@Component({
    selector: 'app-my-works',
    templateUrl: './my-works.component.html',
    styleUrls: ['./my-works.component.scss']
})
export class MyWorksComponent implements OnInit, OnDestroy, AfterViewInit {
    public myWorks: Array<Works>        = [
        {
            name: 'Futura',
            preparedDate: 1532030400000,
            link: 'http://futura.am/am/index.html',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535688679510_work1.jpg?alt=media&token=8f9067cd-d48f-4bbb-9dac-2bb1c296a0ff'
        }, {
            name: 'GreenLand',
            preparedDate: 1526068800000,
            link: 'http://greenland.bu.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535688794597_work2.jpg?alt=media&token=222256e6-1145-43a5-bab3-9e52cbf7067f'
        }, {
            name: 'Universalorder',
            preparedDate: 1532808000000,
            link: 'http://universalorder.bu.am/arm/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535688918280_work3.jpg?alt=media&token=b69c4de2-59b1-4100-a6ab-2b2b5086b554'
        }, {
            name: 'Nur Die',
            preparedDate: 1518379200000,
            link: 'http://nurdie.bu.am/am/index.html',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689037784_work4.jpg?alt=media&token=adb74bba-5465-4c07-971d-07cae5e49509'
        }, {
            name: 'Ajo',
            preparedDate: 1523995200000,
            link: 'http://ajo.am/ru/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689124513_work5.jpg?alt=media&token=1deee0e0-cdaa-48a9-9e6a-8fcf3f59ae16'
        }, {
            name: 'Gortsiqner',
            preparedDate: 1521489600000,
            link: 'http://gortsiqner.bu.am/am/index.html',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689276350_work6.jpg?alt=media&token=06cf7571-c748-42af-8316-e033ba17fa29'
        }, {
            name: 'Aegis',
            preparedDate: 1529870400000,
            link: 'http://aegis.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689411690_work7.jpg?alt=media&token=4a2d4dcd-7cf9-4e5e-b663-dda27f4266b9'
        }, {
            name: 'Abajyan',
            preparedDate: 1530475200000,
            link: 'http://abajyan.bu.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689509803_work8.jpg?alt=media&token=7b86851c-dc03-4dec-86b8-85475bfbf96b'
        }, {
            name: 'Mix Paints',
            preparedDate: 1526414400000,
            link: 'http://mix-paints.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689725510_work9.jpg?alt=media&token=3efcda21-1744-4780-90a1-ccfa1a294107'
        }, {
            name: 'Krakmarich',
            preparedDate: 1529092800000,
            link: 'http://krakmarich.bu.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689844584_work10.jpg?alt=media&token=41d9a24b-1563-4fa9-abd1-706225296bf1'
        }, {
            name: 'Marena',
            preparedDate: 1522699200000,
            link: 'http://marena.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535689939010_work11.jpg?alt=media&token=b324d166-f9a4-41fb-94e2-9d0020860500'
        }, {
            name: 'Prestigemotors',
            preparedDate: 1531339200000,
            link: 'http://prestigemotors.bu.am/am/index.html',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690027534_work12.jpg?alt=media&token=50186530-e45d-487f-b48a-444f6aafd521'
        }, {
            name: 'VA & Partners',
            preparedDate: 1533240000000,
            link: 'http://vapartners.am/en/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690109600_work13.jpg?alt=media&token=643ec21b-1f1d-4c64-87d4-809725c4e842'
        }, {
            name: 'Bangi',
            preparedDate: 1531166400000,
            link: 'http://bangi.am/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690201118_work14.jpg?alt=media&token=ee448027-a96b-476b-9c34-b0e11fb71a1b'
        }, {
            name: 'BigLife',
            preparedDate: 1525291200000,
            link: 'http://biglife.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690273411_work15.jpg?alt=media&token=22367461-8ea5-4257-9dcb-7b192a3c5b29'
        }, {
            name: 'Aeroprime',
            preparedDate: 1534449600000,
            link: 'http://aeroprime.am/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690344027_work16.jpg?alt=media&token=57b9467f-c72e-40f2-9b84-a306b50a5deb'
        }, {
            name: 'Alvan',
            preparedDate: 1529784000000,
            link: 'http://alvan.am/am/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690417017_work17.jpg?alt=media&token=459b5609-1e2a-4664-abed-062c7210d9f8'
        }, {
            name: 'PandaTour',
            preparedDate: 1532808000000,
            link: 'http://www.pandatour.am/',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1535690499788_work18.jpg?alt=media&token=430c77c9-6f59-4c1d-baae-12784637d6b6'
        }, {
            name: 'ASPU Dance',
            preparedDate: 1532030400000,
            link: 'http://dancedep.am/am/index.html',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1543259423409_aspu.png?alt=media&token=b228a017-4d77-4c73-a8e8-239d6e79d2dd'
        }, {
            name: 'Iratek',
            preparedDate: 1495656000000,
            link: 'http://iratek.am/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1543259633283_iratek.png?alt=media&token=ba196f34-9943-4d71-b162-0c06f4a77af5'
        }, {
            name: 'Rasine',
            preparedDate: 1518379200000,
            link: 'http://www.rasine.am/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1543259857834_rasine.png?alt=media&token=fb70f475-cefe-47f1-970f-e37c246f0c55'
        }, {
            name: 'Redo\'Ro',
            preparedDate: 1524427200000,
            link: 'http://redoro.am/en/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1543259989353_redoro.png?alt=media&token=f6d163bc-2547-4622-90cb-c9517e3cb795'
        }, {
            name: 'EyeWay Social Network',
            preparedDate: 1553284800000,
            link: 'http://eyeway.am',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1543760231911_%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.jpg?alt=media&token=6cf1657b-f9df-4dd9-b9b4-cc8ca62ff2c4'
        }, {
            name: 'Logistics',
            preparedDate: 1531857600000,
            link: 'https://asahak.github.io/Logistics.io/index.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1544644456846_%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.png?alt=media&token=960a9274-c045-4606-b308-71ad190ed81b'
        }, {
            name: 'Intervisa',
            preparedDate: 1534449600000,
            link: 'http://intervisa.am/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1545590404171_Untitled-1.jpg?alt=media&token=9f8e5477-67ff-490d-b916-8c52e4dacf85'
        }, {
            name: 'Voskevaz',
            preparedDate: 1526241600000,
            link: 'http://voskevaz.bu.am/en/home.html',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1545812701855_vine.jpg?alt=media&token=6cd8ba79-dfa0-4c56-a4c1-f02d070f02a5'
        }, {
            name: 'Charity Pro',
            preparedDate: 1540324800000,
            link: 'https://asahak.github.io/Charity.io/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1549653956345_Untitled-1.jpg?alt=media&token=413f3aeb-fcec-46bf-9a9a-1a3e71e5b29e'
        }, {
            name: 'Fram Shop',
            preparedDate: 1550088000000,
            link: 'https://fram-shop.firebaseapp.com/',
            isPublic: true,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1550003427587_Untitled-1.jpg?alt=media&token=32db9969-1b95-4d02-bd3c-f92f032eed76'
        }, {
            name: 'BoatPilot',
            preparedDate: 1555531200000,
            link: 'https://demo.boatpilot.me/fleetadmin/',
            isPublic: false,
            linkUrl: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/WorkExperiencesPhotos%2F1558130463811_Untitled-1.png?alt=media&token=33a615d6-1be7-48b2-ad65-315d0f7cc98c'
        }
    ];
    public rowCount: number             = 4;
    public columnCount: number          = 4;
    public previousRoute: string        = '';
    private debounceDrawCards: any;
    private magicSlide: any;
    private showItems: any              = [];
    private rowsLeftRestrict            = {};
    @ViewChild('viewWorkContainer', {read : ViewContainerRef}) viewWorkContainer;
    constructor (
        private $el: ElementRef,
        private compiler: Compiler,
        private routingState: RouterStateService
    ) {
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
        for (let i = 0; i < Math.ceil(this.myWorks.length / this.rowCount); i++) {
            for (let j = 0; j < this.rowCount; j++) {
                if (i * this.rowCount + j < this.myWorks.length) {
                    this.createComponentFactory(SingleWorkComponent)
                        .then((factory: ComponentFactory<SingleWorkComponent>) => this.viewWorkContainer.createComponent(factory))
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
                            comp.instance.imgSrc        = this.myWorks[i * this.rowCount + j].linkUrl;
                            comp.instance.elementData   = everyElement;
                            comp.instance.dataPosition  = i * this.rowCount + j;
                            comp.instance.projectURL    = this.myWorks[i * this.rowCount + j].link;
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
            slideRow = (slideRow === this.rowCount - 1) ? 0 : slideRow += 1;
            new Array(Math.ceil(this.myWorks.length / this.rowCount)).fill('').map((el, index) => {
                if (index * this.rowCount + slideRow < this.myWorks.length) {
                    this.showItems[index * this.rowCount + slideRow].instance.elementData.x -= this.rowsLeftRestrict[slideRow]?.direction === 'left' ? divWidth : (-divWidth);
                }
            });
            if (Math.round(hostComputedData.width - this.rowsLeftRestrict[slideRow].width) === Math.round(this.showItems[slideRow].instance.elementData.x)) {
                this.rowsLeftRestrict[slideRow].direction = 'right';
            } else if (this.showItems[slideRow].instance.elementData.x >= 0 && this.showItems[slideRow].instance.elementData.x < divWidth){
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
        @NgModule({
            declarations: [
                componentType,
            ],
            imports: [BrowserModule, FormsModule]
        })
        class RuntimeComponentModule {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }
    ngOnInit (): void {
        addEventListener('resize', this.matchElementWidth.bind(this));
    }

    ngAfterViewInit () {
        this.previousRoute = this.routingState.getPreviousUrl();
        if (this.previousRoute) {
            setTimeout(() => {
                this.matchElementWidth();
            }, 3100);
        } else {
            this.matchElementWidth();
        }
    }
    ngOnDestroy (): void {
        clearInterval(this.magicSlide);
        removeEventListener('resize', this.matchElementWidth.bind(this));
    }
}
