import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  private searchForm : FormGroup;

  private paises: any = [
    {
      id : 1,
      nombre: "Argentina"
    },
    {
      id : 2,
      nombre: "Uruguay"
    },
    {
      id : 1,
      nombre: "EEUU"
    }
  ];

  private ciudades = [
    {
      id: 1,
      nombre: "Buenos Aires"
    },
    {
      id: 2,
      nombre: "Montevideo"
    },
    {
      id: 3,
      nombre: "New York"
    }
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      "ciudad": new FormControl("",[Validators.required]),
      "pais" : new FormControl("",[Validators.required]),
      "fechaViaje": new FormControl("",[Validators.required]),
      "numeroVuelo" : new FormControl("",[Validators.required])
    });
  }

  public searchResults(){

    console.log(this.searchForm.get("fechaInicio").value);
    console.log(this.searchForm.invalid)
  }

}
