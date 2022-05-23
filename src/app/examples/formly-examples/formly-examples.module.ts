import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DaenaePipesModule, FormlyComponentsModule } from '../../../../projects/form-components/src/public-api';
import { FormlyExamplesComponent } from './formly-examples.component';
import { FormlyExamplesRoutingModule } from "./formly-examples-routing.module";
import { TestService } from './services/test.service.service';
import { formlyExamplesComponent } from './components';

@NgModule({
  declarations: [
    ...formlyExamplesComponent,
    FormlyExamplesComponent
  ],
  imports: [
    FormlyExamplesRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({extras: { lazyRender: true }, types: []}),
    FormlyComponentsModule,
    DaenaePipesModule,
    BsDatepickerModule
  ],
  providers: [TestService]
})
export class FormlyExamplesModule { }
