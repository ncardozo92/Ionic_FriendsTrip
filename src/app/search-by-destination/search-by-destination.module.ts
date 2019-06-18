import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchByDestinationPage } from './search-by-destination.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByDestinationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchByDestinationPage]
})
export class SearchByDestinationPageModule {}
