import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { StorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./service/recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]>{
    constructor(private storageService:StorageService,private recipeService:RecipeService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes=this.recipeService.getRecipes();
        if(recipes.length==0){

            return this.storageService.fetchRecipes();
        }
        else{
            return recipes;
        }
    }

}