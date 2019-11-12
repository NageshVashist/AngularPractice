import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,private router:Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  getControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  private initForm() {
    let recipeName = '';
    let imgPath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imgPath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(imgPath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
