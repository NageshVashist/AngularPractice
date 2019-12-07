import { Recipe } from "../recipe.model";
import { Observable, Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
export class RecipeService {
 recipeChanged = new Subject<Recipe[]>();
  constructor(private shopingListService: ShoppingListService,private store:Store<fromShoppingList.AppState>) {

  }

  recipes: Recipe[] = [
    // new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //   [new Ingredient('Test1', 12), new Ingredient('Test2', 12), new Ingredient('Test3', 12)]),
    // new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //   [new Ingredient('Test1', 12), new Ingredient('Test2', 12)])
  ];

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipeChanged.next(this.getRecipes());
  }

  getRecipes():Recipe[]{
   
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id:number){
    this.recipes.splice(id,1);
    this.recipeChanged.next(this.recipes.slice());

  }

  addIngredientsToShopingList(ingredients: Ingredient[]) {
    // this.shopingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

}