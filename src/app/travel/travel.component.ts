import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { TravelResponse } from '../models/TravelResponse';
import { ModalController } from '@ionic/angular';
import { TravelModalPage } from '../travel-modal/travel-modal.page';
import { UserService } from '../services/user.service';

@Component({
  selector: 'travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent implements OnInit {

  private display: boolean = true;
  private token: string ="";

  @Input() item: TravelResponse;
  @Output() onEdit:EventEmitter<number> = new EventEmitter();

  constructor(
    private travelService: TravelService,
    private userService : UserService
  ) { }

  ngOnInit() {}

  public delete(): void{

    this.userService.getJwt().then(data => {
      
      this.travelService.delete(this.item.IdViaje, data).subscribe( 
        data =>this.display = false,
        error => console.log(error.error)
        );
    });

    
  }

  public edit(){
    console.log(this.item)
    console.log("disparo onEdit");
    this.onEdit.emit(this.item.IdViaje);
  }
}
