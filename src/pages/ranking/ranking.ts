import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
  username="";
  year="";
  month="";
  day="";
  stop: any=[];
  destination: string;
  distance:string;
  time:string;
  instruction:string;
  task:string;
  date:string;
  service: string;
  number:string;
  vehicleid:string;
  complete:string;
  object:string;

  servicetype:any=[];
  
  // taskinfo:string;
  taskinfo: Array<any>=[];
  taskdata: Array<any>=[];
  fleetinfo: Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //console.log('Employee username: '+this.username+'year'+this.year+this.month+this.day);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
  }
  async sortTask(){
    this.taskinfo=[];
    //console.log('Employee username: '+this.username+' sort date: '+this.year+this.month+this.day);
    let Tasks = Parse.Object.extend('Task')
    let tasks = new Parse.Query(Tasks);

    if(this.username!=""){
      tasks.equalTo("Username", this.username);
      //console.log('username');
    }
    if(this.day!=""){
      tasks.equalTo("Day", this.day);
      console.log('day'+this.day);
    }
    if(this.month!=""){
      tasks.equalTo("Month", this.month);
      console.log('month'+this.month);
    }
    if(this.year!=""){
      tasks.equalTo("Year", this.year);
      //console.log('year');
    }
    if(this.servicetype!=""){
      //this.servicetype=this.serviceoriginal;
      tasks.equalTo("ServiceType", this.servicetype);
    }

    const results = await tasks.find();
    console.log('checkresult:'+results.length);
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      //console.log(object.id);
      var info ={
      username: object.get('Username'),
      stop    : object.get('StopPoint'),
      destination:  object.get('Destination'),
      distance: object.get('Distance'),
      time    : object.get('EstimatedTime'),
      service : object.get('ServiceType'),
      number:object.get('ReferenceNumber'),
      date    : object.get('Date'),
      complete: object.get('Complete'),
      vehicletype : object.get('VehicleType'),
      vehicleid :object.get('VehicleID'),
      task    : object.get('TaskType'),
      instruction: object.get('Instruction'),
      object  :    object.id
      };
      this.taskinfo.push(info);
    }
    if(this.taskinfo.length==0){
      alert('No task found!');
    }else{
      this.taskinfo.sort(this.compare);
    }

    this.fleetinfo=[];
    let Fleets = Parse.Object.extend("FleetT")
    let fleets = new Parse.Query(Fleets);
    fleets.notEqualTo("VehicleID","");
    if(this.servicetype!=""){
      fleets.equalTo("ServiceType", this.servicetype);
    }
    const vehicleresults = await fleets.find();
    for (let i = 0; i < vehicleresults.length; i++) {
      var object = vehicleresults[i];
      var vehicleinfo ={
        vehicleid:object.get('VehicleID'),
        vehiclemodel:object.get('VehicleModel'),
        charging:object.get('ChargingLevel'),
        servicetype:object.get('ServiceType')
      };
      this.fleetinfo.push(vehicleinfo);
    }
    this.fleetinfo.sort(this.chargcompare);
    // for(let i=0;i<this.fleetinfo.length;i++){
    //   console.log('chargingcheck: '+this.fleetinfo[i].charging);
    // }
    if(this.taskinfo.length>this.fleetinfo.length){
      for(let i=this.fleetinfo.length;i<this.taskinfo.length;i++){
        this.taskinfo[i].vehicleid='No Vehicle Available';
        this.taskinfo[i].charging='No Vehicle Available';
        this.taskinfo[i].vehicletype='No Vehicle Available'//需要改动
      }
      for(let i=0;i<this.fleetinfo.length;i++){
        this.taskinfo[i].vehicleid=this.fleetinfo[i].vehicleid;
        this.taskinfo[i].charging=this.fleetinfo[i].charging;
        this.taskinfo[i].vehicletype=this.fleetinfo[i].vehiclemodel;//必要改动
        console.log('chargingcheck0: '+this.fleetinfo[i].vehiclemodel);
        this.freshtask(i);
      }
    }else{
      for(let i=0;i<this.taskinfo.length;i++){
        this.taskinfo[i].vehicleid=this.fleetinfo[i].vehicleid;
        this.taskinfo[i].charging=this.fleetinfo[i].charging;
        this.taskinfo[i].vehicletype=this.fleetinfo[i].vehiclemodel;//必要改动
        console.log('chargingcheck1: '+this.fleetinfo[i].vehiclemodel);
        this.freshtask(i);
      }
    }


      //console.log('homepush: '+this.taskinfo.length+' '+ this.taskinfo[0].object+this.taskinfo[0].distance);
  }
  freshtask(i){
    console.log('chargingtaskcheck: '+this.taskinfo[i].vehicletype);
    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
      tasks.get(this.taskinfo[i].object)
      .then((player)=>{
        player.set('VehicleID',this.taskinfo[i].vehicleid);
        player.set('VehicleType',this.taskinfo[i].vehicletype);//需要改动
        player.save();
      });
  }
  chargcompare(a,b){
    const distancea=a.charging;
    const distanceb=b.charging;
    let comparison=0;
    if((distancea-distanceb)>0){
      comparison=-1;
    }else if((distancea-distanceb)<0){
      comparison=1;
    }
    return comparison;
  }
  compare(a,b){
    const distancea=a.distance;
    const distanceb=b.distance;
    let comparison=0;
    if((distancea-distanceb)>0){
      comparison=-1;
    }else if((distancea-distanceb)<0){
      comparison=1;
    }
    return comparison;
  }
  refresh_year(event){
    this.year = event.value;
    //console.log('year: '+this.year);
  }

  refresh_month(event){
    this.month = event.value;
    //console.log('month: '+this.month);
  }

  refresh_day(event){
    this.day = event.value;
    //console.log('day: '+this.day);
  }
  refresh_service(event) {
    this.servicetype =event.value
  }
}
