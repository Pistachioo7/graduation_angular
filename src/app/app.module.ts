import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import { NavigationComponent } from './navigation/navigation.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzIconModule} from "ng-zorro-antd/icon";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzButtonModule} from "ng-zorro-antd/button";
import { OrderComponent } from './order/order.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzProgressModule} from "ng-zorro-antd/progress";
import { RegisterSuccessComponent } from './register-success/register-success.component';
import {NzResultModule} from "ng-zorro-antd/result";
import { RegisterComponent } from './register/register.component';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { UserLoginComponent } from './user-login/user-login.component';
import { WindowLoginComponent } from './window-login/window-login.component';
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import { OrderSuccessComponent } from './order-success/order-success.component';
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzModalModule} from "ng-zorro-antd/modal";
import { SexPipe } from './pipes/sex.pipe';
import { OStatusPipe } from './pipes/o-status.pipe';
import { UsersComponent } from './users/users.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import { EditUserComponent } from './edit-user/edit-user.component';
import { CancelSuccessComponent } from './cancel-success/cancel-success.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import { ReceiveComponent } from './receive/receive.component';
import { WindowOrdersComponent } from './window-orders/window-orders.component';
import { MealsComponent } from './meals/meals.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { WindowsComponent } from './windows/windows.component';
import { WstatusPipe } from './pipes/wstatus.pipe';
import { EditWindowComponent } from './edit-window/edit-window.component';
import { OrdersComponent } from './orders/orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { MealComponent } from './meal/meal.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {NzEmptyModule} from "ng-zorro-antd/empty";
import { StatisticsComponent } from './statistics/statistics.component';
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzBadgeModule} from "ng-zorro-antd/badge";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdminLoginComponent,
    OrderComponent,
    RegisterSuccessComponent,
    RegisterComponent,
    UserLoginComponent,
    WindowLoginComponent,
    OrderSuccessComponent,
    SexPipe,
    OStatusPipe,
    UsersComponent,
    EditUserComponent,
    CancelSuccessComponent,
    UserOrdersComponent,
    UserInfoComponent,
    ReceiveComponent,
    WindowOrdersComponent,
    MealsComponent,
    EditMealComponent,
    WindowsComponent,
    WstatusPipe,
    EditWindowComponent,
    OrdersComponent,
    EditOrderComponent,
    MealComponent,
    OrderDetailsComponent,
    StatisticsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        NzMenuModule,
        NzIconModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzCheckboxModule,
        NzButtonModule,
        NzCardModule,
        NzSpaceModule,
        NzProgressModule,
        NzResultModule,
        NzRadioModule,
        NzDatePickerModule,
        NzMessageModule,
        NzNotificationModule,
        NzAlertModule,
        NzModalModule,
        NzTableModule,
        NzToolTipModule,
        NzDividerModule,
        NzDropDownModule,
        NzDescriptionsModule,
        NzSwitchModule,
        NzEmptyModule,
        NzStatisticModule,
        NzPageHeaderModule,
        NzRateModule,
        NzBadgeModule
    ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
