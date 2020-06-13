import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps,GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';
import { Store } from '@ngrx/store';

declare var google:any;

@IonicPage({
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map:any;
  @ViewChild('map') mapRef:ElementRef;
  markers: Array<Marker> = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>
    ) {

    this.store.select('ManagementReducer').subscribe(state => {
      this.markers = state.vehicle_info
      this
    });
    console.log('Markers received', this.markers);
  }

  ionViewDidEnter(){
    //console.log('ionViewDidLoad MapsPage');
    this.displayMap();
  }

  displayMap(){
    const location = new google.maps.LatLng(51.5074,0.1278);
    const options = {
      center:location,
      zoom:10,
      streetViewControl: false,
      mayTypeId:'hybrid'

    };

    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
    // this.map = GoogleMaps.create('map_canvas', mapOptions);
    for(var i=0;i<this.markers.length;i++){
      var contentstring = '<h2><b>Vehicle Information</b></h2>' + '<p><b>Vehicle ID</b>: ' + this.markers[i].label +'</p>'
      +'<p><b>Charging Level</b>: ' + this.markers[i].ChargingLevel +'%'+'</p>'
      +'<p><b>Vehicle Model</b>: ' + this.markers[i].Model +'</p>';

      const mark = new google.maps.LatLng(this.markers[i].lat,this.markers[i].lng);
      var infowindow = new google.maps.InfoWindow({
        content: contentstring,
      })


      var marker = this.addMarker(mark,this.map,contentstring);
      google.maps.event.addListener(marker, 'click', function(){

        infowindow.setContent(this.info);
        infowindow.open(this.map, this);
      })

    }
  }

  addMarker(position,map,content){

    return new google.maps.Marker({
      position,
      map,
      info: content,
      icon: "http://maps.google.com/mapfiles/kml/pal4/icon15.png"
    })
  }

}

export interface Marker {
  lat?: number,
  lng?: number,
  label?: string,
  ChargingLevel?:string,
  Model?:string
}
