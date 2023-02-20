import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  //@Output() recipeSelected = new EventEmitter<Recipe>();

  //constructor(private recipeService: RecipeService){}

  ngOnInit() {}

  // onSelected() {
  //   this.recipeSelected.emit(this.recipe);
  // }

  // onSelected(){
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
