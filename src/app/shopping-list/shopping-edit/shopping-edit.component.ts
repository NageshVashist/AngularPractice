import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number
  editedIngredient:Ingredient;
  constructor(private shoppingService:ShoppingListService) {
    
  }
  
  ngOnInit() {
    this.subscription= this.shoppingService.startedEditing.subscribe((i:number)=>{
      this.editMode=true;
      this.editedItemIndex=i;
      this.editedIngredient=this.shoppingService.getIngredient(i);
      this.slForm.setValue({
        name:this.editedIngredient.name,
        amount:this.editedIngredient.amount
      });
    });
  }
  onAddItem(form:NgForm) {
    const value =form.value;
    const ingredient= new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,ingredient);
    }
    else{
      this.shoppingService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.shoppingService.removeIngredient(this.editedIngredient);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
