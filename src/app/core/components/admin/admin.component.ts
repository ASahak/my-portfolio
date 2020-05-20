import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAIN_FONT_BLUE_COLOR} from '@app/core/constants';
import {ValidationService} from '@app/shared/services/form-validation.service';
import {AuthService} from '@corePath/services/auth.service';
import {Common} from '@corePath/enums';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    public adminForm: FormGroup;
    public loginProcess: boolean = false;
    public mainBlueColor: string  = MAIN_FONT_BLUE_COLOR;
    constructor (
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit (): void {
        this.adminForm  =  this.formBuilder.group({
            email: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }
    public login () {
        this.loginProcess = true;
        this.authService.loginEmail(this.adminForm.value.email, this.adminForm.value.password).then(res => {
            this.loginProcess = false;
            this.router.navigate([Common.homePath]);
        }).catch(err => {
            this.loginProcess = false;
            console.log(err.message);
        });
    }
}
