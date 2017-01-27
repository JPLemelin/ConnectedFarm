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
  
  constructor(public af: AngularFire) {
    this.devices_current_status = af.database.list('/current');
    this.devices_history = af.database.list('/history');
    this.settings = af.database.list('/settings');
  }
  
  login() {
    this.af.auth.login();
  }

  logout() {
   this.af.auth.logout();
  }
  
  title = 'Connected Farm Dashboard';
}
