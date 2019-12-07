import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[],
    editiedIngredient: Ingredient,
    editedIngredientIndex: number
}

export interface AppState {
    shoppingList: State
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editiedIngredient: null,
    editedIngredientIndex: -1
}


export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListActions.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.UPDATE_INGRIDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredient,
                editedIngredientIndex: -1,
                editiedIngredient: null
            };

        case ShoppingListActions.DELETE_INGRIDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i != action.payload),
                editedIngredientIndex: -1,
                editiedIngredient: null
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editiedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editiedIngredient: null
            };
        default:
            return state;
    }

}