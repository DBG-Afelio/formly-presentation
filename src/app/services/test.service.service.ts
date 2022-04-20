import { delay, Observable, of } from 'rxjs'

export interface Pizza {
  id: string,
  name: string,
  toppings: string[]
}

export interface Topping {
  id: string,
  name: string
}

const toppings: Topping[] = [
  {'id':'1', 'name':'Mozzarella'},
  {'id':'2', 'name':'Tomates'},
  {'id':'3', 'name':'Roblochon'},
  {'id':'4', 'name':'Ananas'},
]

const pizzas: Pizza[] = [
  {'id': '134', 'name': 'vide', 'toppings': []},
  {'id': '124', 'name': 'Margherita', 'toppings': ['1','2']},
  {'id': '1234', 'name': '4 fromages', 'toppings': ['1','2','3']},
]

export class TestService {

  constructor() { }

  public getPizzas(): Observable<Pizza[]> {
    return of(pizzas).pipe(delay(1000));
  }

  public getToppings(): Observable<Topping[]> {
    return of(toppings).pipe(delay(1000));
  }
}
