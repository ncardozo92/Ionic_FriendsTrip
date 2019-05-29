import { Injectable } from '@angular/core';

import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage : Storage) { }

  //keys para guardar los datos en local storage
  private USER_ID: string = "userId";
  private USER_NAME: string = "userName";

  //lo uso para almacenar el id de usuario y luego retornarlo, en lugar de retornar toda la Promise
  private storedId: number = null;

  public saveUserData(id: number, userName: string): void{

    this.storage.set(this.USER_ID, id).then(
      ()=> console.log(this.USER_ID + " seteado"),
      error => console.log(error)
    );

    this.storage.set(this.USER_NAME, userName).then(
      ()=> console.log(this.USER_NAME + " seteado"),
      error => console.log(error)
    );
  }

  //se retorna la promise
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
}
