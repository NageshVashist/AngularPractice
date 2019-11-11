import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.shopingList;
    this.subscription = this.shoppingListService.subject.subscribe(data => {
      this.ingredients = data;
    });
  }

  onEdit(i:number){
    this.shoppingListService.startedEditing.next(i);
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  onIngredientRemove(ingredient: Ingredient) {
    this.shoppingListService.removeIngredient(ingredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
