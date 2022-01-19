import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosService } from './cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CursosListaComponent,
    CursosFormComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CursosService]
})
export class CursosModule { }
