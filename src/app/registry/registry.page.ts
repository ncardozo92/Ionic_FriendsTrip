import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {

  private registryForm: FormGroup;

  constructor(
    private modalController : ModalController,
    private router : Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    //quedara ver el tema de longitud de caracteres
    this.registryForm = this.formBuilder.group({
      "userName": new FormControl("",[Validators.required]),
      "email": new FormControl("",[Validators.email,Validators.required]),
      "contrasenia1": new FormControl("",[Validators.required,Validators.minLength(4)]),
      "contrasenia2": new FormControl("",[Validators.required,Validators.minLength(4)])
    });
  }

  public register(): void{
    if(!this.registryForm.invalid){

      console.log("es valido");
      //this.router.navigate(["home"]);

      this.dismiss();
    }
      
  }

  public dismiss(): void{

    this.modalController.dismiss();
  }
}
