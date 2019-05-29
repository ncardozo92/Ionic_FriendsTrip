import { Component, OnInit,AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from "./services/user.service"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit, OnInit {
    
  public appPages = [
    {
      title: 'Búsqueda',
      url: '/search'
    },
    {
      title: 'Perfil',
      url: '/profile'
    },
    {
      title: "Mis viajes",
      url: "/travels-list"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router :Router,
    private sessionService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
}
