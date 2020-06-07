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
    if (this.vehicleid!=null) {
        let task = this.vehicleid;
        this.fleetlist.push(task);
        this.fleetname = "";
    }
    console.log('fleetlist: '+this.fleetlist);
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
