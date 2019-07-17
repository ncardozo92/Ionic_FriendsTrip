import { Component, OnInit, Input } from '@angular/core';
import { FriendResponse } from '../models/Friendresponse';
import { ModalController } from '@ionic/angular';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.page.html',
  styleUrls: ['./contact-modal.page.scss'],
})
export class ContactModalPage implements OnInit {

  @Input() contactInfo: FriendResponse;
  @Input() jwtToken: string;
  @Input() thisUser: number;

  //private rating: number
  private userRate: number
  
  constructor(
    private modalcontroller: ModalController,
    private friendService: FriendsService
    ) { }

  ngOnInit() {

    this.userRate = 0;
  }

  public dissmiss(): void{

    this.modalcontroller.dismiss();
  }

  public delete(): void{

    this.friendService.deleteFriendship(this.thisUser, this.contactInfo.IdUsuario,this.jwtToken).subscribe(() =>{

      console.log("se ha eliminado la amistad entre " + this.thisUser + " y " + this.contactInfo.IdUsuario);
      this.dissmiss();
    },
    error => console.log(error.error)
    );
  }

  public rate(value, id){

    console.log("califico al usuario con id " + id + "con el valor " + value);
    if(this.userRate == 0){ // si la calificacion del cliente es igual a 0, entonces se puede calificar

      this.friendService.rate(id,value,this.jwtToken).subscribe(response =>{

        console.log(response.body);
        this.userRate = value;
      }, error => {
        console.log(error.error);
      });
    }
  }
}
