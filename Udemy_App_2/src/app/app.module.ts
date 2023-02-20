import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //RecipeModule,
    ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
  //EntryComponent dung de khai bao cac component khong duoc dung bang cach goi directive tren template (duoc tao trong file.ts)
})
export class AppModule {}
