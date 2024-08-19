import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { AdminRestaurantAddComponent } from './admin-restaurant-add/admin-restaurant-add.component';
import {LoginComponent} from './newCompoents/login/login.component';
import { AuthLoginGuard } from './guards/auth-login.guard';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthGuardWithRequestCheck } from './guards/auth-request-check.guard';
import { AdminEditResturantComponent } from './admin-edit-resturant/admin-edit-resturant.component';
import { AdminUsersAddComponent } from './admin-users-add/admin-users-add.component';
import { AdminEditUsersComponent } from './admin-edit-users/admin-edit-users.component';
import { AdminDriversAddComponent } from './admin-drivers-add/admin-drivers-add.component';
import { AdminEditDriversComponent } from './admin-edit-drivers/admin-edit-drivers.component';
import { AdminEditOrdersComponent } from './admin-edit-orders/admin-edit-orders.component';
import { RestaurantadminComponent } from './restaurantadmin/restaurantadmin.component';
import { RestaurantEditOrderComponent } from './restaurant-edit-order/restaurant-edit-order.component';
import { RestaurantAddMenuComponent } from './restaurant-add-menu/restaurant-add-menu.component';
import { RestaurantEditMenuComponent } from './restaurant-edit-menu/restaurant-edit-menu.component';
import { LoginRestaurantComponent } from './login-restaurant/login-restaurant.component';
import { LoginDriverComponent } from './login-driver/login-driver.component';
import { AuthGuardRestaurantService } from './guards/auth-guard-restaurant.service';
import { DeliveryDriverAdminComponent } from './delivery-driver-admin/delivery-driver-admin.component';
import { AuthGuardDriverService } from './guards/auth-guard-driver.service';
import { EditDriverOrderComponent } from './edit-driver-order/edit-driver-order.component';
import { HomeComponent } from './newCompoents/home/home.component';
import { AboutComponent } from './newCompoents/about/about.component';
import { ProductDetailComponent } from './newCompoents/product-detail/product-detail.component';
import { CheckoutComponent } from './newCompoents/checkout/checkout.component';
import { OrderdetailsComponent } from './newCompoents/orderdetails/orderdetails.component';
import { CartComponent } from './newCompoents/cart/cart.component';
import { PaymentComponent } from './newCompoents/payment/payment.component';
import { ProfileComponent } from './newCompoents/profile/profile.component';
import { RegisterComponent } from './newCompoents/register/register.component';
import { Err404Component } from './newCompoents/err404/err404.component';
import { UserDetailComponent } from './newCompoents/user-detail/user-detail.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuardWithRequestCheck] },
  { path: 'admin/restaurantAdd', component: AdminRestaurantAddComponent,canActivate: [AuthGuardWithRequestCheck] },
  { path: 'admin/restaurantEdit/:id', component: AdminEditResturantComponent,canActivate: [AuthGuardWithRequestCheck] },
  {path:'admin/addUser',component: AdminUsersAddComponent},
  { path: 'admin/userEdit/:id', component: AdminEditUsersComponent,canActivate: [AuthGuardWithRequestCheck] },
  {path:'admin/driverAdd',component: AdminDriversAddComponent},
  { path: 'admin/driverEdit/:id', component: AdminEditDriversComponent,canActivate: [AuthGuardWithRequestCheck] },
  { path: 'admin/orderEdit/:id', component: AdminEditOrdersComponent,canActivate: [AuthGuardWithRequestCheck] },
  {path:'restaurant_admin',component: RestaurantadminComponent,canActivate:[AuthGuardRestaurantService]},
  {path:'restaurant_admin/edit_order/:id',component: RestaurantEditOrderComponent,canActivate:[AuthGuardRestaurantService]},
  {path:'restaurant_admin/add_menu_item',component: RestaurantAddMenuComponent,canActivate:[AuthGuardRestaurantService]},
  {path:'restaurant_admin/edit_menu_item/:id',component: RestaurantEditMenuComponent,canActivate:[AuthGuardRestaurantService]},
  {path:'driver',component:DeliveryDriverAdminComponent,canActivate:[AuthGuardDriverService]},
  {path:'driver/edit-order/:id',component:EditDriverOrderComponent,canActivate:[AuthGuardDriverService]},
  {path: 'menu' ,component : MenuItemsComponent},
  {path: 'login', component: LoginComponent ,canActivate: [AuthLoginGuard]},
  {path :'login_restaurant',component:LoginRestaurantComponent,canActivate: [AuthLoginGuard]},
  {path :'login_driver',component:LoginDriverComponent,canActivate: [AuthLoginGuard]},
  {path:'admin12343583883738392738297382', component: LoginAdminComponent,canActivate: [AuthLoginGuard] },
 
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'about', component: AboutComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orderdetails', component: OrderdetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent }, // Add PaymentComponent route
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'user',
        component: UserDetailComponent
      }
    ]
  },
  // Not Found 404 Error
  // { path: '**', component: Err404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
