import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { UserService } from './user.service';
import { TravelResponse } from '../models/TravelResponse';
import { SearchRequest } from '../models/SearchRequest';
import { SearchResponse } from '../models/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private API_URL: string = "http://localhost:61573/api/Viaje";
  //private API_URL : string = "http://192.168.0.4:61573/api";

  constructor(
    private http : HttpClient,
    private userService : UserService
  ) { 
  }

  public get(id: number, token: string){

    const headers = new HttpHeaders({"Authorization": token});
    
    console.log(headers.get("Authorization"));
      return this.http.get<TravelResponse>(
        `${this.API_URL}/Buscar/${id}`,
        {
          observe : "response",
          headers : headers
        }
      );
  }

  public getAll(token: string){

    const headers = new HttpHeaders({"Authorization": token});
    
    return this.http.get<TravelResponse[]>(
      `${this.API_URL}/Listar`,
      {
        observe : "response",
        headers : headers
      }
    );
  }

  public delete(id: number, token: string){

    const headers = new HttpHeaders({"Authorization": token});

    return this.http.delete(
      `${this.API_URL}/Eliminar/${id}`,
      {
        observe : "response",
        headers : headers
      }
    )
  }

  public create(travel, token){

    const headers = new HttpHeaders({"Authorization": token});

    return this.http.post(`${this.API_URL}/Registrar`,travel,{"observe" : "response", headers : headers});
  }

  public update(travel, token: string){

    const headers = new HttpHeaders({"Authorization": token});

    return this.http.put(`${this.API_URL}/Modificar`,travel,{"observe" : "response", headers : headers});
  }

  public searchTravels(request: SearchRequest, token: string){

    let headers = new HttpHeaders({"Authorization": token});

    console.log(request);

    return this.http.post<SearchResponse[]>(`${this.API_URL}/BuscarViajes`,request, {"observe" : "response", "headers" : headers});
  }
}
