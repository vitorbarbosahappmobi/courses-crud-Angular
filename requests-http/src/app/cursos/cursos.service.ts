import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, take } from 'rxjs/operators';
import { ICurso } from './cursos-lista/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly url = `${environment.url}cursos`;

  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get<ICurso[]>(this.url)
      .pipe(
        delay(2000)
      );
  }

  loadByID(id: any) {
    return this.http.get<ICurso>(`${this.url}/${id}`)
      .pipe(
        take(1)
      );
  }

  private create(curso: any) {
    return this.http.post(this.url, curso)
      .pipe(
        take(1)
      );
  }

  private update(curso: any) {
    return this.http.put(`${this.url}/${curso.id}`, curso)
      .pipe(
        take(1)
      );
  }

  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  delete(id: any) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        take(1)
      );
  }
}
