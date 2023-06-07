import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Order} from "../interfaces/order";

@Component({
  selector: 'app-window-orders',
  templateUrl: './window-orders.component.html',
  styleUrls: ['./window-orders.component.css']
})
export class WindowOrdersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) { }

  orders: Order[] = []; //窗口历史订单列表
  searchValue = ''; //搜索内容
  visible = false; //搜索框是否可见
  ordersDisplay?: Order[]; //显示列表
  type = this.userService.loginType; //控制访问权限
  id = this.userService.loginID;

  getWindowOrders(): void{ //获取历史订单列表
    this.userService.getWindowOrders(this.id).subscribe(
      res => {
        this.orders = res;
        this.ordersDisplay = res;
        this.message.create('success', '获取窗口历史订单列表!');
      }
    )
  }

  reset(): void { //重置搜索内容
    this.searchValue = '';
    this.search();
  }

  search(): void { //订单搜索
    this.visible = false;
    this.ordersDisplay = this.orders.filter((item: Order) => item.oID.indexOf(this.searchValue) !== -1);
    if(this.searchValue != '')
      this.message.create('success', `已展示订单ID包含 ${this.searchValue} 的订单信息!`);
    else
      this.message.create('success', '重置历史订单列表！');
  }

  ngOnInit(): void {
    if (this.type == "window") this.getWindowOrders();
  }

}
