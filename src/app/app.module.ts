import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
//import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    //HomePage
  ],
  imports: [
    BrowserModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAQEij78AyPJs2k3DkIAOWM2O-SQuD8m8w'
    // }),
    IonicModule.forRoot(MyApp),
    ChartsModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
