import { Recipe } from "../recipe.model";
import { Observable } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";

export class RecipeService {

  constructor(private shopingListService:ShoppingListService){

  }

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Test1', 12), new Ingredient('Test2', 12), new Ingredient('Test3', 12)]),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Test1', 12), new Ingredient('Test2', 12)])
  ];
  
  getRecipes(): Observable<Recipe[]> {
    var observer = new Observable<Recipe[]>(observer => {
      setTimeout(() => {
        observer.next(this.recipes);
      }, 1000);
    });
    return observer;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShopingList(ingredients: Ingredient[]) {
    this.shopingListService.addIngredients(ingredients);
  }

}