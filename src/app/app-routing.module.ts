import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OrderComponent} from "./order/order.component";
import {RegisterComponent} from "./register/register.component";
import {RegisterSuccessComponent} from "./register-success/register-success.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {WindowLoginComponent} from "./window-login/window-login.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {OrderSuccessComponent} from "./order-success/order-success.component";
import {UsersComponent} from "./users/users.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CancelSuccessComponent} from "./cancel-success/cancel-success.component";
import {UserOrdersComponent} from "./user-orders/user-orders.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {ReceiveComponent} from "./receive/receive.component";
import {WindowOrdersComponent} from "./window-orders/window-orders.component";
import {MealsComponent} from "./meals/meals.component";
import {EditMealComponent} from "./edit-meal/edit-meal.component";
import {EditWindowComponent} from "./edit-window/edit-window.component";
import {WindowsComponent} from "./windows/windows.component";
import {OrdersComponent} from "./orders/orders.component";
import {EditOrderComponent} from "./edit-order/edit-order.component";
import {MealComponent} from "./meal/meal.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/order' },
  { path: 'order', component: OrderComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register-success', component: RegisterSuccessComponent},
  { path: 'user-login', component: UserLoginComponent},
  { path: 'window-login', component: WindowLoginComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'order-success', component: OrderSuccessComponent},
  { path: 'users', component: UsersComponent},
  { path: 'edit-user/:uID', component: EditUserComponent},
  { path: 'edit-window/:wID', component: EditWindowComponent},
  { path: 'edit-meal/:mID', component: EditMealComponent},
  { path: 'edit-order/:oID', component: EditOrderComponent},
  { path: 'meal/:mID', component: MealComponent},
  { path: 'order-details/:oID', component: OrderDetailsComponent},
  { path: 'cancel-success', component: CancelSuccessComponent},
  { path: 'user-orders', component: UserOrdersComponent},
  { path: 'window-orders', component: WindowOrdersComponent},
  { path: 'user-info', component: UserInfoComponent},
  { path: 'receive', component: ReceiveComponent},
  { path: 'meals', component: MealsComponent},
  { path: 'windows', component: WindowsComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
