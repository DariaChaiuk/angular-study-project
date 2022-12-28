import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthGuard } from './guards/auth.guard';
import { GoodDetailsComponent } from './pages/good-details/good-details.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'view-all', component: ViewAllComponent},
  { path: 'details/:id', component: GoodDetailsComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthPageComponent },
  { path: 'cart', component: CartPageComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    anchorScrolling: "enabled",
    scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
