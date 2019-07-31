import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuService } from './menu.service';
import { Router, ActivatedRoute } from '@angular/router'
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponente implements OnInit {
  private menu:Menu = new Menu()
  private titulo:String = "Crear Cliente"

  constructor(private menuService:MenuService,
              private router:Router,
              private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.cargarMenu()
  }

  cargarMenu(): void{
    this.activatedRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.menuService.getMenus(id).subscribe(
          (menu)=>this.menu = menu)
      }
    })
  }

  create():void{
    this.menuService.create(this.menu).subscribe(
      _response => {this.router.navigate(['/menu'])
          Swal.fire('Nuevo Menu',`Menu ${_response.nombreMenu} creado con exito`,'success')
      });
  }

  update():void{
    this.menuService.update(this.menu).subscribe(
      _response => {
        this.router.navigate(['/menu'])
        Swal.fire('Menu Actualizado',`Menu ${_response.nombreMenu}, actualizado con exito`,'success')
      }
    )
  }

}
