import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      uID: ['', [Validators.required], [this.userIDAsyncValidator]],
      uName: ['', [Validators.required]],
      uPassword: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      uSex: ['', [Validators.required]],
      uBirthday: ['', [Validators.required]]
    });
  }

  validateForm: FormGroup;
  newUser ?: User; //向服务传递用户对象
  qUser?: User; //用以查找uID是否重复，输入时校验

  submitForm(): void {
    let uID = this.validateForm.value.uID.trim();
    if(!uID){ //uID为全空格
      this.message.create('warning', 'ID不能为空格!');
      return;
    }
    this.newUser  = { //构建用户对象
      uID : this.validateForm.value.uID,
      uName : this.validateForm.value.uName,
      uBirthday : new Date(this.validateForm.value.uBirthday),
      uSex : this.validateForm.value.uSex,
      uPassword: this.validateForm.value.uPassword
    };
    this.userService.addUser(this.newUser).subscribe(
      res => console.log(res) //控制台返回注册信息
    );
    this.message.create('success', '注册成功!');
    console.log('submit', this.validateForm.value); //控制台显示表单提交
    this.router.navigateByUrl('/register-success');
  }

  resetForm(e: MouseEvent): void { //重置表单
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls['confirm'].updateValueAndValidity());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userIDAsyncValidator = (control: FormControl) => //uID重复性校验
    new Observable((observer: Observer<ValidationErrors | null>) => {
      let val = control.value.replace(/\s+/g, '') //输入的uID去掉所有空格赋给 val
      this.userService.getUserByID(val).subscribe(
        res => this.qUser = res
      );
      setTimeout(() => {
        if (this.qUser?.uID === val) { //查找到相同uID的用户
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else { //无重复uID，通过校验
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => { //密码一致性校验
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['uPassword'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  registerConfirm(): void { //确认注册对话框
    let sex = this.validateForm.value.uSex? '男' : '女';
    let birthday = this.validateForm.value.uBirthday.toString().substring(0, 15);
    this.modal.confirm({
      nzTitle: '<i>请确认注册信息!</i>',
      nzContent: `<b>${this.validateForm.value.uID} ${this.validateForm.value.uName} ${birthday} ${sex}</b>`,
      nzOnOk: () => this.submitForm()
    });
  }

  ngOnInit(): void {
  }

}
