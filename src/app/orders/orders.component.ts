import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {Order} from "../interfaces/order";
import {NzButtonSize} from "ng-zorro-antd/button";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private router: Router
  ) { }

  orders: Order[] = []; //订单信息列表
  searchValue = ''; //搜索内容
  visible = false; //搜索框是否可见
  ordersDisplay?: Order[]; //搜索功能显示列表
  type = this.userService.loginType; //页面访问权限
  order?: Order;
  size: NzButtonSize = 'small';

  getOrders():void{ //获取订单信息
    this.userService.getOrders().subscribe(
      res => {
        this.orders = res;
        this.ordersDisplay = res;
        this.message.create('success', '获取订单信息列表!');
      }
    );
  }

  reset(): void { //重置搜索内容
    this.searchValue = '';
    this.search();
  }

  search(): void { //ID搜索
    this.visible = false;
    this.ordersDisplay = this.orders.filter((item: Order) => item.oID.indexOf(this.searchValue) !== -1);
    if(this.searchValue != '')
      this.message.create('success', `已展示订单ID包含 ${this.searchValue} 的订单信息!`);
    else
      this.message.create('success', '重置订单列表！');
  }

  deleteConfirm(id: string): void { //确认删除对话框
    this.modal.confirm({
      nzTitle: '<i>确认删除订单信息?</i>',
      nzContent: `<b>ID:${id};</b>`,
      nzOnOk: () => {
        this.deleteRow(id);
      }
    });
  }

  deleteRow(id: string): void { //删除订单信息
    this.ordersDisplay = this.orders.filter(d => d.oID !== id);
    this.userService.deleteOrder(id).subscribe();
    this.notification.create('success', '删除成功!', `成功删除ID为${id}的订单信息!`);
  }

  ngOnInit(): void {
    this.getOrders();
  }

}
