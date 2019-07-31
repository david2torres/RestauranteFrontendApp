import { Component, OnInit } from '@angular/core';
import { Restaurante } from './restaurante';
import { RestauranteService } from './restaurante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurantes.component.html'
})
export class RestaurantesComponent implements OnInit {
  restaurante: Restaurante[];
  constructor(private restauranteServices: RestauranteService) { }
  ngOnInit() {
   this.restauranteServices.getRestaurantes().subscribe(
     restaurante => this.restaurante = restaurante
   );
  }

    delete(restaurante:Restaurante): void{
      const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
  })

  swalWithBootstrapButtons.fire({
    title: 'Esta seguro?',
    text: `¿Desea eliminar el restaurante ${restaurante.nombre_comercial}`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Eliminar!',
    cancelButtonText: 'No, Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.restauranteServices.delete(restaurante.id).subscribe(
        response=>{
          this.restauranteServices.getRestaurantes().subscribe(rest => this.restaurante = rest);
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `El Restaurante ${restaurante.nombre_comercial} fue eliminado con Exito.`,
            'success'
          )
        }
      )
    }
  })
    }
  }
