import { Geoposition } from '@ionic-native/geolocation';
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
  latitude:number;
  longitude:number;
  geoposition:any;
  point: any;
  position: any;
  servicetype:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  async addfleet() {

    if ((this.vehicleid!=null)&&(this.vehiclemodel!=null)&&(this.charging!=null)&&
        (this.latitude!=null)&&(this.longitude!=null)&&(this.servicetype!=null)) {
        var list={
          vehicleid: this.vehicleid,
          vehiclemodel: this.vehiclemodel,
          charging: this.charging,
          servicetype: this.servicetype,
          latitude:this.latitude,
          longitude:this.longitude
        }
       this.fleetlist.push(list); 
    }
    
      this.point = new Parse.GeoPoint({
      latitude: this.latitude, 
      longitude: this.longitude});
    //console.log('fleetlist: '+this.point.latitude);
    const Fleets = Parse.Object.extend("FleetT");
    let fleets = new Parse.Query(Fleets);

    fleets.equalTo("VehicleID",this.vehicleid);
    const results = await fleets.find();
    if(results.length>0){
      await fleets.get(results[0].id)
      .then((player)=>{
        player.set('VehicleModel',this.vehiclemodel);
        player.set('ChargingLevel',this.charging);
        player.set('GeoPosition',this.point);
        player.set('ServiceType',this.servicetype);
        player.save();
      });
    }else{
      fleets = new Fleets();
      fleets.set("VehicleID", this.vehicleid);
      fleets.set("VehicleModel", this.vehiclemodel);
      fleets.set("ChargingLevel", this.charging);
      fleets.set("GeoPosition", this.point );
      fleets.set("ServiceType", this.servicetype);
      fleets.save();
    this.fleetlist.sort(this.compare);
    }

  }
  async viewfleet(){
    this.fleetinfo=[];
    let Fleets = Parse.Object.extend("FleetT")
    let fleets = new Parse.Query(Fleets);

    fleets.notEqualTo("VehicleID","");
    const results = await fleets.find();
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      var info ={
        vehicleid:object.get('VehicleID'),
        vehiclemodel:object.get('VehicleModel'),
        charging:object.get('ChargingLevel'),
        servicetype:object.get('ServiceType'),
        position:object.get('GeoPosition')
      };
      //console.log('checkposition:'+info.position.latitude);
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
      title: 'Update Vehicle Charging Level and Location',
      message: 'Please enter current charging level and location',
      inputs: [{ name: 'newcharging', placeholder: 'Charging Level' },
               { name: 'newlatitude', type: 'number', placeholder: 'Latitude'},
               { name: 'newlongitude',type: 'number', placeholder: 'Longitude'}],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {
                  if(data.newcharging!=''){
                    this.fleetinfo[i].charging = data.newcharging;
                  }
                  if((data.newlatitude!='')&&(data.newlongitude!='')){
                    this.position = new Parse.GeoPoint({
                      latitude: data.newlatitude, 
                      longitude: data.newlongitude});
                    //console.log('checkposition0: '+data.newlatitude);
                    //console.log('checkposition1: '+this.position.latitude);
                  }
                  this.freshfleet(i);       
                  }
                }
               ]
    });
  alert.present();
  }
  async freshfleet(i){
    if(this.position==null){
      this.position=this.fleetinfo[i].position;
    }else{
      this.fleetinfo[i].position=this.position;
    }
    //console.log('checkposition21: '+this.fleetinfo[i].position.latitude);
    //console.log('checkposition2: '+this.position.latitude);
    let Fleets = Parse.Object.extend('FleetT');
    let fleets = new Parse.Query(Fleets);
    fleets.equalTo("VehicleID", this.fleetinfo[i].vehicleid);
    const result = await fleets.find()
    //console.log('ID: '+result[0].id);
    await fleets.get(result[0].id)
    .then((player)=>{
      player.set('ChargingLevel',this.fleetinfo[i].charging);
      player.set('GeoPosition',this.fleetinfo[i].position);
      player.save();
    });
    this.viewfleet();
  }
  deletefleet(i){
    this.destroyfleet(i);
    this.fleetinfo.splice(i, 1);
  }
  async destroyfleet(i){
    let Fleets = Parse.Object.extend('FleetT');
    let fleets = new Parse.Query(Fleets);
    fleets.equalTo("VehicleID", this.fleetinfo[i].vehicleid);
    const result = await fleets.find()
    console.log('ID: '+result[0].id);
    await fleets.get(result[0].id)
    .then((player)=>{
      player.destroy();
    });
  }
  selectedVehicle(event){
    this.vehiclemodel=event.value;
  }
  selectedService(event){
    this.servicetype=event.value;
  }

  
}
