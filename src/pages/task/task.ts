import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import Parse from 'parse';
import {fromPromise} from "rxjs/observable/fromPromise";
/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})

export class TaskPage {
  day:string = '0'; 
  month:string = 'monkey';
  year:string = '2019';
  date:string;
  click:boolean = false;
  length:string; 
  alreadyclicked:boolean = false;
  SameDate:boolean = false;
  OldDate:string = '16-16-2000';

  objectId:string;
  EstimatedTime:string;
  Vehicle:string;
  Instruction:string;
  StartPoint:string;
  Destination:string;
  ReferenceNumber:string;
  Service:string;

  years:string = "";
  months:string = "";
  days:string = "";

  objects = [];
  types: Array <any> = [];
  type:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    public toastCtrl: ToastController,
    ) {}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  refresh_year(event){
    this.years = event.value;
    this.year=event.value;
    console.log('year: '+this.years);
  }

  refresh_month(event){
    this.months = event.value;
    this.month=event.value;
    console.log('month: '+this.months);
  }

  refresh_day(event){
    this.days = event.value;
    console.log('day: '+this.days);
  }

  DateUpdate(){
    this.date = this.year + '-' + this.month + '-' + this.day;
    if (this.date != this.OldDate){
      this.OldDate = this.date;
      //this.SameDate = false;
      return true;
    }
    else{
      //this.SameDate = true;
      return false;
    }
  }

  async allTasks(){
    this.alreadyclicked = true;
    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
    
    this.date = this.year + '-' + this.month + '-' + this.day;
    //let date = '2020-06-01';

    tasks.equalTo("Date", this.date);
    const results = await tasks.find();

    this.length = results.length;

    for (let i=0; i< results.length; i++){
      this.type = results[i];
      this.types.push(this.type.id);
    }
  }

  async viewTask(objectId){
    this.click = true;
    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
    this.date = this.year + '-' + this.month + '-' + this.day;

    tasks.equalTo("objectId", this.objectId);
    const results = await tasks.find();

    for (let i=0; i< results.length; i++){
      var object = results[i];
      this.objects = [
      object.id,
      object.get('EstimatedTime'),
      object.get('Vehicle'),
      object.get('Instruction'),
      object.get('StartPoint'),
      object.get('Destination'),
      object.get('ReferenceNumber'),
      object.get('Service'),
    ]; 
    }
    this.objectId = this.objects[0];
    this.EstimatedTime = this.objects[1];
    this.Vehicle = this.objects[2];
    this.Instruction = this.objects[3];
    this.StartPoint = this.objects[4];
    this.Destination = this.objects[5];
    this.ReferenceNumber = this.objects[6];
    this.Service = this.objects[7];
  }
}
