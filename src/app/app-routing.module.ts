import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormlySimpleComponent } from './examples';
import { LinksComponent } from './examples/links/links.component';

const routes: Routes = [
  {path: 'formly-examples', children:[
    {path: 'links', component: LinksComponent},
    {path: 'simple', component: FormlySimpleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
