import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Order} from "../interfaces/order";
import {Meal} from "../interfaces/meal";

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  id: string = this.userService.loginID;
  name: string = this.userService.loginName;
  order: Order = {oID: '', uID: '', wID: '', mID: '', oStatus: 0, oDatetime: new Date(), fDatetime: new Date()};
  meal: Meal = {mID: '', mName: '', wID: '', mType: '', mainIngredient: '', price: 0, maxSupply: 0, remainSupply: 0};

  getOrder(): void {
    this.userService.getOrderByID(this.userService.oID).subscribe(
      res => {
        this.order = res;
      }
    );
  }

  getMeal(): void {
    this.userService.getMealByID(this.userService.mID).subscribe(
      res => {
        this.meal = res;
      }
    );
  }

  ngOnInit(): void {
    this.getOrder();
    this.getMeal();
  }

}
