import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { AuthGuard } from "../auth/auth.guard";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipeRoute: Routes = [
    {
        path: '',
        component: RecipesComponent,
        resolve: [RecipeResolver],
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: SelectRecipeComponent,
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [RecipeResolver]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipeResolver]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(recipeRoute)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}