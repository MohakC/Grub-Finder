import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate} from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SearchComponent } from './component/search/search.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { AuthguardService as Authguard} from './service/authguard.service';

const routes: Routes = [
  {path : '', redirectTo: '/login', pathMatch: 'full'},
  {path : 'login', component: LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'search', component : SearchComponent, canActivate : [Authguard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [Authguard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule { }
