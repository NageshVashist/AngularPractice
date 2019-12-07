import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipe',
        pathMatch: 'full'
    },
    {
        path: 'recipe',
        // loadChildren:'./recipes/recipes.module#RecipesModule'
        loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
    }, {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules,useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }