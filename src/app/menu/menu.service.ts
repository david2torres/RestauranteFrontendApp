import { Injectable } from '@angular/core';
import { Menu } from './menu';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()
export class MenuService {
  private urlEndPoint:string='http://localhost:8080/api/menus';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router :Router) { }
  getMenu(): Observable<Menu[]>{
      return this.http.get<Menu[]>(this.urlEndPoint);
  }

  create(menu:Menu): Observable<Menu>{
    return this.http.post<Menu>(this.urlEndPoint, menu, {headers:this.httpHeaders} );
  }

  getMenus(id): Observable<Menu>{
      return this.http.get<Menu>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate['/menu'];
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  update(menu:Menu):Observable<Menu>{
      return this.http.put<Menu>(`${this.urlEndPoint}/${menu.id}`, menu,{headers:this.httpHeaders});
  }

  delete(id:number): Observable<Menu>{
    return this.http.delete<Menu>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders});
  }

}
