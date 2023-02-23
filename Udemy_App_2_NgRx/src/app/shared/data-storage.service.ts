import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  //fetch data khong dung dinh dang cung co the gay error
  //Co the dung pipe().map() de cau hinh kieu du lieu
  fetchRecipes() {

    //this.authService.user.pipe(take(1)).subscribe();

    //Da chuyen phan config token vao interceptor
    /*return this.authService.user.pipe(
    take(count: number) lay gia tri voi so lan khai bao, ex: lay gia tri user 1 lan, roi tu dong unsubscribe
      take(1),
    exhaustMap cho phep noi 2 observable voi nhau, sau khi obs 1 hoan thanh se tu dong thay the bang obs 2
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
          { params: new HttpParams().set("auth", user.Token) }
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
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );*/

    return this.http
      .get<Recipe[]>(
        'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          //this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }
}
