import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {Order} from "../interfaces/order";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  order: Order = {oID: '', uID: '', wID: '', mID: '', oStatus: 0, oDatetime: new Date(), fDatetime: new Date()};
  radioValue = '';
  type = this.userService.loginType;
  statusStr = '';

  getOrder(): void{ //获取需要编辑的订单信息
    const oID = this.route.snapshot.paramMap.get("oID") as string;
    this.userService.getOrderByID(oID).subscribe(
      res => {
        this.order = res;
        this.radioValue = res.oStatus.toString();
      }
    );
  }

  saveConfirm(): void { //确认保存对话框
    if(this.order.oStatus == null){ //确认不存在空值
      this.message.create('warning', '存在非法修改字段!');
      return;
    }
    this.order.oStatus = <number><unknown>this.radioValue;
    if (this.order.oStatus == 0) this.statusStr = "待接单";
    else if (this.order.oStatus == 1) this.statusStr = "正在备餐";
    else if (this.order.oStatus == 2) this.statusStr = "待取餐";
    else if (this.order.oStatus == 3) this.statusStr = "已完成";
    else this.statusStr = "已取消";
    this.modal.confirm({
      nzTitle: '<i>确认修改订单状态?</i>',
      nzContent: `<b>ID:${this.order.oID}; 状态:${this.statusStr};</b>`,
      nzOnOk: () => this.save()
    });
  }

  save(): void { //保存
    this.userService.updateOrder(this.order).subscribe(
      () =>this.goBack()
    );
    this.message.info('修改成功!');
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getOrder();
  }

}
