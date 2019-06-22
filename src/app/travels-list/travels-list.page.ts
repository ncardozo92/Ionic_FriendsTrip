import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TravelModalPage } from '../travel-modal/travel-modal.page';
import { TravelComponent } from '../travel/travel.component';
import { TravelService } from '../services/travel.service';
import { TravelResponse } from '../models/TravelResponse';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-travels-list',
  templateUrl: './travels-list.page.html',
  styleUrls: ['./travels-list.page.scss'],
})
export class TravelsListPage implements  OnInit {

  private travels : TravelResponse[] = [];
  private token: string = "";

  constructor(
    private modalController: ModalController,
    private travelService : TravelService,
    private userService : UserService
  ) { }

  ngOnInit() {

    this.userService.getJwt().then(data => {
      
      this.token = data;
      this.getAllTravels();
    },
    error => console.log(error)
    );

  }

  private getAllTravels(){

    this.travelService.getAll(this.token).subscribe((data)=>{
      
      this.travels = data.body;
    },
    error => console.log(error)
    );
  }

  async showModal(action: string, IdTravel: number = null){

    const modal = await this.modalController.create({

      component : TravelModalPage,
      componentProps: {
        action : action,
        idTravel : IdTravel
      }
    });

    modal.onDidDismiss().then(()=>{

      
      this.getAllTravels();
    });

    return modal.present();
  }

  public edit(id: number): void{

    this.showModal("update", id);
  }

}
