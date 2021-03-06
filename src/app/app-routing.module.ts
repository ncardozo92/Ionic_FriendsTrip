import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'travels-list', loadChildren: './travels-list/travels-list.module#TravelsListPageModule' },
  { path: 'travel-modal', loadChildren: './travel-modal/travel-modal.module#TravelModalPageModule' },
  { path: 'invitations', loadChildren: './invitations/invitations.module#InvitationsPageModule' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'contact-modal', loadChildren: './contact-modal/contact-modal.module#ContactModalPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
