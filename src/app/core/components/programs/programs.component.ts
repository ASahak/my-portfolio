import {Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
    cardAnimation
} from '@app/animation';
import {
    Programms
} from '@corePath/models/common';

@Component({
    selector: 'app-programs',
    templateUrl: './programs.component.html',
    styleUrls: ['./programs.component.scss'],
    animations: [cardAnimation]
})
export class ProgramsComponent implements OnInit, AfterViewInit {

    public myPrograms: Array<Programms> = [
        {
            name: 'Who want to be a millionaire',
            isPublic: true,
            link: 'https://asahak.github.io/Millionare/index.html',
            language: 'AngularJS',
            preparedDate: 1503432000000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535650717853_programs1.jpg?alt=media&token=f1a403b7-33ca-43d2-9715-110a9ba861c0',
        }, {
            name: 'Guess The Picture',
            isPublic: true,
            link: 'https://asahak.github.io/Guess-the-picture/',
            language: 'AngularJS',
            preparedDate: 1515700800000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652048557_programs2.jpg?alt=media&token=1008d7a6-e055-4a1f-8ac4-58626aa1bf6b'
        }, {
            name: 'Puzzle',
            isPublic: true,
            link: 'https://asahak.github.io/Puzzle/',
            language: 'AngularJS',
            preparedDate: 1508443200000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652142660_programs3.jpg?alt=media&token=5c2bf235-cae8-4094-9562-bb599726aebf'
        }, {
            name: 'Arm-Eng Dictionary',
            isPublic: true,
            link: 'https://asahak.github.io/Dictionary/',
            language: 'AngularJS',
            preparedDate: 1484424000000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652272383_programs4.jpg?alt=media&token=10fdc3c2-aa1b-49d5-a80c-5c2338f015cd'
        }, {
            name: 'Arm-Eng Dictionary',
            isPublic: true,
            language: 'JS',
            link: 'https://asahak.github.io/Tic-tac-toe/',
            preparedDate: 1519070400000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652355466_programs5.jpg?alt=media&token=6b99613b-0fbf-4db9-a055-efc2a8b29d66'
        }, {
            name: 'Todo jQuery',
            isPublic: true,
            link: 'https://asahak.github.io/todo-jquery/',
            language: 'jQuery',
            preparedDate: 1491940800000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652454347_programs6.jpg?alt=media&token=586c0ef7-cdd9-431d-b7ea-b4fb8ae1a086'
        }, {
            name: 'Smile Duck',
            isPublic: true,
            language: 'JS',
            link: 'https://asahak.github.io/Smile-Duck/',
            preparedDate: 1495656000000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652539260_programs7.jpg?alt=media&token=b2739973-0e22-4eae-be6a-93d1124021be'
        }, {
            name: 'Memory',
            isPublic: true,
            link: 'https://asahak.github.io/Memory/',
            language: 'jQuery',
            preparedDate: 1500753600000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652625991_programs8.jpg?alt=media&token=775cce67-8380-4612-8ae8-edcc1e820e48'
        }, {
            name: 'Mario Bird',
            isPublic: true,
            language: 'JS',
            link: 'https://asahak.github.io/mario-bird/',
            preparedDate: 1506715200000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652705935_programs9.jpg?alt=media&token=201b12d0-79b0-45d8-b562-8ec1d58d652e'
        }, {
            name: 'JS Quiz',
            isPublic: true,
            language: 'JS',
            link: 'https://asahak.github.io/JS-QUIZ/',
            preparedDate: 1508875200000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652779936_programs10.jpg?alt=media&token=451e2759-52b4-49b9-b143-ee798330693f'
        }, {
            name: 'Calculator JS',
            isPublic: true,
            link: 'https://asahak.github.io/Calculator/',
            language: 'JS',
            preparedDate: 1521921600000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652852440_programs11.jpg?alt=media&token=3d7d69fd-de53-48e1-bf37-3e7113d6eb2a'
        }, {
            name: 'Baqos',
            isPublic: true,
            link: 'https://asahak.github.io/Baqos/',
            language: 'jQuery',
            preparedDate: 1489953600000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535652978701_programs12.jpg?alt=media&token=c3bd2b84-1729-4bc9-b991-ca9e51fde9b9'
        }, {
            name: 'Todo Angular',
            isPublic: true,
            language: 'AngularJS',
            link: 'https://asahak.github.io/angular-todo/',
            preparedDate: 1519934400000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535653057968_programs13.jpg?alt=media&token=1b5503f2-89cc-40ad-b7f1-c99009f74f59'
        }, {
            name: 'GEOASTRO',
            isPublic: true,
            language: 'Angular 2+',
            link: 'https://geo-encyclopedia.firebaseapp.com/',
            preparedDate: 1534968000000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535653223470_programs14.jpg?alt=media&token=cce03c3b-fe99-4081-b6cb-74de3d788678'
        }, {
            name: 'My Portfolio',
            isPublic: true,
            language: 'Angular 2+',
            link: 'https://my-cv-ac336.firebaseapp.com/home',
            preparedDate: 1590868800000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1535658824589_sadsd.jpg?alt=media&token=e99e5b1c-92be-417e-a1ba-4faff7c172d5'
        }, {
            name: 'Learn English',
            isPublic: true,
            link: 'https://learn-words-english.firebaseapp.com/',
            language: 'Vue',
            preparedDate: 1538596800000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1538676041335_%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.jpg?alt=media&token=f0f7ab88-8cef-4b25-8e9f-3aeb6c870006'
        }, {
            name: 'Weather Network',
            isPublic: true,
            link: 'https://weathernetwork.herokuapp.com/',
            language: 'Vue',
            preparedDate: 1544385600000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1544644543278_ff.png?alt=media&token=e7ccfa5a-e7be-4b8e-a57e-8a86c6333aa8'
        }, {
            name: 'Keep a Pig',
            isPublic: true,
            link: 'https://asahak.github.io/keep-a-pig/index.html',
            language: 'JS',
            preparedDate: 1548619200000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1548707967384_Untitled-1.jpg?alt=media&token=f720c71e-3ca5-4042-b9e3-860fefa5f483'
        }, {
            name: 'Fram Shop',
            isPublic: true,
            language: 'Angular 2+',
            link: 'https://fram-shop.firebaseapp.com/',
            preparedDate: 1550088000000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1550003377935_Untitled-1.jpg?alt=media&token=1fdd98fe-0a80-48fc-b33d-25ce521a5277'
        }, {
            name: 'Boat Pilot',
            isPublic: false,
            link: 'https://demo.boatpilot.me/fleetadmin/',
            language: 'Vue',
            preparedDate: 1555531200000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1558130517765_Untitled-1.png?alt=media&token=bf70cfd3-64e8-415a-92ed-a4c2d5038084'
        }, {
            name: 'Chart Canvas',
            isPublic: true,
            language: 'JS',
            link: 'https://asahak.github.io/ChartCANVAS/dist/index.html',
            preparedDate: 1582833600000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1583004701580_Screenshot_1.png?alt=media&token=7d09afa4-5b9f-4b54-8f84-d914d4a8ecff'
        }, {
            name: 'Crypto',
            isPublic: true,
            link: 'https://crypto-graphy-polytechnic.now.sh/',
            language: 'ReactJS',
            preparedDate: 1588449600000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1548707967384_Untitled-1.jpg?alt=media&token=f720c71e-3ca5-4042-b9e3-860fefa5f483'
        }, {
            name: 'PicSnippet',
            isPublic: false,
            link: 'https://picsnippets.buckeyedev.com/login',
            language: 'Vue',
            preparedDate: 1592856000000,
            linkURL: 'https://firebasestorage.googleapis.com/v0/b/my-cv-ac336.appspot.com/o/ProgramsPhotos%2F1548707967384_Untitled-1.jpg?alt=media&token=f720c71e-3ca5-4042-b9e3-860fefa5f483'
        }
    ];
    public filteredProgrammes: Array<Programms> = this.myPrograms;
    public publicLanguage: string = '*';
    constructor () {}
    public filterPrograms (type) {
        if (type === '*') {
            this.filteredProgrammes = this.myPrograms;
        } else {
            this.filteredProgrammes = this.myPrograms.filter(item => item.language === type);
        }
        this.publicLanguage = type;
        return this.filteredProgrammes;
    }
    public generateBtns () {
        return this.myPrograms.reduce((acc, item) => {
            if (acc.indexOf(item.language) === -1) {
                acc.push(item.language);
            }
            return acc;
        }, []);
    }
    ngOnInit (): void {
    }
    ngAfterViewInit (): void {
    }

}
