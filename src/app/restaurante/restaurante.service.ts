import { Injectable } from '@angular/core';
import { Restaurante } from './restaurante';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()
export class RestauranteService {
  private urlEndPoint:string='http://localhost:8080/api/restaurantes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router :Router) { }

  getRestaurantes(): Observable<Restaurante[]>{
      return this.http.get<Restaurante[]>(this.urlEndPoint);
  }

  create(restaurante:Restaurante): Observable<Restaurante>{
    return this.http.post<Restaurante>(this.urlEndPoint, restaurante, {headers:this.httpHeaders} );
  }

  getRestaurante(id): Observable<Restaurante>{
      return this.http.get<Restaurante>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e=>{
          this.router.navigate['/restaurante'];
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  update(restaurante:Restaurante):Observable<Restaurante>{
      return this.http.put<Restaurante>(`${this.urlEndPoint}/${restaurante.id}`, restaurante, {headers:this.httpHeaders});
  }

  delete(id:number): Observable<Restaurante>{
      return this.http.delete<Restaurante>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders});
    }

 }
