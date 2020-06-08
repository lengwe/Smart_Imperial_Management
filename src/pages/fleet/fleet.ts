import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import Parse from 'parse';

/**
 * Generated class for the FleetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-fleet',
  templateUrl: 'fleet.html',
})
export class FleetPage {
  fleetlist: Array<any>=[];
  fleetinfo: Array<any>=[];
  vehiclemodel:string;
  vehicleid:string;
  charging:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  addfleet() {
    if ((this.vehicleid!=null)&&(this.vehiclemodel!=null)&&(this.charging!=null)) {
        var list={
          vehicleid: this.vehicleid,
          vehiclemodel: this.vehiclemodel,
          charging: this.charging
        }
       this.fleetlist.push(list); 
    }
    console.log('fleetlist: '+this.fleetlist[0].charging);
    const Fleets = Parse.Object.extend("Fleet");
    const fleets = new Fleets();
      fleets.set("VehicleID", this.vehicleid);
      fleets.set("VehicleModel", this.vehiclemodel);
      fleets.set("ChargingLevel", this.charging);
      fleets.save();
    this.fleetlist.sort(this.compare);
    //this.viewfleet();
  }
  async viewfleet(){
    this.fleetinfo=[];
    let Fleets = Parse.Object.extend("Fleet")
    let fleets = new Parse.Query(Fleets);
    //var fleetinfo = [];
    fleets.notEqualTo("VehicleID","");
    const results = await fleets.find();
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      var info ={
        vehicleid:object.get('VehicleID'),
        vehiclemodel:object.get('VehicleModel'),
        charging:object.get('ChargingLevel')
      };
      this.fleetinfo.push(info);
    }
    this.fleetinfo.sort(this.compare);
  }
  compare(a,b){
    const charginga=a.charging;
    const chargingb=b.charging;
    let comparison=0;
    if((charginga-chargingb)>0){
      comparison=-1;
    }else if((charginga-chargingb)<0){
      comparison=1;
    }
    return comparison;
  }

  updatefleet(i){
    let alert = this.alertCtrl.create({
      title: 'Update Vehicle Charging Level',
      message: 'Please enter current charging level',
      inputs: [{ name: 'newcharging', placeholder: 'Charging Level' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {
                    this.fleetinfo[i].charging = data.newcharging;
                    this.freshfleet(i); }
                }
               ]
    });
  alert.present();
  }
  async freshfleet(i){
    let Fleets = Parse.Object.extend('Fleet');
    let fleets = new Parse.Query(Fleets);
    fleets.equalTo("VehicleID", this.fleetinfo[i].vehicleid);
    const result = await fleets.find()
    console.log('ID: '+result[0].id);
    await fleets.get(result[0].id)
    .then((player)=>{
      player.set('ChargingLevel',this.fleetinfo[i].charging);
      player.save();
    });
  }
  deletefleet(i){
    this.destroyfleet(i);
    this.fleetinfo.splice(i, 1);
  }
  async destroyfleet(i){
    let Fleets = Parse.Object.extend('Fleet');
    let fleets = new Parse.Query(Fleets);
    fleets.equalTo("VehicleID", this.fleetinfo[i].vehicleid);
    const result = await fleets.find()
    //console.log('ID: '+result[0].id);
    await fleets.get(result[0].id)
    .then((player)=>{
      player.destroy();
    });
  }
  selectedVehicle(event){
    this.vehiclemodel=event.value;
  }

  
}
