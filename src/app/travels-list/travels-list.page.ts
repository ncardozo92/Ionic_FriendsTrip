import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TravelModalPage } from '../travel-modal/travel-modal.page';
import { TravelComponent } from '../travel/travel.component';

@Component({
  selector: 'app-travels-list',
  templateUrl: './travels-list.page.html',
  styleUrls: ['./travels-list.page.scss'],
})
export class TravelsListPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async showModal(action: string, travel: TravelComponent = null){

    const modal = await this.modalController.create({

      component : TravelModalPage,
      componentProps: {
        action : action,
        travel : travel
      }
    });

    modal.onDidDismiss().then(()=>{

      console.log("se buscan de nuevo todos los viajes registrados");
    });

    return modal.present();
  }

}
