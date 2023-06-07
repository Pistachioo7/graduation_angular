import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) { }

  id?: string; //从服务获取，未登录为空串，登录为ID
  name?: string //从服务获取，未登录为空串，登录为名称
  type?: string //从服务获取，未登录或用户登录为空串，窗口登录为window，管理员登录为admin

  exit(): void{ //退出登录
    this.userService.loginID = '';
    this.userService.loginType = '';
    this.message.info('退出登录!');
    window.location.reload();
  }

  ngOnInit(): void {
    setInterval(() =>{ //隔一秒检查一次登录状态
      this.id = this.userService.loginID;
      this.name = this.userService.loginName;
      this.type = this.userService.loginType;
    }, 1000)
  }

}
