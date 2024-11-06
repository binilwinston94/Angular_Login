import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { AngularMaterialComponent } from './Components/angular-material/angular-material.component';
import { PersonalTemplateComponent } from './Components/personal-template/personal-template.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: ''
    , redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'doctors',
    component: DoctorsComponent
  },
  {
    path: 'angularmaterial',
    component: AngularMaterialComponent
  },
  {
    path: 'personalTemplate',
    component: PersonalTemplateComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
