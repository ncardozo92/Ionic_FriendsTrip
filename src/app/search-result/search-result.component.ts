import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchResponse } from '../models/SearchResponse';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  @Input() item : SearchResponse;

  @Input() idTraveler: number;

  @Output() inviteEvent: EventEmitter<number> = new EventEmitter<number>();

  private inviteButtonStyle = {
    "fill" : "outline",
    "icon": "heart-empty",
    "text" : "INVITAR",
    "disabled" : false,
    "visible" : true
  };

  constructor(
    private friendsService : FriendsService
  ) { }

  ngOnInit() {

    this.friendsService.findFriendship

    switch(this.item.EstadoSeguimiento){

      case "PENDIENTE": 
        this.setButtonPendiente
        break;
      case "RECHAZADO":
        this.setButton();
        break;
      case "ACEPTADO":
        this.setButtonAceptado();
    }
  }

  public setButtonAceptado(){

    this.inviteButtonStyle.visible = false
  }

  public setButtonPendiente(){

    this.inviteButtonStyle.fill = "solid";
    this.inviteButtonStyle.icon = "heart";
    this.inviteButtonStyle.text = "PENDIENTE";
    this.inviteButtonStyle.disabled = true;
  }

  public setButton(){
    // vuelve el botón a sua estado inicial
    this.inviteButtonStyle.fill = "solid";
    this.inviteButtonStyle.icon = "heart";
    this.inviteButtonStyle.text = "INVITAR";
    this.inviteButtonStyle.disabled = false;
    this.inviteButtonStyle.visible = true;
  }

  public invite(id: number){
    this.setButtonPendiente();
    this.inviteEvent.emit(id);
  }
}
