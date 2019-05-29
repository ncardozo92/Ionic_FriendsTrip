import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistryPageModule } from './registry/registry.module';
import { RegistryPage } from './registry/registry.page';
import { IonicStorageModule } from "@ionic/storage";
import { GuideRegistryPageModule } from './guide-registry/guide-registry.module';
import { GuideRegistryPage } from './guide-registry/guide-registry.page';
import { TravelModalPage } from './travel-modal/travel-modal.page';
import { TravelModalPageModule } from './travel-modal/travel-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [RegistryPage, GuideRegistryPage,TravelModalPage],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RegistryPageModule,
    GuideRegistryPageModule,
    TravelModalPageModule,
    IonicStorageModule.forRoot({
      name: 'sessionData',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
