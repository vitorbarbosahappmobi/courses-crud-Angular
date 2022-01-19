import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { ICurso } from './curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$!: Observable<ICurso[]>;
  error$ = new Subject<Boolean>();
  cursoSelected!: ICurso;

  constructor(
    private cursosService: CursosService,
    public alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.getCursos()
      .pipe(
        catchError(error => {
          this.error$.next(true);
          this.handleError();
          return EMPTY;
        })
      );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onDelete(curso: any) {
    this.cursoSelected = curso;

    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(
          result => result ? this.cursosService.delete(curso.id) : EMPTY
        )
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
        }
      )
  }

  onConfirmDelete() {
    this.cursosService.delete(this.cursoSelected.id)
      .subscribe(
        success => {
          this.onRefresh(),
            this.onDeclineDelete();
        },
        error => {
          this.alertModalService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.'),
            this.onDeclineDelete();
        }
      );
    this.deleteModalRef.hide();
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
