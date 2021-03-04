import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DiningComponent } from './components/dining/dining.component';
import { EventComponent } from './components/event/event.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dining', component: DiningComponent},
  {path: 'event', component: EventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
