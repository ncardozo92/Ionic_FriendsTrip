import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NacionalidadResponse } from '../models/NacionalidadResponse';

@Component({
  selector: 'app-guide-registry',
  templateUrl: './guide-registry.page.html',
  styleUrls: ['./guide-registry.page.scss'],
})
export class GuideRegistryPage implements OnInit {

  private registryForm: FormGroup;
  
  private nacionalidades: NacionalidadResponse[] = [];

  constructor(
    private modalController : ModalController, 
    private router : Router,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private toastController : ToastController
    ) { }

    ngOnInit() {
      //quedara ver el tema de longitud de caracteres
      this.registryForm = this.formBuilder.group({
        "email": new FormControl("",[Validators.email,Validators.required]),
        "contrasenia1": new FormControl("",[Validators.required,Validators.minLength(4)]),
        "userName": new FormControl("",[Validators.required]),
        "contrasenia2": new FormControl("",[Validators.required,Validators.minLength(4)]),
        "matricula": new FormControl("",[Validators.required]),
        "paisOrigen": new FormControl(null,[Validators.required])
      });

      this.userService.getNationality().subscribe(
        data => this.nacionalidades = data.body,
        error => this.showToast(error.error)
      );
    }

    public register(): void{
      
      this.userService.registerGuide(this.registryForm).subscribe(

        () => this.dismiss(),
        error => this.showToast(error.message)
      );
    }

    async showToast(message: string){

      const toast = await this.toastController.create({message : message, duration : 6000});
  
      return toast.present();
    }

    public dismiss(): void{

      this.modalController.dismiss();
    }

}
