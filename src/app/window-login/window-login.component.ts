import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Window} from "../interfaces/window";

@Component({
  selector: 'app-window-login',
  templateUrl: './window-login.component.html',
  styleUrls: ['./window-login.component.css']
})
export class WindowLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  validateForm!: FormGroup;
  loginMessage?: Window; //向服务传递账号密码
  loginResult?: string; //从服务获取登录结果

  submitForm(): void {
    this.loginMessage = {
      wID: this.validateForm.value.wID,
      wName : '',
      mealAmount : 0,
      wStatus : 0,
      wPassword: this.validateForm.value.wPassword
    };
    this.userService.windowLogin(this.loginMessage).subscribe(
      res => {
        this.loginResult = res;
        if(this.loginResult == '1'){ //登录成功
          this.userService.loginID += this.loginMessage?.wID; //向服务同步登录状态
          this.userService.loginType += 'window';
          this.userService.getWindowByID(this.userService.loginID).subscribe( //同步姓名
            res => {
              this.userService.loginName = res.wName;
              this.notification.create('success', '登录成功!', `欢迎, ${res.wName} !`);
            }
          );
          this.router.navigateByUrl("receive"); //导航到接单页面
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
    this.notification.info('请联系管理员进行账号重置!', '管理员将在24小时内核实信息并予以答复。');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      wID: [null, [Validators.required]],
      wPassword: [null, [Validators.required]],
      remember: [false],
    });
  }

}
