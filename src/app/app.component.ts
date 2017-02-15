import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Pipe, PipeTransform } from '@angular/core';
import { Fan, createDevice, DeviceOutput } from './device'

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
  settings_devices_fans: FirebaseListObservable<any[]>;


  fans:{[id: string] : Fan;} = {};


  constructor(public af: AngularFire) {
    this.devices_current_status = af.database.list('/current');
    this.devices_history = af.database.list('/history');
    this.settings = af.database.list('/settings');

    this.af.database.list('/settings/devices/fans').subscribe(fans => {
      fans.forEach(fan => {

        console.log(fan);
        this.fans[fan.$key] = new Fan(af, fan.name, fan.device_type, fan.device_id);

      })

      console.log(this.fans);
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


@Pipe({ name: 'mapToListOfValue', pure: false})
export class MapToListOfValue implements PipeTransform {
  transform(obj: {}) {
    return Object.keys(obj).map(key => obj[key])
  }
}
