import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TravelService } from '../services/travel.service';
import { UserService } from '../services/user.service';
import { TravelResponse } from '../models/TravelResponse';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.page.html',
  styleUrls: ['./travel-modal.page.scss'],
})
export class TravelModalPage implements OnInit {

  @Input() action: string; // "create" | "update"
  @Input() idTravel: number;
  
  private travel: TravelResponse = new TravelResponse(); // tengo que ver si conviene recibir todo un objeto, o solo el id del viaje

  private travelForm: FormGroup;
  private token:string = "";
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private travelService: TravelService,
    private userService : UserService
  ) { }

  ngOnInit() {

    this.travelForm = this.formBuilder.group({
      "IdViaje" : new FormControl(),
      "FechaDesde" : new FormControl("", Validators.required),
      "FechaHasta" : new FormControl("", Validators.nullValidator),
      "Aerolinea" : new FormControl("", Validators.nullValidator),
      "NumeroVuelo" : new FormControl("", Validators.nullValidator),
      "Origen" : new FormControl("", Validators.required),
      "Destino" : new FormControl("", Validators.required),
      "Alojamiento" : new FormControl("", Validators.nullValidator),
      "InteresActividades" : new FormControl(false,Validators.nullValidator),
      "InteresExcursiones" : new FormControl(false,Validators.nullValidator),
      "InteresTraslados" : new FormControl(false,Validators.nullValidator),
      "InteresAmistades" : new FormControl(false,Validators.nullValidator),
      "InteresAlojamiento" : new FormControl(false,Validators.nullValidator),
      "InteresOtros" : new FormControl(false,Validators.nullValidator)
    });

    this.userService.getJwt().then( data => { 
      
      this.token = data; 
      if(this.action === "update"){
        this.travelService.get(this.idTravel, data).subscribe(data =>{

          this.travel = data.body;
          console.log(this.travel);

          this.travelForm.setControl("IdViaje", new FormControl(this.travel.IdViaje, Validators.nullValidator));
          this.travelForm.setControl("FechaDesde", new FormControl(this.travel.FechaDesde, Validators.required));
          this.travelForm.setControl("FechaHasta", new FormControl(this.travel.FechaHasta, Validators.required));
          this.travelForm.setControl("Aerolinea", new FormControl(this.travel.Aerolinea, Validators.required));
          this.travelForm.setControl("NumeroVuelo", new FormControl(this.travel.NumeroVuelo, Validators.required));
          this.travelForm.setControl("Origen", new FormControl(this.travel.Origen, Validators.required));
          this.travelForm.setControl("Destino", new FormControl(this.travel.Destino, Validators.required));
          this.travelForm.setControl("Alojamiento", new FormControl(this.travel.Alojamiento, Validators.required));
        });
      }
    });
  }

  public dismissModal(): void{

    this.modalController.dismiss();
  }

  async showAlert(message : string){

    const alert = await this.alertController.create({
      header : "Error",
      message : message,
      buttons : ["OK"]
    });

    return alert.present();
  }

  public create(): void{

    if(this.travelForm.invalid)
      this.showAlert("Ingrese los campos que son obligatorios");
    else{

      this.travelService.create(this.travelForm.value,this.token).subscribe( 
       () => this.dismissModal(),
        error => this.showAlert("Ha ocurrido un problema en el servidor. Inténtelo más tarde")
        );
    }
  }

  public update(): void{

    console.log(this.travelForm.value)
    this.travelService.update(this.travelForm.value, this.token).subscribe(
      () => this.dismissModal(),
      error => this.showAlert("Ha ocurrido un problema en el servidor. Inténtelo más tarde")
      );
    
    
  }
}
