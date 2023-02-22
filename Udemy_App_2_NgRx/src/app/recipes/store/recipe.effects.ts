import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipeActions.SetRecipes(recipes);
      })
    );
  });

  storeRecipes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        //withLatestFrom() cho phep truy cap vao mot obs khac de lay data
        withLatestFrom(this.store.select('recipe')),
        //[actionData, recipesState] goi la array destructing
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
            recipesState.recipes
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
