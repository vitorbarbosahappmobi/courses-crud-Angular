import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Observable, of } from 'rxjs';
import { ICurso } from "../cursos-lista/curso";
import { CursosService } from "../cursos.service";

@Injectable({
    providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<ICurso> {

    constructor(private service: CursosService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICurso> {
        if (route.params && route.params['id']) {
            return this.service.loadByID(route.params['id']);
        }
        return of({
            id: <number><unknown>null,
            nome: <string><unknown>null
        });
    }

}