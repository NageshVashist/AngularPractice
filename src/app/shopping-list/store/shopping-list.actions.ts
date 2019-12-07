import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGRIDIENT = 'UPDATE_INGRIDIENT';
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }

}

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { }

}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGRIDIENT;
    constructor(public payload: Ingredient ) { }

}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGRIDIENT;
    constructor(public payload: Ingredient) { }

}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActions =
    | AddIngredient
    | AddIngredients
    | UpdateIngredient
    | DeleteIngredient
    | StartEdit
    | StopEdit;