import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
import {ListTaskComponent} from "./components/list-task/list-task.component";
import {AuthGuard} from "./services/auth-guard";

export const routes: Routes = [
  {path: '', redirectTo: 'create',pathMatch: 'full'},
  {path: 'create', component: CreateTaskComponent, canActivate: [AuthGuard],},
  {path: 'create/:id', component: CreateTaskComponent, canActivate: [AuthGuard],},
  {path: 'list', component: ListTaskComponent, canActivate: [AuthGuard],},
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
