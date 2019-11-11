import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class ShoppingListService
{
    shopingList: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    subject = new Subject<Ingredient[]>();    
    startedEditing= new Subject<number>();
      getIngredients(){
          return this.shopingList.slice();
      }
      getIngredient(i:number){
        return this.shopingList[i];
      }
      addIngredient(ingredient:Ingredient){
        this.shopingList.push(ingredient);
        this.subject.next(this.shopingList);
      }

      addIngredients(ingredients:Ingredient[]){
        this.shopingList.push(...ingredients);
        this.subject.next(this.shopingList);
      }

      removeIngredient(ingredient:Ingredient){
        this.shopingList=this.shopingList.filter(i=>i!=ingredient);
        this.subject.next(this.shopingList);
      }
      updateIngredient(i:number,ingredient:Ingredient){
        this.shopingList[i]=ingredient;
        this.subject.next(this.shopingList);
      }
      
}