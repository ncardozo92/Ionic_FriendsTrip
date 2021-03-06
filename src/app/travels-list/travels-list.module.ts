import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TravelsListPage } from './travels-list.page';
import { TravelComponent } from '../travel/travel.component';

const routes: Routes = [
  {
    path: '',
    component: TravelsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TravelsListPage,TravelComponent]
})
export class TravelsListPageModule {}
