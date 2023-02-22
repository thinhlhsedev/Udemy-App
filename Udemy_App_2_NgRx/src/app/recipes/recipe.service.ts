import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Injectable({ providedIn: 'root' })
export class RecipeService {
  //recipeSelected = new EventEmitter<Recipe>();
  //recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  // private recipes: Recipe[] = [
  //   new Recipe("Tasty", "Good Tasty",
  //   "https://hips.hearstapps.com/hmg-prod/images/190418-arroz-con-pollo-horizontal-1556222282.png?crop=1.00xw:0.752xh;0,0&resize=980:*",
  //   [
  //     new Ingredient("Mear", 1),
  //     new Ingredient("French Fries", 3),
  //   ]),
  //   new Recipe("Hamburger", "And Meat",
  //   "https://hips.hearstapps.com/hmg-prod/images/190418-arroz-con-pollo-horizontal-1556222282.png?crop=1.00xw:0.752xh;0,0&resize=980:*",
  //   [
  //     new Ingredient("Bread", 3),
  //     new Ingredient("Meat", 4),
  //   ])
  // ];

  private recipes: Recipe[] = [];

  getRecipes() {
    //tra ve ban copy cua recipe => tu ben ngoai chi co the truy cap vao ban copy cua data goc
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //this.shoppingListService.addIngedients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
