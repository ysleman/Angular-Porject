import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {GeolocationService} from '@ng-web-apis/geolocation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RestaurantadminComponent } from './restaurantadmin/restaurantadmin.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './newCompoents/login/login.component';
import { AuthLoginGuard } from './guards/auth-login.guard'; // Import your guard
import { AuthGuardWithRequestCheck } from './guards/auth-request-check.guard';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AdminRestaurantAddComponent } from './admin-restaurant-add/admin-restaurant-add.component';
import { AdminEditResturantComponent } from './admin-edit-resturant/admin-edit-resturant.component';
import { AdminUsersAddComponent } from './admin-users-add/admin-users-add.component';
import { AdminDriversAddComponent } from './admin-drivers-add/admin-drivers-add.component';
import { AdminEditDriversComponent } from './admin-edit-drivers/admin-edit-drivers.component';
import { AdminEditUsersComponent } from './admin-edit-users/admin-edit-users.component';
import { AdminEditOrdersComponent } from './admin-edit-orders/admin-edit-orders.component';
import { RestaurantEditOrderComponent } from './restaurant-edit-order/restaurant-edit-order.component';
import { RestaurantEditMenuComponent } from './restaurant-edit-menu/restaurant-edit-menu.component';
import { RestaurantAddMenuComponent } from './restaurant-add-menu/restaurant-add-menu.component';
import { LoginRestaurantComponent } from './login-restaurant/login-restaurant.component';
import { LoginDriverComponent } from './login-driver/login-driver.component';
import { DeliveryDriverAdminComponent } from './delivery-driver-admin/delivery-driver-admin.component';
import { EditDriverOrderComponent } from './edit-driver-order/edit-driver-order.component';
//new Component
import { AboutComponent } from './newCompoents/about/about.component';
import { CartComponent } from './newCompoents/cart/cart.component';
import { CheckoutComponent } from './newCompoents/checkout/checkout.component';
import { NavbarComponent } from './newCompoents/navbar/navbar.component';
import { Err404Component } from './newCompoents/err404/err404.component';
import { FooterComponent } from './newCompoents/footer/footer.component';
import { HomeComponent } from './newCompoents/home/home.component';
import { OrderdetailsComponent } from './newCompoents/orderdetails/orderdetails.component';
import { PaymentComponent } from './newCompoents/payment/payment.component';
import { ProductDetailComponent } from './newCompoents/product-detail/product-detail.component';
import { ProductsComponent } from './newCompoents/products/products.component';
import { ProfileComponent } from './newCompoents/profile/profile.component';
import { RegisterComponent } from './newCompoents/register/register.component';
import { UserDetailComponent } from './newCompoents/user-detail/user-detail.component';
import { AuthGuardDriverService } from './guards/auth-guard-driver.service';
import { AuthGuardRestaurantService } from './guards/auth-guard-restaurant.service';
import { LocationSelectorComponent } from './location-selector/location-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RestaurantadminComponent,
    MenuItemsComponent,
    LoginAdminComponent,
    LoginComponent,
    BarChartComponent,
    PieChartComponent,
    AdminRestaurantAddComponent,
    AdminEditResturantComponent,
    AdminUsersAddComponent,
    AdminDriversAddComponent,
    AdminEditDriversComponent,
    AdminEditUsersComponent,
    AdminEditOrdersComponent,
    RestaurantEditOrderComponent,
    RestaurantEditMenuComponent,
    RestaurantAddMenuComponent,
    LoginRestaurantComponent,
    LoginDriverComponent,
    DeliveryDriverAdminComponent,
    EditDriverOrderComponent,
    //new compoents 
    AboutComponent,
    CartComponent,
    CheckoutComponent,
    NavbarComponent,
    Err404Component,
    FooterComponent,
    HomeComponent,
    OrderdetailsComponent,
    PaymentComponent,
    ProductDetailComponent,
    ProductsComponent,
    ProfileComponent,
    RegisterComponent,
    UserDetailComponent,
    LocationSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    FormsModule
  ],
  providers: [ AuthLoginGuard,AuthGuardWithRequestCheck,AuthGuardDriverService,AuthGuardRestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
