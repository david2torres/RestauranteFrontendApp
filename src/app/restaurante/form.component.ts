import { Component, OnInit } from '@angular/core';
import { Restaurante } from './restaurante';
import { RestauranteService } from './restaurante.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal  from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  private restaurante:Restaurante = new Restaurante()
  private titulo:String = "Crear Restaurante"

  constructor(private restauranteService:RestauranteService,
              private router:Router,
              private activateRouter:ActivatedRoute) { }

  ngOnInit() {
    this.cargarRestaurante()
  }

  cargarRestaurante(): void{
    this.activateRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.restauranteService.getRestaurante(id).subscribe(
          (restaurante)=>this.restaurante = restaurante)
      }
    })
  }

  create():void{
    this.restauranteService.create(this.restaurante).subscribe(
      _response => {this.router.navigate(['/restaurante'])
          Swal.fire('Nuevo Restaurante',`Restaurante creado con exito`,'success')
      });
  }

  update():void{
    this.restauranteService.update(this.restaurante).subscribe(
      _response => {
        this.router.navigate(['/restaurante'])
        Swal.fire('Restaurante Actualizado',`Restaurante Actualizado con Exito`,'success')
      }
    )
  }
}
