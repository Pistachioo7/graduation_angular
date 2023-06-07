import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {User} from "../interfaces/user";
import {Meal} from "../interfaces/meal";

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  meal: Meal = {mID: '', mName: '', wID: '', mType: '', mainIngredient: '', price: 0, maxSupply: 0, remainSupply: 0};
  id = this.userService.loginID;
  type = this.userService.loginType;

  getMeal(): void{ //获取需要编辑的餐品信息
    const mID = this.route.snapshot.paramMap.get("mID") as string;
    this.userService.getMealByID(mID).subscribe(
      res => {this.meal = res;}
    );
  }

  saveConfirm(): void { //确认保存对话框
    if(this.meal.mName == '' || this.meal.mType == '' || this.meal.mainIngredient == '' ||
      this.meal.price == null || this.meal.maxSupply == null){ //确认不存在空值
      this.message.create('warning', '存在非法修改字段!');
      return;
    }
    this.modal.confirm({
      nzTitle: '<i>确认修改餐品信息?</i>',
      nzContent: `<b>餐品ID:${this.meal.mID}; 餐品名称:${this.meal.mName}; 窗口ID:${this.meal.wID}; 餐品类型:${this.meal.mType};
主要成分:${this.meal.mainIngredient}; 价格:${this.meal.price}; 最大供应量:${this.meal.maxSupply}; 剩余供应量:${this.meal.remainSupply}</b>`,
      nzOnOk: () => this.save()
    });
  }

  save(): void { //保存
    this.userService.updateMeal(this.meal).subscribe(
      () =>this.goBack()
    );
    this.message.info('修改成功!');
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getMeal();
  }

}
