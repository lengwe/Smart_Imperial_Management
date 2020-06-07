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
  VehicleIDs = [];
  VehicleModels = [];
  Services = [];
  OperatorDescriptions = [];
  Caravail = [];
  charges = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController
    ){
      this.VehicleIDs = this.navParams.get("VehicleIDs");
      this.VehicleModels = this.navParams.get("VehicleModels");
      this.Services = this.navParams.get("Services");
      this.OperatorDescriptions = this.navParams.get("OperatorDescriptions");
      this.Caravail = this.navParams.get("Caravail");
      this.charges = this.navParams.get('charge');
  }

  addfleet() {
      let alert = this.alertCtrl.create({
        title: "Add a new Vehicle?",
        message: "Input Vehicle Details",
        inputs:[
          {
            name: "VehicleID",
            placeholder: "Vehicle ID"
          },
          {
            name: "VehicleModel",
            placeholder: "Vehicle Model"
          },
          {
            name: "Service",
            placeholder: "Service"
          },
          {
            name: "OperatorDescription",
            placeholder: "Operator Description"
          },
          {
            name: "Charge",
            placeholder: "Charging Level"
          },
        ],
        buttons:[
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text:"Add",
            handler: data =>{
              this.VehicleIDs.push(data.VehicleID);
              this.VehicleModels.push(data.VehicleModel);
              this.Services.push(data.Service);
              this.OperatorDescriptions.push(data.OperatorDescription);
              this.charges.push(data.Charge);
              this.Caravail.push(false);
            }
          }
        ]
        });
        alert.present();
  }

  updatefleet(index){
    let alert = this.alertCtrl.create({
      title: "Edit Vehicle Details?",
      message: "Input Vehicle Details",
      inputs:[
        {
          name: "VehicleID",
          placeholder: "Vehicle ID"
        },
        {
          name: "VehicleModel",
          placeholder: "Vehicle Model"
        },
        {
          name: "Service",
          placeholder: "Service"
        },
        {
          name: "OperatorDescription",
          placeholder: "Operator Description"
        },
        {
          name: "Charge",
          placeholder: "Charging Level"
        },
      ],
      buttons: [
        { 
          text: 'Cancel', 
          role: 'cancel' 
        },
        { 
          text: 'Update', 
          handler: data => {
            this.VehicleIDs[index] = data.editTask; 
            this.VehicleModels[index] = data.editTask;
            this.Services[index] = data.editTask;
            this.OperatorDescriptions[index] = data.editTask;
            this.charges[index] = data.editTask;
          }
          }
      ]
  });
  alert.present();
  }
  deletefleet(i){
    this.VehicleIDs.splice(i, 1);
    this.VehicleModels.splice(i, 1);
    this.Services.splice(i, 1);
    this.OperatorDescriptions.splice(i, 1);
    this.Caravail.splice(i, 1);
    this.charges.splice(i, 1);
  }

  
}
