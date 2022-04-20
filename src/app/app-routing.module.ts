import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormlySimpleComponent, FormlyExpressionProperties, FormlyTrigger, FormlyState } from './examples';
import { LinksComponent } from './examples/links/links.component';

const routes: Routes = [
  {path: 'formly-examples', children:[
    {path: 'links', component: LinksComponent},
    {path: 'simple', component: FormlySimpleComponent},
    {path: 'formly-expr-props', component: FormlyExpressionProperties},
    {path: 'formly-trigger', component: FormlyTrigger},
    {path: 'formly-state', component: FormlyState}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
