import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {NzButtonSize} from "ng-zorro-antd/button";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private router: Router
  ) { }

  users: User[] = []; //用户信息列表
  searchValue = ''; //搜索内容
  visible = false; //搜索框是否可见
  usersDisplay?: User[]; //搜索功能显示列表
  nameEditID: string | null = null; //根据ID改变姓名修改框的状态
  type = this.userService.loginType; //页面访问权限
  user?: User;
  size: NzButtonSize = 'small';

  getUsers():void{ //获取用户信息
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
        this.usersDisplay = res;
        this.message.create('success', '获取用户信息列表!');
      }
    );
  }

  reset(): void { //重置搜索内容
    this.searchValue = '';
    this.search();
  }

  search(): void { //姓名搜索
    this.visible = false;
    this.usersDisplay = this.users.filter((item: User) => item.uName.indexOf(this.searchValue) !== -1);
    if(this.searchValue != '')
      this.message.create('success', `已展示姓名包含 ${this.searchValue} 的用户信息!`);
    else
      this.message.create('success', '重置用户列表！');
  }

  startEditName(name: string): void {
    this.nameEditID = name;
  }

  stopEditName(id: string, name: string, sex: number, birthday: Date, password: string): void {
    this.nameEditID = null;
    this.user = {
      uID: id, uName: name, uSex: sex, uBirthday: new Date(birthday), uPassword: password
    }
    this.userService.updateUser(this.user).subscribe();
    this.notification.create('success', '修改成功!', `ID为 ${id} 的用户姓名修改为 ${name} !`);
  }

  deleteConfirm(id: string, name: string): void { //确认删除对话框
    this.modal.confirm({
      nzTitle: '<i>确认删除用户信息?</i>',
      nzContent: `<b>ID:${id}; 姓名:${name} ;</b>`,
      nzOnOk: () => {
        this.deleteRow(id);
      }
    });
  }

  deleteRow(id: string): void { //删除用户信息
    this.usersDisplay = this.users.filter(d => d.uID !== id);
    this.userService.deleteUser(id).subscribe();
    this.notification.create('success', '删除成功!', `成功删除ID为${id}的用户信息!`);
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
