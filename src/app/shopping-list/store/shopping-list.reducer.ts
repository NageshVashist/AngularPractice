import { Ingredient } from "src/app/shared/ingredient.model";
import { Action } from "@ngrx/store";

const initialState = {
    ingredient: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
}

export function soppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'ADD_INGREDIENTS'{
            return {
                ...state,
                ingredient: [...state.ingredient],
                action
            }
        }
    }

}