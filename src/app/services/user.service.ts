import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { UserLogin } from '../models/UserLogin';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage : Storage,
    private http: HttpClient
    ) { }

  //keys para guardar los datos en local storage
  private USER_ID: string = "userId";
  private USER_NAME: string = "userName";
  private TOKEN: string = "JWTToken"
  private API_URL : string = "http://localhost:61573/api"

  public saveUserData(loginResponse: LoginResponse): void{

    this.storage.set(this.USER_ID, loginResponse.IdUsuario).then(
      ()=> console.log(this.USER_ID + " seteado"),
      error => console.log(error)
    );

    this.storage.set(this.USER_NAME, loginResponse.Usuario).then(
      ()=> console.log(this.USER_NAME + " seteado"),
      error => console.log(error)
    );

    this.storage.set(this.TOKEN, loginResponse.Token).then(
      ()=> console.log(this.TOKEN + " seteado"),
      error => console.log(error)
    );
  }

  public getJwt(): any{

    return this.storage.get(this.TOKEN);
  }

  public getUserId(): Promise<any>{

    return this.storage.get(this.USER_ID);
  }

  public removeUserData(){

    return this.storage.clear();
  }

  public deleteUser(){

    console.log("se debera eliminar el usuario");
    this.removeUserData();
  }

  public login(userLogin: UserLogin): Observable<HttpResponse<LoginResponse>>{

    return this.http.post<LoginResponse>(`${this.API_URL}/Usuario/Login`, userLogin, {observe : "response"});
  }

  public registerUser(user: FormGroup): Observable<HttpResponse<any>>{

    let requestBody = {
      "NombreUsuario" : user.get("userName").value,
      "Email" : user.get("email").value,
      "Password" : user.get("contrasenia1").value,
      "PaisOrigen" : user.get("paisOrigen").value
    }

    return this.http.post<any>(`${this.API_URL}/Usuario/registroViajero`,requestBody,{observe: "response"});
  }
}
