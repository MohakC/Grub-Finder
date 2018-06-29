import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';



import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { SearchComponent } from './component/search/search.component';
import { RestaurantCardComponent } from './component/restaurant-card/restaurant-card.component';
import { FavoritesComponent} from './component/favorites/favorites.component';
import { CardsViewComponent } from './component/cards-view/cards-view.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { GetJWTService } from './service/get-jwt.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ToolbarComponent,
    SearchComponent,
    RestaurantCardComponent,
    FavoritesComponent,
    CardsViewComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    } ,
    GetJWTService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
