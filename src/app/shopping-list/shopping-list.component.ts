import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { RecipeService } from '../recipes/service/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
    this.ingredients= this.recipeService.shopingList;
  }

  onIngredientAdded(ingredient:Ingredient){
    this.ingredients.push(ingredient);
  }
}
