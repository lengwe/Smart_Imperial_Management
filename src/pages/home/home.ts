import { FleetPage } from './../fleet/fleet';
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import Parse from 'parse';
import {Marker} from "../maps/maps";
import {fromPromise} from "rxjs/observable/fromPromise";
import { Store, ActionReducer } from '@ngrx/store';

@IonicPage({
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  geoposition: Geoposition;
  chartinfo: Array<any>=[];
  counterresult:Array<any>=[];
  username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    private store: Store<any>
  ) {
    let data  = Parse.User.current();
    this.username = data.get("username");
    console.log("username: ", this.username);
    this.store.dispatch({
      type: "LOGIN",
      payload: this.username
    });
  }

  async profile() {
    let Managers = Parse.Object.extend('Manager')
    let managers = new Parse.Query(Managers);
    managers.equalTo("Username", this.username);
    const results = await managers.find();

    var info = {Title:results[0].get('Title'),
                FirstName:results[0].get('FirstName'),
                LastName: results[0].get('LastName'),
                Gender: results[0].get('Gender'),
                // ServiceDepartment: results[0].get('ServiceDepartment'),
                ManagerID: results[0].get('ManagerID'),
                Username: results[0].get('Username'),
                Password: results[0].get('Password'),
                PhoneNumber: results[0].get('PhoneNumber'),
                EmailAddress: results[0].get('EmailAddress'),

              };
    this.store.dispatch({
      type: "PROFILE",
      payload: info
    });

    this.navCtrl.push('ProfilePage');
  }

  getAllVehicle() {
    let query = new Parse.Query('Fleet');

    query.find().then(vehicles => {
      console.log('Vehicle', vehicles);

      let fleet = vehicles.map(v => {
        return {
          lat: v.get('Position').latitude,
          lng: v.get('Position').longitude,
          label: v.get('VehicleID'),
          ChargingLevel: v.get('ChargingLevel'),
          Model: v.get('VehicleModel')
        };
      });

      this.store.dispatch({
        type:"VEHICLE",
        payload:fleet
      });

      this.navCtrl.push('MapsPage');

    }, err => {
      console.log('Error getting Evs', err)
    })
  }

  goTask(){
    this.navCtrl.push('TaskPage');
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }

  gotofleetpage(){
    this.navCtrl.push('FleetPage');
  }

  goRanking(){
    this.navCtrl.push('RankingPage');
  }

  async gopowerconsumption(){
    let Powers = Parse.Object.extend("Task")
    let powers = new Parse.Query(Powers);

    powers.equalTo("Complete","Yes");
    const powersresults = await powers.find();
    for (let i = 0; i < powersresults.length; i++) {
      var object = powersresults[i];
      var powerinfo ={
        vehicleid:object.get('VehicleID'),
        vehiclemodel:object.get('VehicleModel'),
        charging:object.get('ChargingLevel'),
        date:object.get('Date'),
        service:object.get('ServiceType'),
        objectid:object.id,

        day:object.get('Day'),
        month:object.get('Month'),
        year:object.get('Year')
      };
      this.chartinfo.push(powerinfo);
    }

    for(let i=0;i<this.chartinfo.length;i++){
      let Powers_Charging = Parse.Object.extend("FleetT")
      let powers_charging = new Parse.Query(Powers_Charging);
      powers_charging.equalTo("VehicleID",this.chartinfo[i].vehicleid);
      const chargingresults = await powers_charging.find();
      for(let i = 0; i < chargingresults.length; i++){
        var object_charging = chargingresults[i];
        var powercharging ={
          vehiclecharging: object_charging.get('ChargingLevel'),
          vehicleobjectid: object_charging.id
        }
      }
      this.chartinfo[i].charging=powercharging.vehiclecharging;
    }
    //console.log('sendcheck: '+this.chartinfo.length);
    this.store.dispatch({
      type: "CHART",
      payload: this.chartinfo
    });
    this.navCtrl.push('PowerPage');
  }
}



