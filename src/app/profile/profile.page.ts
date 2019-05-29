import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private enableEmailEdit = false;

  constructor(
    private alertController : AlertController, 
    private userService: UserService,
    private router: Router,
    private toastController: ToastController
    ) { }

  ngOnInit() {
  }

  public updateEmail(){

    console.log("email actualizado");
    this.changeEmailEdition();
  }

  public changeEmailEdition(){

    this.enableEmailEdit = !this.enableEmailEdit;
  }
  
  async showAlertChangePassword(){

    const alert = await this.alertController.create({

      header : "cambio de contraseña",
      inputs : [
        {
          name : "currentPassword",
          type : "password",
          placeholder: "Contraseña actual"
        },
        {
          name : "newPassword1",
          type : "password",
          placeholder: "Contraseña nueva"
        },
        {
          name : "newPassword2",
          type : "password",
          placeholder: "Confirmar contraseña nueva"
        }
      ],
      buttons :[
        {
          text : "Cancelar",
          role : "cancel"
        },
        {
          text : "Cambiar",
          handler : (data)=>{

            if((data.currentPassword == "" || data.newPassword1 == "" || data.newPassword2 == "") || (data.newPassword1 != data.newPassword2 )){

              this.showToast("Los campos deben estar completos y las contraseñas nuevas deben coincidir", "danger")
            }
            else{
              this.showToast("se ha cambiado la contraseña", "success");
            }
          }
        }
      ]
    });

    return alert.present();
  }

  public logout(): void{

    this.userService.removeUserData().then(
      ()=> this.router.navigate(["/login"]),
      error => console.log(error)
    );
  }

  async showToast(message : string, color: string){

    const toast = await this.toastController.create({
      message : message,
      duration: 1000,
      color : color
    });

    return toast.present();
  }

  async showAlertDeleteProfile(){

    const alert = await this.alertController.create({

      header: "Confirma eliminar su perfil",
      message: "Una vez confirmada la operación, esta no podrá revertirse.",
      buttons: [
        {
          role : "cancel",
          text: "Cancelar"
        },
        {
          text: "Eliminar",
          handler: () => this.deleteProfile()
        }
      ]
    });

    return alert.present();
  }

  public deleteProfile():void{

    this.userService.deleteUser();

    this.router.navigate(["/login"]);
  }

}
