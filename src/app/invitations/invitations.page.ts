import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { InvitationResponse } from '../models/InvitationResponse';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {

  private invitations: InvitationResponse[] = [];
  private token: string = "";
  private userId: number;

  constructor(
    private friendsService: FriendsService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.userService.getJwt().then( token =>{

      this.token = token;

      this.userService.getUserId().then( id =>{

        this.userId = id;

        this.friendsService.getInvitations(this.userId,this.token).subscribe(
          data =>{
            this.invitations = data.body;
            console.log(this.invitations);
          },
          error => console.log(error.error)
        );
      });
    });
  }

  public aceptInvitation(idInviter: number, response: string): void{

    this.friendsService.aceptInvitation(idInviter,this.userId, response, this.token).subscribe(
      ()=> console.log("se actualizó la invitacion"),
      (error)=> console.log(error.error)
    );
  }
}
