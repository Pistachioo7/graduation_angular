import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Order} from "../interfaces/order";
import {User} from "../interfaces/user";
import {Window} from "../interfaces/window";
import {Meal} from "../interfaces/meal";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  id = this.userService.loginID;
  type = this.userService.loginType;
  order: Order = {oID: '', uID: '', wID: '', mID: '', oStatus: 0, oDatetime: new Date(), fDatetime: new Date()};
  user: User = {uID: '', uName: '', uSex: 1, uBirthday: new Date(), uPassword: ''};
  window: Window = {wID: '', wName: '', mealAmount: 0, wStatus: 1, wPassword: ''};
  meal: Meal = {mID: '', mName: '', wID: '', mType: '', mainIngredient: '', price: 0, maxSupply: 0, remainSupply: 0};

  async getOrder() { //获取需要查看的订单信息
    const oID = this.route.snapshot.paramMap.get("oID") as string;
    this.order = <Order> await this.userService.getOrderByID(oID).toPromise();
    this.userService.getUserByID(this.order.uID).subscribe(
      res => this.user = res
    );
    this.userService.getWindowByID(this.order.wID).subscribe(
      res => this.window = res
    );
    this.userService.getMealByID(this.order.mID).subscribe(
      res => this.meal = res
    );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getOrder();
  }

}
