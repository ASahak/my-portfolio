import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor (public afAuth: AngularFireAuth) {

    }

    isLoggedIn () {
        return new Observable(subscriber => {
            this.afAuth.authState.subscribe(
                (user) => {
                    if (user) {
                        subscriber.next(user);
                    } else {
                        subscriber.error('No logged user!');
                    }
                }
            );
        });
    }

    loginEmail (email: string, pass: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.signInWithEmailAndPassword(email, pass)
                .then(userData => resolve(userData),
                    err => reject(err));
        });
    }

    logOut () {
        return this.afAuth.signOut();
    }
}
