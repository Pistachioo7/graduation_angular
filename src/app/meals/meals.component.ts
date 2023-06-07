import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {NzButtonSize} from "ng-zorro-antd/button";
import {Meal} from "../interfaces/meal";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      mID: ['', [Validators.required], [this.mealIDAsyncValidator]],
      mName: ['', [Validators.required]],
      mType: ['', [Validators.required]],
      mainIngredient: ['', [Validators.required]],
      price: ['', [Validators.required]],
      maxSupply: ['', [Validators.required]]
    });
  }

  meals: Meal[] = []; //餐品信息列表
  searchValue = ''; //搜索内容
  visible = false; //搜索框是否可见
  mealsDisplay?: Meal[]; //搜索功能显示列表
  type = this.userService.loginType; //页面访问权限
  id = this.userService.loginID;
  meal?: Meal;
  size: NzButtonSize = 'small';

  validateForm: FormGroup; //表单
  newMeal ?: Meal; //向服务传递餐品对象
  qMeal?: Meal; //用以查找ID是否重复，输入时校验

  submitForm(): void {
    let mID = this.validateForm.value.mID.trim(); //去空格
    if(!mID){ //ID为全空格
      this.message.create('warning', '餐品ID不能为空格!');
      return;
    }
    this.newMeal  = { //构建餐品对象
      mID : this.validateForm.value.mID,
      mName : this.validateForm.value.mName,
      wID : this.id,
      mType: this.validateForm.value.mType,
      mainIngredient: this.validateForm.value.mainIngredient,
      price: this.validateForm.value.price,
      maxSupply: this.validateForm.value.maxSupply,
      remainSupply: this.validateForm.value.maxSupply
    };
    this.userService.addMeal(this.newMeal).subscribe(
      res => console.log(res) //控制台返回添加信息
    );
    this.message.create('success', '添加成功!');
    console.log('submit', this.validateForm.value); //控制台显示表单提交
    this.mealsDisplay?.push({mID: this.newMeal.mID, mName: this.newMeal.mName, wID: this.newMeal.wID,
      mType: this.newMeal.mType, mainIngredient: this.newMeal.mainIngredient, price: this.newMeal.price,
    maxSupply: this.newMeal.maxSupply, remainSupply: this.newMeal.maxSupply}) //更新显示
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  mealIDAsyncValidator = (control: FormControl) => //餐品ID重复性校验
    new Observable((observer: Observer<ValidationErrors | null>) => {
      let val = control.value.replace(/\s+/g, '') //输入的ID去掉所有空格赋给 val
      this.userService.getMealByID(val).subscribe(
        res => this.qMeal = res
      );
      setTimeout(() => {
        if (this.qMeal?.mID === val) { //查找到相同ID的餐品
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else { //无重复ID，通过校验
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  addConfirm(): void { //确认添加对话框
    this.modal.confirm({
      nzTitle: '<i>请确认餐品信息!</i>',
      nzContent: `<b>餐品ID:${this.validateForm.value.mID} 餐品名称:${this.validateForm.value.mName}
餐品类型:${this.validateForm.value.mType} 主要成分:${this.validateForm.value.mainIngredient} 价格:${this.validateForm.value.price}
最大供应量:${this.validateForm.value.maxSupply}</b>`,
      nzOnOk: () => this.submitForm()
    });
  }

  getWindowMeals(): void { //获取餐品信息
    this.userService.getWindowMeals(this.userService.loginID).subscribe(
      res => {
        this.meals = res;
        this.mealsDisplay = res;
        this.message.create('success', '获取餐品信息列表!');
      }
    );
  }

  reset(): void { //重置搜索内容
    this.searchValue = '';
    this.search();
  }

  search(): void { //名称搜索
    this.visible = false;
    this.mealsDisplay = this.meals.filter((item: Meal) => item.mName.indexOf(this.searchValue) !== -1);
    if(this.searchValue != '')
      this.message.create('success', `已展示名称包含 ${this.searchValue} 的餐品信息!`);
    else
      this.message.create('success', '重置餐品列表！');
  }

  deleteConfirm(id: string, name: string): void { //确认删除对话框
    this.modal.confirm({
      nzTitle: '<i>确认删除餐品信息?</i>',
      nzContent: `<b>ID:${id}; 名称:${name} ;</b>`,
      nzOnOk: () => {
        this.deleteRow(id);
      }
    });
  }

  deleteRow(id: string): void { //删除餐品信息
    this.mealsDisplay = this.meals.filter(d => d.mID !== id);
    this.userService.deleteMeal(id).subscribe();
    this.notification.create('success', '删除成功!', `成功删除ID为${id}的餐品信息!`);
  }

  ngOnInit(): void {
    if (this.type == "window") this.getWindowMeals();
  }

}
