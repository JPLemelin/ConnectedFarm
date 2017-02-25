import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


import { Device } from './device'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  user = null;

  devices_current_status: FirebaseListObservable<any[]>;
  devices_history: FirebaseListObservable<any[]>;
  settings: FirebaseListObservable<any[]>;

  // trending_up trending_down trending_flat

  fans: Device<any>[];
  lights: Device<any>[];


  constructor(public af: AngularFire) {
    this.devices_current_status = af.database.list('/current');
    this.devices_history = af.database.list('/history');
    this.settings = af.database.list('/settings');

    // Fans
    this.af.database.list('/settings/devices/fans').subscribe(devices => {
      this.fans = [];
      devices.forEach(device => {
        this.fans.push(new Device(af, device.name, device.device_type, device.device_id));
      });

      console.log(this.fans);
    });

    // Lights
    this.af.database.list('/settings/devices/lights').subscribe(devices => {
      this.lights = [];
      devices.forEach(device => {
        this.lights.push(new Device(af, device.name, device.device_type, device.device_id));
      });

      console.log(this.lights);
    });



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

