import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver..service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  // khong can dung slash ex: /users
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id/:name', component: UserComponent }, // them param vao route
    ],
  },

  {
    path: 'servers',
    //canActivate: [AuthGuard] dam bao rang route nay, cung voi nhung route child chi co the duoc truy cap neu thoa man Auth Guard
    //hien tai, dieu kien la loggedIn = true
    //canActivate: [AuthGard],
    canActivateChild: [AuthGard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  //{ path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found !' },
  },
  { path: '**', redirectTo: '/not-found' }, //bat tat ca cac Url khong nam trong Routes hien tai, nam cuoi cung trong Routes
];

@NgModule({
  //Moi request deu di qua server truoc khi toi duoc Angular. Routing hien tai voi mot vai browser co the bi dinh 404.
  //De tranh truong hop tren, minh dung useHash: true. Ex: url localhost:4200/server => localhost:4200/#/server
  //Luc nay, server se chi quan tam toi phan truoc dau # cua url, Angular lo phan con lai.
  //imports: [RouterModule.forRoot(appRoutes, {useHash:true})],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
