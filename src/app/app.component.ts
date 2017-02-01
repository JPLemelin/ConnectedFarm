import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  devices_current_status: FirebaseListObservable<any[]>;
  devices_history: FirebaseListObservable<any[]>;
  settings: FirebaseListObservable<any[]>;
  
  user = null;
  constructor(public af: AngularFire) {
    this.devices_current_status = af.database.list('/current');
    this.devices_history = af.database.list('/history');
    this.settings = af.database.list('/settings');

    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user.auth;
        this.user = {
          displayName: user.auth.displayName,
          email: user.auth.email,
          photoURL: user.auth.photoURL +'?sz=32',
        };
      }
      else {
        // user not logged in
        this.user = null;
      }
    });
  }
  
  login() {
    this.af.auth.login();
  }

  logout() {
   this.af.auth.logout();
  }
  
  title = 'Connected Farm Dashboard';
}
