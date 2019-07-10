import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

import { RegistryPage } from "../registry/registry.page";
import { UserService } from "../services/user.service"
import { GuideRegistryPage } from '../guide-registry/guide-registry.page';
import { UserLogin } from '../models/UserLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private userLogin : UserLogin = new UserLogin();
  private userId: number = null;

  constructor(
    private modalController : ModalController,
    private alertController :AlertController ,
    private router : Router,
    private sessionService : UserService
  ) { }

  ngOnInit() {
    
    this.sessionService.getUserId().then(
      data => {
        if(data != null){
          this.router.navigate(["search"]);
        }
      },
      error => console.error(error)
    );

    if(this.userId != null)
      this.router.navigate(["search"]);
    
  }
  
  async showRegistryModal(role : String){

    let page: any;

    if(role == "traveler")
      page = RegistryPage;
    else if(role == "guide")
      page = GuideRegistryPage;

    const modal = await this.modalController.create({ component : page });

    return await modal.present();
    
  }
  

  async showAlert(message: string){

    const alert = await this.alertController.create({
      message : message,
      buttons : [{role : "cancel",text : "Aceptar"}]
    });

    return alert.present();
  }

  public login(){

      if(this.userLogin.usuario == undefined || this.userLogin.contrasenia == undefined){

          this.showAlert("Los campos no pueden estar vacíos");
        }
        else{

          this.sessionService.login(this.userLogin).subscribe(data=>{

            this.sessionService.saveUserData(data.body);
            this.router.navigate(["search"])
          }, error =>{

            switch(error.status){

              case 404: this.showAlert("usuario y/o contraseña incorrectos");
                        break;
              case 500: this.showAlert("Se ha producido un error en el servidor, inténtelo más tarde");
                        break;
            }
          });
      }
    }
}
