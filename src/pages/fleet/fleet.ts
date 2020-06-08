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
  }
  compare(a,b){
    const charginga = a.charging;
    const chargingb = b.charging;
    return dateA - dateB;
  }
  updatefleet(i){
    let alert = this.alertCtrl.create({
      title: 'Update Vehicle Info?',
      message: 'Type in your new info to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {
                    this.fleetlist[i] = data.editTask; }
                }
               ]
  });
  alert.present();
  }
  deletefleet(i){
    this.fleetlist.splice(i, 1);
  }
  selectedVehicle(event){
    this.vehiclemodel=event.value;
  }
}
