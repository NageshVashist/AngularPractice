import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected= new EventEmitter<Recipe>();
  recipes: Recipe[]=[];
  
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    const observer:Observable<Recipe[]>=this.recipeService.getRecipes();
    observer.subscribe((recipeData:Recipe[])=>{
      this.recipes=recipeData;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
