import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


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
  fleetlist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  addfleet() {
    if (this.fleetname.length > 0) {
        let task = this.fleetname;
        this.fleetlist.push(task);
        this.fleetname = "";
    }
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
}
