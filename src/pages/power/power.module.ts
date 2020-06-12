import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PowerPage } from './power';
//import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PowerPage,
  ],
  imports: [
    IonicPageModule.forChild(PowerPage),
    //ChartsModule
  ],
})
export class PowerPageModule {}
