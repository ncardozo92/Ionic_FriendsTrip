import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchByFlightPage } from './search-by-flight.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByFlightPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchByFlightPage]
})
export class SearchByFlightPageModule {}
