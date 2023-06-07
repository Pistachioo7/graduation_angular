import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Order} from "../interfaces/order";
import {Window} from "../interfaces/window";
import {NzButtonSize} from "ng-zorro-antd/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  size: NzButtonSize = 'large';
  id = this.userService.loginID;
  type = this.userService.loginType;
  receivedOrders?: Order[]; //当前订单列表
  status = 0;
  window: Window = {wID: '', wName: '', mealAmount: 0, wStatus: 0, wPassword: ''};

  changeStatus(): void {
    this.window.wStatus = this.status;
    this.userService.updateWindow(this.window).subscribe();
  }

  getWindow(): void {
    this.userService.getWindowByID(this.id).subscribe(
      res => {
        this.window = res;
        this.status = res.wStatus;
      }
    )
  }

  getReceivedOrders(): void { //获取当前订单
    this.userService.getReceivedOrders(this.userService.loginID).subscribe(
      res => {
        this.receivedOrders = res;
      }
    );
  }

  checkOrder(oID: string): void { //接收订单
    this.userService.checkOrder(oID).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 300)
  }

  cookOrder(oID: string): void { //餐品备好
    this.userService.cookOrder(oID).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 300)
  }

  finishOrder(oID: string): void { //完成订单
    this.userService.finishOrder(oID).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 300)
  }

  ngOnInit(): void {
    if (this.type == "window") {
      this.getWindow();
      this.getReceivedOrders();
    }
  }

}
