import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-simple',
  templateUrl: './formly-simple.component.html',
  styleUrls: ['./formly-simple.component.scss']
})
export class FormlySimpleComponent {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'nom',
      type: 'text',
      templateOptions: {
        label: 'Nom',
        placeholder: 'Enter name',
        required: true,
        tooltip: 'message to translate'
      }
    },
    {
      key: 'prenom',
      type: 'text',
      templateOptions: {
        label: 'Prenom',
        placeholder: 'Enter first name',
        required: true,
        popover: 'popoverMessage'
      }
    },
    {
      wrappers: ['section-wrapper'],
      templateOptions: {
        labelSection: 'Titre de section',
        cardTitle: 'titre de la carte',
        cardStyle: true,
        cardHeader: 'header',
        cardTitleTag: 'card title',
        cardTitleButton: {
          label: 'clique moi',
          className: '-right',
          click: (field: FormlyFieldConfig) => {console.log('click', field)}
        }
      },
      fieldGroup: [{
        key: 'comment',
        type: 'textarea',
        templateOptions: {
          label: 'Commentaire',
          maxLength: 2,
          required: true
        }
      }]
    }
  ];
  // TODO: ajouter un * si required
  onSubmit(model: any) {
    console.log(model, this.form);
  }

}
