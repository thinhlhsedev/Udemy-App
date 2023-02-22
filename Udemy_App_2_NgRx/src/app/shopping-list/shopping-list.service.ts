import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  //ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  startEditting = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // addIngedients(ingredients : Ingredient[]){
  //   for(let ingredient of ingredients){
  //     this.addIngredient(ingredient);
  //   }
  // }

  addIngedients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngedient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngedient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
