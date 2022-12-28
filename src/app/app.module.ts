import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './pages/home/home.component';
import { GallerySliderComponent } from './shared/gallery-slider/gallery-slider.component';
import { PinkBackgroundDirective } from './directives/background.directive';
import { GalleryGoodItemComponent } from './shared/gallery-good-item/gallery-good-item.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { GoodItemComponent } from './shared/good-item/good-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGoodItemComponent } from './shared/admin-good-item/admin-good-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SpinerComponent } from './shared/spiner/spiner.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { viewAllReducer } from './pages/view-all/store/view-all.reducer';
import { GoodDetailsComponent } from './pages/good-details/good-details.component';
import { goodItemReducer } from './shared/good-item/store/good-item.reducer';
import { authReducer } from './pages/auth-page/store/auth.reducer';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './pages/auth-page/store/auth.effects';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartCardComponent } from './shared/cart-card/cart-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GallerySliderComponent,
    PinkBackgroundDirective,
    GalleryGoodItemComponent,
    ViewAllComponent,
    GoodItemComponent,
    AdminComponent,
    AdminGoodItemComponent,
    AuthPageComponent,
    SpinerComponent,
    GoodDetailsComponent,
    CartPageComponent,
    CartCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
