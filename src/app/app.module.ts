import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DaenaePipesModule, FormlyComponentsModule } from '../../projects/form-components/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { formlyExamplesComponent } from './examples';
import { TestService } from './services/test.service.service';

@NgModule({
  declarations: [
    AppComponent,
    ...formlyExamplesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forRoot(),
    FormlyModule.forRoot({extras: { lazyRender: true }, types: []}),
    FormlyComponentsModule,
    DaenaePipesModule,
    BsDatepickerModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
