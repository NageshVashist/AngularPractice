import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../Store/shopping-list.actions';
import * as fromShoppingList from '../Store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number
  editedIngredient: Ingredient;
  constructor(private shoppingService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {

  }

  ngOnInit() {
    this.subscription =this.store.select('shoppingList').subscribe(storeData=>{
      if(storeData.editedIngredientIndex>-1){
        this.editMode=true;
        this.editedIngredient=storeData.editiedIngredient;
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
      else{
        this.editMode=false;
      }
    });
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.shoppingService.updateIngredient(this.editedItemIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    }
    else {
      // this.shoppingService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {
    // this.shoppingService.removeIngredient(this.editedIngredient);

    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIngredient))
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
