import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchResponse } from '../models/SearchResponse';
import { FriendsService } from '../services/friends.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  @Input() item : SearchResponse;

  @Output() inviteEvent: EventEmitter<number> = new EventEmitter<number>();

  private userId: number;
  
  private jwtToken: string;

  private inviteButtonStyle = {
    "fill" : "solid",
    "icon": "heart",
    "text" : "INVITAR",
    "disabled" : false,
    "visible" : false
  };

  constructor(
    private friendsService : FriendsService,
    private userService : UserService
  ) { }

  ngOnInit() {

    this.friendsService.findFriendship

    this.userService.getUserId().then(id =>{

      this.userId = id;

      this.userService.getJwt().then(token =>{

        this.jwtToken = token;

        if(this.userId == this.item.IdUsuario){

          this.setButtonAceptado();
        }
        else{
          this.friendsService.findFriendship(this.userId,this.item.IdUsuario,this.jwtToken).subscribe( data =>{

            if(data.body.Idresponsable == this.userId){

              this.setButton();
              this.inviteButtonStyle.visible = false;
            }

            switch(data.body.Estado){

              case "PENDIENTE": 
                this.setButtonPendiente();
                break;
              case "ACEPTADO":
                this.setButtonAceptado();
                break;
              default:
                this.setButton();
            }
          });
        }
      });
    });
  }

  public setButtonAceptado(){

    this.inviteButtonStyle.visible = false;
  }

  public setButtonPendiente(){

    this.inviteButtonStyle.text = "PENDIENTE";
    this.inviteButtonStyle.disabled = true;
    this.inviteButtonStyle.visible = true;
  }

  public setButton(){
    // vuelve el botón a sua estado inicial
    this.inviteButtonStyle.text = "INVITAR";
    this.inviteButtonStyle.disabled = false;
    this.inviteButtonStyle.visible = true;
  }

  public invite(id: number){
    this.setButtonPendiente();
    this.inviteEvent.emit(id);
  }
}
