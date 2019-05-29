import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.page.html',
  styleUrls: ['./travel-modal.page.scss'],
})
export class TravelModalPage implements OnInit {

  @Input("action") action: string; // "create" | "update"
  @Input("travel") travel: any; // tengo que ver si conviene recibir todo un objeto, o solo el id del viaje

  private travelForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.travelForm = this.formBuilder.group({

      "fecha" : new FormControl("", Validators.required),
      "numeroVuelo" : new FormControl("", Validators.required),
      "pais" : new FormControl("", Validators.required),
      "ciudad" : new FormControl("", Validators.required),
      "intereses" : new FormControl("", Validators.nullValidator),
      "alojamiento" : new FormControl("", Validators.nullValidator)
    });
  }

  public dismissModal(): void{

    this.modalController.dismiss();
  }

  public create(): void{

    console.log("falta desarrollo");
    this.dismissModal();
  }

  public update(): void{

    console.log("falta desarrollo");
    this.dismissModal();
  }
}
