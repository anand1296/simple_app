import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormReactiveComponent } from './components/login-form-reactive/login-form-reactive.component';
import { LoginFormTemplateDrivenComponent } from './components/login-form-template-driven/login-form-template-driven.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationFormReactiveComponent } from './components/registration-form-reactive/registration-form-reactive.component';
import { RegistrationFormTemplateDrivenComponent } from './components/registration-form-template-driven/registration-form-template-driven.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialLoginModule, GoogleLoginProvider } from 'angularx-social-login';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
//mat imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { AlternateIfDirective } from './directives/alternate-if.directive';
import { CustomColorDirective } from './directives/custom-color.directive';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormReactiveComponent,
    LoginFormTemplateDrivenComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationFormReactiveComponent,
    RegistrationFormTemplateDrivenComponent,
    HomeComponent,
    SidenavListComponent,
    AlternateIfDirective,
    CustomColorDirective,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    { provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('570996035532-kqkb799ffjrjllm2kj1k4pnq9e09gurg.apps.googleusercontent.com')
          }
        ]
      }  as SocialAuthServiceConfig,
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ImageSelectorComponent ]
})
export class AppModule { }
