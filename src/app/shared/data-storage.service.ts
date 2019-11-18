import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/service/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/Operators";
import { Observable, pipe } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class StorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

    }

    storeRecipes() {
        this.http.put('https://recipe-2223c.firebaseio.com/recipes.json',
            this.recipeService.getRecipes()).subscribe(response => console.log(response)
            );
    }
    fetchRecipes() {

        return this.http.
            get<Recipe[]>('https://recipe-2223c.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }), tap((recipe: Recipe[]) => { this.recipeService.setRecipes(recipe) }));


    }
}