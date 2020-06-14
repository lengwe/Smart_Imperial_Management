import { Component} from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams } from 'ionic-angular';
import Parse from 'parse';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  firstname: string;
  lastname: string;
  username:string;
  password:string;
  title:string;
  phone: string;
  email: string;
  gender: string;
  service: string;
  ID: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,) {}
  selectedTitle(event) {
    this.title =event.value
  }
  selectedGender(event) {
    this.gender =event.value
  }
  selectedService(event) {
    this.service =event.value
  }

  async register(event){
    let query = new Parse.Query('Manager');
    query.equalTo("username", this.username);
    const results = await query.find();
    if (results.length>0){
      for (let i = 0; i < results.length; i++) {
        var object = results[i];
        alert(object.get('username') + ' is existed please choose a new username!');
        //this.navCtrl.setRoot('RegisterPage');
      }
    }else if((this.firstname ==null)||(this.lastname ==null)||(this.username ==null)||(this.password ==null)){
      alert('Please register your full name, username and password!');
      //this.navCtrl.setRoot('RegisterPage');
    }else{
      const User = Parse.Object.extend("User");
      const user = new User();
      user.set("username", this.username);
      user.set("password", this.password);
      user.set("Department","Manager");
      user.save();
      const Managers = Parse.Object.extend("Manager");
      const managers = new Managers();
      managers.set("Title", this.title);
      managers.set("FirstName", this.firstname);
      managers.set("LastName", this.lastname);
      managers.set("Username", this.username);
      managers.set("Password", this.password);
      managers.set("Gender", this.gender);
      managers.set("PhoneNumber", this.phone);
      managers.set("EmailAddress", this.email);
      managers.set("ManagerID", this.ID);
      // managers.set("ServiceDepartment", this.service);
      managers.save()
      .then((player) => {
        // Success
        alert('New manager is registered successfully: ' + this.username);
        this.toastCtrl.create({
             message: 'Account created successfully',
             duration: 2000
           })
        this.title = '';
        this.firstname = '';
        this.lastname = '';
        this.username = '';
        this.password = ' ';
        this.gender = '';
        this.phone = '';
        this.email = '';
        this.ID = '';
        this.service = '';
      }, (error) => {
        // Save fails
        alert('Failed to create new object, with error code: ' + error.message);
      });
      this.navCtrl.setRoot('LoginPage');
    }
  }
  goback(){
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
