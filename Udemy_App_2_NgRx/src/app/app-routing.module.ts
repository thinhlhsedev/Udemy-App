import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //Su dung lazy load
  //Khi bat dau app, Angular se doc toan bo route duoc khai bao. Tuy nhien, khi moi khoi tao
  //ung dung, se co nhung route chua duoc can duoc su dung, ap dung Lazy load de giam tai luong
  //code duoc bundle tai 1 thoi diem => perf tang
  // 1. De dung lazy load, prequisite la chia duoc route
  // 2. Sau khi loadChildren() o appModule, module can lazy load khong duoc phep xuat hien trong
  // trong import:[] cua appModule
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

//Su dung lazy load se tang perf. Tuy nhien, theo co che lazy load, chi khi nao module can duoc
// su dung thi Angular moi goi den => co the dan den delay => preload lazy load
//Preload se chuan bi san bundle tuy vao cach chon preloadingStrategy, cac bundle se duoc goi len
// khi route duoc goi
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
