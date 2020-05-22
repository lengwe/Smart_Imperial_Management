import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  current: Marker;
  markers: Array<Marker> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get("data");
    this.current = data.current;
    this.markers = data.markers || [];
    console.log('Markers received', data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
  }

}

export interface Marker {
  lat?: number,
  lng: number,
  label?: string

}
