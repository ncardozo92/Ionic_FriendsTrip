import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FriendsService } from '../services/friends.service';
import { FriendResponse } from '../models/Friendresponse';
import { ModalController } from '@ionic/angular';
import { ContactModalPage } from '../contact-modal/contact-modal.page';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  private userId: number;

  private token: string;

  private contacts: FriendResponse[] = [];

  constructor(
    private userService: UserService,
    private friendService: FriendsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.userService.getUserId().then( id =>{

      this.userId = id;

      this.userService.getJwt().then( token =>{

        this.token = token;

        this.friendService.searchFriends(this.userId, this.token).subscribe(data =>{

          this.contacts = data.body;
          console.log(this.contacts);
        });
      });
    });
  }

  async showModal(index: number){

    let contact = this.contacts[index]
    
    console.log(contact);

    let modal = await this.modalController.create({
      component : ContactModalPage,
      componentProps : { 
        contactInfo : contact,
        thisUser : this.userId,
        jwtToken : this.token
      }
    });

    await modal.present();
  }
}
