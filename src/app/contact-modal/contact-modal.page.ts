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
  
  constructor(
    private modalcontroller: ModalController,
    private friendService: FriendsService
    ) { }

  ngOnInit() {
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
}
