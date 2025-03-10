import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomePageRoutingModule } from './home-routing.module';
import { MapComponent } from "../components/map/map.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MapComponent
],
  declarations: [HomePage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class HomePageModule {}
