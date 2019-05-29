import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-guide-registry',
  templateUrl: './guide-registry.page.html',
  styleUrls: ['./guide-registry.page.scss'],
})
export class GuideRegistryPage implements OnInit {

  private registryForm: FormGroup;

  constructor(
    private modalController : ModalController, 
    private router : Router,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      //quedara ver el tema de longitud de caracteres
      this.registryForm = this.formBuilder.group({
        "userName": new FormControl("",[Validators.required]),
        "email": new FormControl("",[Validators.email,Validators.required]),
        "contrasenia1": new FormControl("",[Validators.required,Validators.minLength(4)]),
        "contrasenia2": new FormControl("",[Validators.required,Validators.minLength(4)]),
        "matricula": new FormControl("",[Validators.required])
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
