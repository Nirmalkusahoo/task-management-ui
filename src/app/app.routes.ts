import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
import {ListTaskComponent} from "./components/list-task/list-task.component";

export const routes: Routes = [
  {path: 'create', component: CreateTaskComponent},
  { path: 'create/:id', component: CreateTaskComponent },
  {path: 'list', component: ListTaskComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
