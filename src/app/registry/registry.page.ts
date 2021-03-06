import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NacionalidadResponse } from '../models/NacionalidadResponse';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {

  private registryForm: FormGroup;

  private nacionalidades: NacionalidadResponse[] = [];

  constructor(
    private modalController : ModalController,
    private router : Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController : ToastController
    ) { }

  ngOnInit() {
    //quedara ver el tema de longitud de caracteres
    this.registryForm = this.formBuilder.group({
      "userName": new FormControl("",[Validators.required]),
      "email": new FormControl("",[Validators.email,Validators.required]),
      "contrasenia1": new FormControl("",[Validators.required,Validators.minLength(4)]),
      "contrasenia2": new FormControl("",[Validators.required,Validators.minLength(4)]),
      "paisOrigen": new FormControl(null,[Validators.required])
    });

    this.userService.getNationality().subscribe(
      data => this.nacionalidades = data.body,
      error => this.showToast(error.error)
    );
  }

  public register(): void{

    if(!this.registryForm.invalid){

      this.userService.registerUser(this.registryForm).subscribe(data=>{

        console.log("registro existoso");
         this.dismiss();
      },
      error=>{
        switch(error.status){

          case 400: this.showToast("Datos incorrectos");
                    break;
          default: this.showToast(error.error);
                    break;
        }
      });
    }
  }

  async showToast(message: string){

    const toast = await this.toastController.create({message : message, duration : 6000});

    return toast.present();
  }

  public dismiss(): void{

    this.modalController.dismiss();
  }
}
