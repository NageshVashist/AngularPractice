import { NgModule } from "@angular/core";
import { RecipeService } from "./recipes/service/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { StorageService } from "./shared/data-storage.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthIntercepterService } from "./auth/auth.intercepter.service";

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthIntercepterService,
            multi: true
        }
    ]
})
export class CoreModule { }