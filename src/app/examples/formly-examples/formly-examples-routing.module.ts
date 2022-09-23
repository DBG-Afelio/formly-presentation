import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormlySimpleComponent, FormlyExpressionProperties, FormlyTrigger, FormlyState } from './components';

const routes: Routes = [
    { path: 'simple', component: FormlySimpleComponent },
    { path: 'formly-expr-props', component: FormlyExpressionProperties },
    { path: 'formly-trigger', component: FormlyTrigger },
    { path: 'formly-state', component: FormlyState }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormlyExamplesRoutingModule { }
