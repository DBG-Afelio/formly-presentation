import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs';
import { Pizza, TestService, Topping } from '../../services/test.service.service';

@Component({
  selector: 'app-formly-simple',
  templateUrl: './formly-expression-properties.html',
  styleUrls: ['./formly-expression-properties.scss']
})
export class FormlyExpressionProperties {

  form: UntypedFormGroup = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  /**
   *
   */
  constructor(private pizzaService: TestService) {
    this.fields = this.generateConfig();
    
  }

  generateConfig(): FormlyFieldConfig[] {
    return [
      {
        wrappers: ['section-wrapper'],
        templateOptions: {
          labelSection: 'Expression Properties',
          cardTitle: 'Cacher un champ',

        },
        fieldGroup: [{
          key: 'type',
          type: 'searchable-select',
          templateOptions: {
            label: 'Commentaire',
            maxLength: 2,
            required: true,
            options: [
              { label: 'Un', value: 1 },
              { label: 'Deux', value: 2 },
              { label: 'Trois', value: 3 },
              { label: 'Quatre', value: 4 },
            ]
          }
        },
        {
          key: 'cached',
          type: 'text',
          templateOptions: {
            label: 'champ caché',
          },
          hide: true
        },
        {
          key: 'secret',
          type: 'text',
          templateOptions: {
            label: 'champ secret',
          },
          hideExpression: (model: any, field: any) => {
            return model.type !== 4
          },
          expressionProperties: {
            'templateOptions.label': (model, state, field) => {
              return (field?.parent?.fieldGroup?.[0].templateOptions?.options as any[])?.find((option: any) => option.value === +model.secret)?.label
            }
          }
        }]
      },
      {
        wrappers: ['section-wrapper'],
        templateOptions: {
          labelSection: 'Expression Properties',
          cardTitle: 'Utiliser des Observables',

        },
        fieldGroup: [
          {
            key: 'pizzas',
            type: 'searchable-select',
            templateOptions: {
              label: 'Pizza',
              required: true,
              options: this.pizzaService.getPizzas().pipe(
                map((pizzas: Pizza[]) => {
                  return [
                    ...pizzas.map(pizza => ({
                      label: pizza.name,
                      value: pizza
                    })),
                    { label: 'Nouvelle', pizza: { id: '0', name: 'Nouvelle', toppings: [] } }
                  ]
                })
              )
            }
          },
          {
            key: 'toppings',
            type: 'multicheckbox',
            templateOptions: {
              label: 'Ingrédients',
              required: true,
              options: this.pizzaService.getToppings().pipe(
                map((toppings: Topping[]) => {
                  return [
                    ...toppings.map(topping => ({
                      label: topping.name,
                      key: '_'+topping.id
                    }))
                  ]
                })
              )
            },
            expressionProperties: {
              'model.toppings': (model, state, field) => {
                // TODO: cocher les ingrédients de la pizza sélectionnée
                console.log(model)
                return model.pizzas?.toppings ? model.pizzas.toppings.reduce((acc: any,res: any) => {return {...acc, ['_'+res]: true}}, {}) : {};
              }
            }
          }

        ]
      }];
  }

  onSubmit(model: any) {
    console.log(model, this.form);
  }

}
