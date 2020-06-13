import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //using test ranking app
      Parse.initialize("xJ7F9Uixopap8zn7WGlXoWdQMtNaH3DmamCMnMI1", "TsOqkbfPfY7gUDoDluOJ59e5r3lBYLKLeBUSsmya");
      Parse.serverURL = 'https://parseapi.back4app.com/';

      Parse.User.currentAsync().then(user => {
        console.log('Logged user', user);

        this.rootPage = user ? 'HomePage' : 'LoginPage';
        // this.rootPage = 'MapsPage';
      }, err => {
        console.log('Error getting logged user');

        this.rootPage = 'LoginPage';
      })
    });
  }
}
