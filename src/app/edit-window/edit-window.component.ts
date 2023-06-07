import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {Window} from "../interfaces/window";
import {FormGroup} from "@angular/forms";
import {Meal} from "../interfaces/meal";

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css']
})
export class EditWindowComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  window: Window = {wID: '', wName: '', mealAmount: 1, wStatus: 1, wPassword: ''};
  radioValue = '';
  id = this.userService.loginID;
  type = this.userService.loginType;

  getWindow(): void{ //获取需要编辑的窗口信息
    const wID = this.route.snapshot.paramMap.get("wID") as string;
    this.userService.getWindowByID(wID).subscribe(
      res => {this.window = res;
        this.radioValue = res.wStatus? '1' : '0'}
    );
  }

  saveConfirm(): void { //确认保存对话框
    if(this.window.wName == '' || this.window.mealAmount == null || this.window.wStatus == null ||
      this.window.wPassword == ''){ //确认不存在空值
      this.message.create('warning', '存在非法修改字段!');
      return;
    }
    if(this.radioValue == '1')
      this.window.wStatus = 1;
    else
      this.window.wStatus = 0;
    this.modal.confirm({
      nzTitle: '<i>确认修改窗口信息?</i>',
      nzContent: `<b>ID:${this.window.wID}; 名称:${this.window.wName}; 餐品数量:${this.window.mealAmount};
餐品数量:${this.window.wStatus? '正在接单':'已打烊'}; 密码:${this.window.wPassword}</b>`,
      nzOnOk: () => this.save()
    });
  }

  save(): void { //保存
    this.userService.updateWindow(this.window).subscribe(
      () =>this.goBack()
    );
    this.message.info('修改成功!');
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getWindow();
  }

}
