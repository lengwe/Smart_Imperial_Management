import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers } from '../pages/store/reducer/';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
//import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';

export function localStorageSyncReducer(reducers: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['ManagementReducer'], rehydrate: true})(reducers);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    MyApp,
    //HomePage
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQEij78AyPJs2k3DkIAOWM2O-SQuD8m8w'
    }),
    StoreModule.forRoot(reducers,{metaReducers}),
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpClientModule
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
