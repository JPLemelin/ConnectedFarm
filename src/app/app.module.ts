import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods  } from 'angularfire2';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
