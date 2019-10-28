import { Recipe } from "../recipe.model";
import { Observable } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";

export class RecipeService {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Test1', 12), new Ingredient('Test2', 12), new Ingredient('Test3', 12)]),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Test1', 12), new Ingredient('Test2', 12)])
  ];
  shopingList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
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

  addIngredientsToShopingList(ingredient: Ingredient[]) {
    for (var i = 0; i < ingredient.length; i++) {
      this.shopingList.push(ingredient[i]);
    }
  }

}