import { Component, OnInit,AfterViewInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from "./services/user.service";
// OneSignal
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {
    
  public appPages = [
    {
      title: 'Búsqueda',
      url: '/search'
    }/*,
    {
      title: 'Perfil',
      url: '/profile'
    }*/,
    {
      title: "Mis viajes",
      url: "/travels-list"
    },
    {
      title: "Mis contactos",
      url: "/contacts"
    },
    {
      title: "Invitaciones",
      url: "/invitations"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router :Router,
    private sessionService: UserService,
    private oneSignal : OneSignal,
    private alertCtrl : AlertController,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // configuracion de OneSignal
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  ngOnInit() {
    
    this.sessionService.getUserId().then(
      data => {
        if(data != null){
          this.router.navigate(["search"]);
        }
      },
      error => console.error(error)
    );
  }

  ngAfterViewInit(): void {

    // No funciona bien el tema del back button en android
    this.platform.backButton.subscribe(()=>{
  
      if( this.router.url === "/search" || this.router.url === "/login")
        navigator['app'].exitApp();
    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('e0ccac9f-a2b0-4967-a204-d9c78bd6225f', '656124771287');
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {

      this.localNotifications.schedule({
        id: 1,
        title: data.payload.title,
        text: data.payload.body,
        sound: "none"
      });
    });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      //let additionalData = data.notification.payload.additionalData;
      this.router.navigate(["search"]);
    });
 
    this.oneSignal.endInit();
  }

  public logout(): void{

    this.sessionService.removeUserData().then(() => this.router.navigate(["login"]));
  }
}
