import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { InvitationResponse } from '../models/InvitationResponse';
import { FriendResponse } from '../models/Friendresponse';


@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private API_URL : string = "http://localhost:61573/api";
  //private API_URL : string = "http://192.168.0.4:61573/api";

  constructor(
    private http:HttpClient

  ) { }

  public inviteUser(idFollower: number, idFollowing: number, token: string){

    let headers = new HttpHeaders({"Authorization" : token});

    return this.http.post<any>(`${this.API_URL}/Amistad/Invitar/${idFollower}/${idFollowing}`,null, {headers: headers, observe: "response"});
  }

  public getInvitations(idUser: number, token: string){

    let headers = new HttpHeaders({"Authorization" : token});

    return this.http.get<InvitationResponse[]>(`${this.API_URL}/Amistad//BuscarInvitaciones/${idUser}`,{headers : headers, observe: "response"});
  }

  public aceptInvitation(idFollower: number, idFollowing: number, acepted:string, token: string){

    let headers = new HttpHeaders({"Authorization" : token});

    return this.http.put<any>(`${this.API_URL}/Amistad/AceptarInvitacion/${idFollower}/${idFollowing}/${acepted}`, null, {headers: headers, observe: "response"});
  }

  public findFriendship(idFollower: number, idFollowing: number, token: string){

    let headers = new HttpHeaders({"Authorization" : token});

    return this.http.get<any>(`${this.API_URL}/Amistad/ExisteAmistad/${idFollower}/${idFollowing}`,{headers : headers, observe: "response"});
  }

  public searchFriends(idUser: number, token: string){

    let headers = new HttpHeaders({"Authorization" : token});

    return this.http.get<FriendResponse[]>(`${this.API_URL}/Amistad/BuscarAmigos/${idUser}`,{headers : headers, observe: "response"});
  }
}
