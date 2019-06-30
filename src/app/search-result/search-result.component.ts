import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchResponse } from '../models/SearchResponse';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  @Input() item : SearchResponse;
  @Output() followEvent: EventEmitter<number> = new EventEmitter<number>();

  private followButtonStyle = {
    "fill" : "outline",
    "icon": "heart-empty",
    "text" : "SEGUIR",
    "disabled" : false,
    "visible" : true
  };

  constructor() { }

  ngOnInit() {

    switch(this.item.EstadoSeguimiento){

      case "PENDIENTE": 
        this.followButtonStyle.fill = "solid";
        this.followButtonStyle.icon = "heart";
        this.followButtonStyle.text = "PENDIENTE";
        this.followButtonStyle.disabled = true;
        break;
      case "RECHAZADO":
        //this.followButtonStyle.fill = "solid";
        //this.followButtonStyle.icon = "heart";
        this.followButtonStyle.text = "PENDIENTE";
        this.followButtonStyle.disabled = true;
        break;
      case "ACEPTADO":
        this.followButtonStyle.fill = "solid";
        this.followButtonStyle.icon = "heart";
        this.followButtonStyle.text = "ACEPTADO";
        this.followButtonStyle.disabled = true;
    }
  }

  public follow(id: number){
    this.followButtonStyle.fill = "solid";
    this.followButtonStyle.icon = "heart";
    this.followButtonStyle.text = "PENDIENTE";
    this.followButtonStyle.disabled = true;
    this.followEvent.emit(id);
  }
}
