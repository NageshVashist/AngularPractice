import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService,
  private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.shopingList;
    // this.subscription = this.shoppingListService.subject.subscribe(data => {
    //   this.ingredients = data;
    // });
  }

  onEdit(i: number) {
    // this.shoppingListService.startedEditing.next(i);
    this.store.dispatch(new ShoppingListAction.StartEdit(i));
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  onIngredientRemove(ingredient: Ingredient) {
    this.shoppingListService.removeIngredient(ingredient);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
