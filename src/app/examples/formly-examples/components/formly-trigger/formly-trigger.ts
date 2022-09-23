import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, tap } from 'rxjs';
import { Pizza, TestService, Topping } from '../../services/test.service.service';

@Component({
  selector: 'app-formly-trigger',
  templateUrl: './formly-trigger.html',
  styleUrls: ['./formly-trigger.scss']
})
export class FormlyTrigger {

  form: UntypedFormGroup = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  state: any = {
    currentPizza: null
  };
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
        key: 'example',
        templateOptions: {
          labelSection: 'Expression Properties',
          cardTitle: 'Déclencher depuis Formly',

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
                    { label: 'Nouvelle', pizza: { id: null, name: 'Nouvelle', toppings: [] } }
                  ]
                })
              )
            },
            hooks: {
              onInit: (field) => {
                return field?.formControl?.valueChanges.pipe(
                  tap(pizza => {
                    if (field.options) {
                      field.options.formState.currentPizza = pizza;
                    }
                  }));
              }
            } 
          },
          {
            key: 'name',
            type: 'text',
            templateOptions: {
              placeholder: 'Entrez le nom de la nouvelle Pizza',
              Label: 'Nom',
              required: true
            },
            hideExpression: (model, state, field) => {  
              return state?.currentPizza ? state?.currentPizza.id !== null : true;
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
                      key: '_' + topping.id
                    }))
                  ]
                })
              )
            },
            expressionProperties: {
              'model.toppings': (model, state, field) => {
                // TODO: cocher les ingrédients de la pizza sélectionnée
                return state.currentPizza?.toppings ? state.currentPizza.toppings.reduce((acc: any, res: any) => { return { ...acc, ['_' + res]: true } }, {}) : {};
              }
            }
          }

        ]
      }];
  }

  onSubmit(model: any) {
    console.log(model, this.form);
  }

  addHawai() {
    this.state.currentPizza = { id: null, name: 'Hawaï', toppings: [1,4] }
  }

}
