import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {Window} from "../interfaces/window";
import {NzButtonSize} from "ng-zorro-antd/button";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Meal} from "../interfaces/meal";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-windows',
  templateUrl: './windows.component.html',
  styleUrls: ['./windows.component.css']
})
export class WindowsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      wID: ['', [Validators.required], [this.windowIDAsyncValidator]],
      wName: ['', [Validators.required]],
      wPassword: ['', [Validators.required]]
    });
  }

  windows: Window[] = []; //用户信息列表
  searchValue = ''; //搜索内容
  visible = false; //搜索框是否可见
  windowsDisplay?: Window[]; //搜索功能显示列表
  nameEditID: string | null = null; //根据ID改变姓名修改框的状态
  type = this.userService.loginType; //页面访问权限
  window?: Window;
  size: NzButtonSize = 'small';

  validateForm: FormGroup; //表单
  newWindow ?: Window; //向服务传递窗口对象
  qWindow?: Window; //用以查找ID是否重复，输入时校验

  submitForm(): void {
    let wID = this.validateForm.value.wID.trim(); //去空格
    if(!wID){ //ID为全空格
      this.message.create('warning', '窗口ID不能为空格!');
      return;
    }
    this.newWindow  = { //构建窗口对象
      wID : this.validateForm.value.wID,
      wName : this.validateForm.value.wName,
      mealAmount : 0,
      wStatus: 0,
      wPassword: this.validateForm.value.wPassword
    };
    this.userService.addWindow(this.newWindow).subscribe(
      res => console.log(res) //控制台返回添加信息
    );
    this.message.create('success', '添加成功!');
    console.log('submit', this.validateForm.value); //控制台显示表单提交
    this.windowsDisplay?.push({wID: this.newWindow.wID, wName: this.newWindow.wName, mealAmount: this.newWindow.mealAmount,
      wStatus: this.newWindow.wStatus, wPassword: this.newWindow.wPassword}) //更新显示
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  windowIDAsyncValidator = (control: FormControl) => //窗口ID重复性校验
    new Observable((observer: Observer<ValidationErrors | null>) => {
      let val = control.value.replace(/\s+/g, '') //输入的ID去掉所有空格赋给 val
      this.userService.getWindowByID(val).subscribe(
        res => this.qWindow = res
      );
      setTimeout(() => {
        if (this.qWindow?.wID === val) { //查找到相同ID的窗口
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
      nzTitle: '<i>请确认窗口信息!</i>',
      nzContent: `<b>窗口ID:${this.validateForm.value.wID} 窗口名称:${this.validateForm.value.wName}
密码:${this.validateForm.value.wPassword}</b>`,
      nzOnOk: () => this.submitForm()
    });
  }

  getWindows():void{ //获取窗口信息
    this.userService.getWindows().subscribe(
      res => {
        this.windows = res;
        this.windowsDisplay = res;
        this.message.create('success', '获取窗口信息列表!');
      }
    );
  }

  reset(): void { //重置搜索内容
    this.searchValue = '';
    this.search();
  }

  search(): void { //名称搜索
    this.visible = false;
    this.windowsDisplay = this.windows.filter((item: Window) => item.wName.indexOf(this.searchValue) !== -1);
    if(this.searchValue != '')
      this.message.create('success', `已展示名称包含 ${this.searchValue} 的窗口信息!`);
    else
      this.message.create('success', '重置窗口列表！');
  }

  startEditName(name: string): void {
    this.nameEditID = name;
  }

  stopEditName(id: string, name: string, mealAmount: number, status: number, password: string): void {
    this.nameEditID = null;
    this.window = {
      wID: id, wName: name, mealAmount: mealAmount, wStatus: status, wPassword: password
    }
    this.userService.updateWindow(this.window).subscribe();
    this.notification.create('success', '修改成功!', `ID为 ${id} 的窗口名称修改为 ${name} !`);
  }

  deleteConfirm(id: string, name: string): void { //确认删除对话框
    this.modal.confirm({
      nzTitle: '<i>确认删除窗口信息?</i>',
      nzContent: `<b>ID:${id}; 名称:${name} ;</b>`,
      nzOnOk: () => {
        this.deleteRow(id);
      }
    });
  }

  deleteRow(id: string): void { //删除窗口信息
    this.windowsDisplay = this.windows.filter(d => d.wID !== id);
    this.userService.deleteWindow(id).subscribe();
    this.notification.create('success', '删除成功!', `成功删除ID为${id}的窗口信息!`);
  }

  ngOnInit(): void {
    this.getWindows();
  }

}
