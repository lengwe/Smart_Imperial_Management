import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  // taskinfo:string;
  taskinfo: Array<any>=[];
  taskdata: Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //console.log('Employee username: '+this.username+'year'+this.year+this.month+this.day);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
  }
  async sortTask(){
    this.taskinfo=[];
    console.log('Employee username: '+this.username+' sort date: '+this.year+this.month+this.day);
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
      //console.log('month');
    }
    if(this.year!=""){
      tasks.equalTo("Year", this.year);
      //console.log('year');
    }
    
    const results = await tasks.find();
    for (let i = 0; i < results.length; i++) {
      var object = results[i];
      console.log(object.id);
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
      for(let i=0;i<this.taskinfo.length;i++){
        console.log('beforesort: '+this.taskinfo[i].distance);
      }
      this.taskinfo.sort(this.compare);
      for(let i=0;i<this.taskinfo.length;i++){
        console.log('aftersort: '+this.taskinfo[i].distance);
      }
      //console.log('homepush: '+this.taskinfo.length+' '+ this.taskinfo[0].object+this.taskinfo[0].distance);
    }
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
    console.log('year: '+this.year);
  }

  refresh_month(event){
    this.month = event.value;
    console.log('month: '+this.month);
  }

  refresh_day(event){
    this.day = event.value;
    console.log('day: '+this.day);
  }
}