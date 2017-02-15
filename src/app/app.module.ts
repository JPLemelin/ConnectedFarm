import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthProviders, AuthMethods  } from 'angularfire2';
import { MdlModule } from 'angular2-mdl';

import { AppComponent, MapToListOfValue } from './app.component';
import { FanComponent } from './device.component'


export const firebaseConfig = {
    apiKey: "AIzaSyCFQrOJFNk_GLqClFLoaSpTYOylrUqY0Ec",
    authDomain: "connectedfarm-4ca22.firebaseapp.com",
    databaseURL: "https://connectedfarm-4ca22.firebaseio.com",
    storageBucket: "connectedfarm-4ca22.appspot.com",
    messagingSenderId: "650924833947"
  };

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    FanComponent,
    // FansComponent,
    MapToListOfValue,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MdlModule,  // See: http://mseemann.io/angular2-mdl/card
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
