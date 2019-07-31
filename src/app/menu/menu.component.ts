import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuService } from './menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menu: Menu[];
  constructor(private menuServices: MenuService){ }
  ngOnInit(){
   this.menuServices.getMenu().subscribe(
    menu => this.menu = menu
   );
  }

  delete(menu:Menu): void{
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
})

swalWithBootstrapButtons.fire({
  title: 'Esta seguro?',
  text: `¿Desea eliminar el menu ${menu.nombreMenu}`,
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si, Eliminar!',
  cancelButtonText: 'No, Cancelar!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.menuServices.delete(menu.id).subscribe( response => {
        this.menuServices.getMenu().subscribe(menu => this.menu = menu);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          `El menu ${menu.nombreMenu} fue eliminado con Exito.`,
          'success'
        )
      }
    )
  }
})
  }
}
