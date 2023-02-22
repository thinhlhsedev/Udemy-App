import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();

  //Chuyen ve RecipeService
  // recipes: Recipe[] = [
  //   new Recipe("A test", "Test", "https://hips.hearstapps.com/hmg-prod/images/190418-arroz-con-pollo-horizontal-1556222282.png?crop=1.00xw:0.752xh;0,0&resize=980:*"),
  //   new Recipe("B test", "Test", "https://hips.hearstapps.com/hmg-prod/images/190418-arroz-con-pollo-horizontal-1556222282.png?crop=1.00xw:0.752xh;0,0&resize=980:*")
  // ];

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    //this.recipes = this.recipeService.getRecipes();
    //this.subscription = this.recipeService.recipesChanged.subscribe(
    this.subscription = this.store
      .select('recipe')
      .pipe(
        map((recipesState) => {
          return recipesState.recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
