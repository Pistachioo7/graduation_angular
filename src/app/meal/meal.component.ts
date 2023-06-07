import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Meal} from "../interfaces/meal";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {Order} from "../interfaces/order";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) { }

  meal: Meal = {mID: '', mName: '', wID: '', mType: '', mainIngredient: '', price: 0, maxSupply: 0, remainSupply: 0};
  id = this.userService.loginID;
  type = this.userService.loginType;
  orderMessage?: Order; //向服务提交订单信息
  status = 1;

  getMeal(): void { //获取需要查看的餐品信息
    const mID = this.route.snapshot.paramMap.get("mID") as string;
    this.userService.getMealByID(mID).subscribe(
      res => {
        this.meal = res;
      }
    );
  }

  orderConfirm(meal: Meal): void { //订单确认对话框
    this.userService.getWindowByID(meal.wID).subscribe(
      res => {
        this.status = res.wStatus;
      }
    )
    if (this.userService.loginID == '') { //未登录
      this.message.create('warning', '请先登录!');
      return;
    }
    this.modal.confirm({
      nzTitle: '<i>确认订单?</i>',
      nzContent: `<b>${this.userService.loginName} ${this.userService.loginID} 预订 ${meal.mName}</b>`,
      nzOnOk: () => this.order(meal)
    });
  }

  order(meal: Meal): void{ //订餐
    if (this.status == 0) {
      this.message.create('warning', '该窗口暂未开发!');
      return;
    }
    this.orderMessage = { //构建订单信息
      oID: '', //后端生成
      uID : this.userService.loginID,
      wID : meal.wID,
      mID : meal.mID,
      oStatus : 0,
      oDatetime : new Date(),
      fDatetime : new Date()
    };
    this.userService.order(this.orderMessage).subscribe(
      res =>{
        this.userService.oID = res;
        this.userService.mID = meal.mID;
        this.message.create('success', '订餐成功!');
        this.router.navigateByUrl('order-success');
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getMeal();
  }

}
