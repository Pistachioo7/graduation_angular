import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {Meal} from "../interfaces/meal";
import {NzModalService} from "ng-zorro-antd/modal";
import {Order} from "../interfaces/order";
import {NzButtonSize} from "ng-zorro-antd/button";
import {User} from "../interfaces/user";
import {Rating} from "../interfaces/rating";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  size: NzButtonSize = 'large';
  meal: Meal = {mID: '', mName: '', wID: '', mType: '', mainIngredient: '', price: 0, maxSupply: 0, remainSupply: 0};
  meals: Meal[] = []; //餐品信息列表
  currentOrders?: Order[]; //当前订单列表
  loginType = this.userService.loginType; //权限控制
  id = this.userService.loginID;
  orderMessage?: Order; //向服务提交订单信息
  status = 1;
  searchValue = ''; //搜索内容
  mealsDisplay?: Meal[]; //搜索功能显示列表
  rating = 0;
  ratingGot = 0;
  ratingMessage?: Rating;
  searchRating = 0;
  recommendMeals?: Meal[];

  async rateConfirm(meal: Meal) { //评分确认
    if (this.userService.loginID == '' || this.loginType != '') {
      this.message.create('warning', '请先在用户端登录!');
      this.rating = 0;
      return;
    }
    if (this.rating == 0) {
      this.message.create('warning', '评分不能为0!');
      this.rating = 0;
      return;
    }
    this.searchRating = <number> await this.userService.searchRating(this.userService.loginID, meal.mID).toPromise();
    if (this.searchRating != -1) {
      this.message.create('warning', `您已经对该餐品评分，不能重复评分，评分为${this.searchRating}`);
      this.rating = 0;
      return;
    }
    this.ratingGot = this.rating;
    this.modal.confirm({
      nzTitle: '<i>评分数据将会用于个性化推荐，确认评分?</i>',
      nzContent: `<b>餐品:${meal.mName} 评分:${this.ratingGot}</b>`,
      nzOnOk: () => this.rate(meal, this.ratingGot)
    });
  }

  rate(meal: Meal, rating: number): void { //评分
    this.ratingMessage = {
      uID: this.userService.loginID,
      mID: meal.mID,
      rating: rating
    }
    this.userService.rate(this.ratingMessage).subscribe(
      res => this.message.create('success', '评分成功!')
    )
    this.rating = 0;
  }

  getRecommend(): void { //获取推荐餐品
    this.userService.recommend(this.id).subscribe(
      res => this.recommendMeals = res
    );
  }

  reset(): void { //重置搜索内容
    this.searchValue = '';
    this.search();
  }

  search(): void { //餐品名称搜索
    this.mealsDisplay = this.meals.filter((item: Meal) => item.mName.indexOf(this.searchValue) !== -1);
    if(this.searchValue != '')
      this.message.create('success', `已展示名称包含 ${this.searchValue} 的餐品信息!`);
    else
      this.message.create('success', '重置餐品列表！');
  }

  getMeals(): void { //获取餐品信息
    this.userService.getMeals().subscribe(
      res => {
        this.meals = res;
        this.mealsDisplay = res;
        this.message.create('success', '获取餐品信息列表!');
      }
    );
  }

  getCurrentOrders(): void { //获取当前订单
    this.userService.getCurrentOrders(this.userService.loginID).subscribe(
      res => {
        this.currentOrders = res;
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

  cancelConfirm(oID: string): void { //取消订单对话框
    this.modal.confirm({
      nzTitle: '<i>确认取消订单?</i>',
      nzContent: `<b>${this.userService.loginName} ${this.userService.loginID} 取消订单ID ${oID}</b>`,
      nzOnOk: () => this.cancel(oID)
    });
  }

  cancel(oID: string): void{ //取消订单
    this.userService.cancelOrder(oID).subscribe();
    this.router.navigateByUrl('/cancel-success');
  }

  ngOnInit(): void {
    this.getMeals();
    if (this.userService.loginID != '') {
      this.getCurrentOrders();
      this.getRecommend();
    }
  }

}
