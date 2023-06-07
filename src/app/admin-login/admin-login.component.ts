import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Administrator} from "../interfaces/administrator";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  validateForm!: FormGroup;
  loginMessage?: Administrator; //向服务传递账号密码
  loginResult?: string; //从服务获取登录结果

  submitForm(): void {
    this.loginMessage = {
      aID: this.validateForm.value.aID,
      aName : '',
      aPassword: this.validateForm.value.aPassword
    };
    this.userService.adminLogin(this.loginMessage).subscribe(
      res => {
        this.loginResult = res;
        if(this.loginResult == '1'){ //登录成功
          this.userService.loginID += this.loginMessage?.aID; //向服务同步登录状态
          this.userService.loginType += 'admin';
          this.userService.getAdminByID(this.userService.loginID).subscribe( //同步姓名
            res => {
              this.userService.loginName = res.aName;
              this.notification.create('success', '登录成功!', `欢迎, ${res.aName} !`);
            }
          );
          this.router.navigateByUrl("users"); //导航到用户管理页面
        }
        else //登录失败
          this.message.create('error', '账号或密码错误!');
      }
    );
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value); //控制台显示登录表单提交
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  forgetPassword(): void {
    this.notification.info('请联系数据库管理员进行账号重置!','');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      aID: [null, [Validators.required]],
      aPassword: [null, [Validators.required]],
      remember: [false],
    });
  }

}
