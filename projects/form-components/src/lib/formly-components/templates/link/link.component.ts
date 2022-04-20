import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'daenae-app-link',
  templateUrl: './link.component.html'
})
export class LinkComponent extends FieldType {

    constructor(
        private router: Router
    ) {
        super();
    }

    public navigate(navigateParams: any[], queryParams: Params) {
        this.to['beforeNavigate']();
        this.router.navigate(navigateParams, {queryParams: queryParams});
    }

}
