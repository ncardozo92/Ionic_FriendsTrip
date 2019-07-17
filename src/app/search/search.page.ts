import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TravelService } from '../services/travel.service';
import { SearchRequest } from '../models/SearchRequest';
import { SearchResponse } from '../models/SearchResponse';
import { AlertController } from '@ionic/angular';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  //private searchForm : FormGroup;
  private destination: string = "";
  private flight: string = "";
  private token: string;
  private userId: number;
  private searchResults: SearchResponse[] = [];

  constructor(
    private userService : UserService,
    private friendsService : FriendsService,
    private travelService : TravelService,
    private alertController : AlertController
    ) { }

  ngOnInit() {

    this.userService.getJwt().then( data =>{

      this.token = data;
    });

    this.userService.getUserId().then(data =>{

      this.userId = data;
    });
  }

  async showAlert(message: string){

    const alert = await this.alertController.create({
      message : message,
      buttons: [{text : "OK", role: "dissmiss"}]
    });

    return alert.present();
  }

  public search(){

    if(this.destination == "" && this.flight == ""){
      this.showAlert("Complete uno de los campos para buscar");
      return;
    }

    let request: SearchRequest = new SearchRequest();

    request.Destino = this.destination == "" ? null : this.destination;
    request.Vuelo = this.flight == "" ? null : this.flight;
    request.IdUsuario = this.userId;

    this.travelService.searchTravels(request,this.token).subscribe(
      response => {this.searchResults = response.body; console.log(this.searchResults);},
      error => console.log(error)
    );
  }

  public inviteUser(idFollowedUser: number){

    console.log("id del usuario seguido: " + idFollowedUser);
    
    return this.friendsService.inviteUser(this.userId, idFollowedUser,this.token).subscribe(
      () => console.log("pendiente aceptación del usuario con id " + idFollowedUser),
      error => console.log( error.error)
    );
  }
}
