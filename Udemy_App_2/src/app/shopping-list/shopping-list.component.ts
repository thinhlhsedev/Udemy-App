import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [
  //   new Ingredient("Apples", 10),
  //   new Ingredient("Tomatoes", 5),
  // ];

  ingredients: Ingredient[];
  private subcription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subcription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  // onIngredientAdded(){
  // this.ingredients.push(ingredient);
  // }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startEditting.next(index);
  }
}
