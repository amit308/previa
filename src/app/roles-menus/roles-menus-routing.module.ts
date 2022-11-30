import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusComponent } from './menus/menus.component';
import { RolesComponent } from './roles/roles.component';


const routes: Routes = [
  {
    path: "",
    children: [
     
      { path: 'roles', component: RolesComponent },
      { path: 'menus', component: MenusComponent },
    ],
  }
]
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesMenusRoutingModule { }
