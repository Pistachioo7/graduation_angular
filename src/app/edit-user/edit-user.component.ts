import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {User} from "../interfaces/user";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  user: User = {uID: '', uName: '', uSex: 1, uBirthday: new Date(), uPassword: ''};
  radioValue = '';
  id = this.userService.loginID;
  type = this.userService.loginType;

  getUser(): void{ //获取需要编辑的学生信息
    const uID = this.route.snapshot.paramMap.get("uID") as string;
    this.userService.getUserByID(uID).subscribe(
      res => {this.user = res;
        this.radioValue = res.uSex? '1' : '0'}
    );
  }

  saveConfirm(): void { //确认保存对话框
    if(this.user.uName == '' || this.user.uSex == null || this.user.uBirthday == null ||
      this.user.uPassword == ''){ //确认不存在空值
      this.message.create('warning', '存在非法修改字段!');
      return;
    }
    if(this.radioValue == '1')
      this.user.uSex = 1;
    else
      this.user.uSex = 0;
    this.modal.confirm({
      nzTitle: '<i>确认修改用户信息?</i>',
      nzContent: `<b>ID:${this.user.uID}; 姓名:${this.user.uName}; 性别:${this.user.uSex? '男':'女'};
生日:${this.user.uBirthday}; 密码:${this.user.uPassword}</b>`,
      nzOnOk: () => this.save()
    });
  }

  save(): void { //保存
    this.user.uBirthday = new Date(this.user.uBirthday);
    this.userService.updateUser(this.user).subscribe(
      () =>this.goBack()
    );
    this.message.info('修改成功!');
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getUser();
  }

}
