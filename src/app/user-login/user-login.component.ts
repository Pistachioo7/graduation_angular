import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  validateForm!: FormGroup;
  loginMessage?: User; //向服务传递账号密码
  loginResult?: string; //从服务获取登录结果

  submitForm(): void {
    this.loginMessage = {
      uID: this.validateForm.value.uID,
      uName : '',
      uBirthday : new Date(),
      uSex : 1,
      uPassword: this.validateForm.value.uPassword
    };
    this.userService.login(this.loginMessage).subscribe(
      res => {
        this.loginResult = res;
        if(this.loginResult == '1'){ //登录成功
          this.userService.loginID += this.loginMessage?.uID; //向服务同步登录状态
          this.userService.getUserByID(this.userService.loginID).subscribe( //同步姓名
            res => {
              this.userService.loginName = res.uName;
              this.notification.create('success', '登录成功!', `欢迎, ${res.uName} !`);
            }
          );
          this.router.navigateByUrl(""); //导航到首页
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
    this.notification.info('请联系管理员进行账号重置!', '请将您的校园卡及身份证拍照发至邮箱 20190786@stu.neu.edu.cn ,' +
      '管理员将在24小时内核实信息并予以答复。');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      uID: [null, [Validators.required]],
      uPassword: [null, [Validators.required]],
      remember: [false],
    });
  }

}
