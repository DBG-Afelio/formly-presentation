import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, map } from 'rxjs';
import { Pizza, TestService, Topping } from '../../services/test.service.service';

@Component({
  selector: 'app-formly-state',
  templateUrl: './formly-state.html',
  styleUrls: ['./formly-state.scss']
})
export class FormlyState {

  form: UntypedFormGroup = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  state: any = {
    currentPizza: null,
    currentPizza$: new BehaviorSubject<Pizza | null>(null),
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
        key: 'example1',
        templateOptions: {
          labelSection: 'Expression Properties',
          cardTitle: 'Utiliser le state',

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
                    }))
                  ]
                })
              )
            }
          },
          {
            key: 'name',
            type: 'text',
            templateOptions: {
              placeholder:'Entrez le nom de la nouvelle Pizza',
              Label: 'Nom',
              required: true
            },
            hideExpression: (model, state, field) => {
              return state?.currentPizza?.id!==null;
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
                return model.pizzas?.toppings ? model.pizzas.toppings.reduce((acc: any,res: any) => {return {...acc, ['_'+res]: true}}, {}) : {};
              }
            }
          }

        ]
      },
      {
        wrappers: ['section-wrapper'],
        key: 'example2',
        templateOptions: {
          labelSection: 'Expression Properties',
          cardTitle: 'Attention behaviorSubject',

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
                    }))
                  ]
                })
              )
            }
          },
          {
            key: 'name',
            type: 'text',
            templateOptions: {
              placeholder:'Entrez le nom de la nouvelle Pizza',
              Label: 'Nom',
              required: true
            },
            hideExpression: (model, state, field) => {
              return state?.currentPizza$.getValue()?.id!==null;
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
                return model.pizzas?.toppings ? model.pizzas.toppings.reduce((acc: any,res: any) => {return {...acc, ['_'+res]: true}}, {}) : {};
              }
            }
          }

        ]
      }
    ];
  }

  onSubmit(model: any) {
    this.state.currentPizza = { id: null, name: 'Nouvelle', toppings: [] };
    
    console.log(model, this.form);
  }
  onAddWithBehavior() {
    this.state.currentPizza$.next({ id: null, name: 'Nouvelle', toppings: [] });
    
    console.log(this.model, this.form);
  }

}
