import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormReactiveComponent } from './components/login-form-reactive/login-form-reactive.component';
import { RegistrationFormReactiveComponent } from './components/registration-form-reactive/registration-form-reactive.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginFormReactiveComponent },
  { path: 'register', component: RegistrationFormReactiveComponent },
  { path: 'images', component: ImageSelectorComponent },
  { path: '**', component: LoginFormReactiveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
