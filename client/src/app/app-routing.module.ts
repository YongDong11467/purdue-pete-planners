import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DiningComponent } from './components/dining/dining.component';
import { EventComponent } from './components/event/event.component';
import { ScheduleComponent } from './components/schedule/schedule.component';


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'home', component:HomeComponent},
  {path:'dining', component:DiningComponent},
  {path:'event', component:EventComponent},
  {path:'schedule', component:ScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
