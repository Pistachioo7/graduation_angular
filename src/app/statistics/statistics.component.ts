import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  type = this.userService.loginType;
  userCnt = 0;
  windowCnt = 0;
  windowOpenCnt = 0;
  maxSupplyCnt = 0;
  remainSupplyCnt = 0;
  res = 0;
  mealCnt = 0;
  orderCnt = 0;
  ratingCnt = 0;
  rating5Cnt = 0;
  rating4Cnt = 0;
  rating3Cnt = 0;
  rating2Cnt = 0;
  rating1Cnt = 0;

  getUserCnt(): void {
    this.userService.getUsers().subscribe(
      res => this.userCnt = res.length
    )
  }

  getWindowCnt(): void {
    this.userService.getWindows().subscribe(
      res => {
        this.windowCnt = res.length;
        this.windowOpenCnt = res.filter(item => item.wStatus == 1).length;
      }
    )
  }

  getMealCnt(): void {
    this.userService.getMeals().subscribe(
      res => {
        this.mealCnt = res.length;
        res.forEach(item => this.maxSupplyCnt += item.maxSupply);
        res.forEach(item => this.remainSupplyCnt += item.remainSupply);
        this.res = <number><unknown>(this.remainSupplyCnt / this.maxSupplyCnt * 100).toFixed(2)
      }
    )
  }

  getOrderCnt(): void {
    this.userService.getOrders().subscribe(
      res => this.orderCnt = res.length
    )
  }

  getRatingCnt(): void {
    this.userService.getRatings().subscribe(
      res => {
        this.ratingCnt = res.length;
        this.rating5Cnt = res.filter(item => item.rating == 5).length;
        this.rating4Cnt = res.filter(item => item.rating == 4).length;
        this.rating3Cnt = res.filter(item => item.rating == 3).length;
        this.rating2Cnt = res.filter(item => item.rating == 2).length;
        this.rating1Cnt = res.filter(item => item.rating == 1).length;
      }
    )
  }

  ngOnInit(): void {
    this.getUserCnt();
    this.getWindowCnt();
    this.getMealCnt();
    this.getOrderCnt();
    this.getRatingCnt();
  }

}
