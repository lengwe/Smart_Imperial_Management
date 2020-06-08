import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FleetPage } from './fleet';

@NgModule({
  declarations: [
    FleetPage,
  ],
  imports: [
    IonicPageModule.forChild(FleetPage),
  ],
})
export class FleetPageModule {}
