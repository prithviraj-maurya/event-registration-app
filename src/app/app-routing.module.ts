import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent},
  { path: 'register', component: RegistrationComponent},
  { path: '', pathMatch: 'full', redirectTo: 'register'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
