import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oStatus'
})
export class OStatusPipe implements PipeTransform {

  transform(oStatus: number): string {
    if (oStatus == 0) return "待接单";
    else if (oStatus == 1) return "正在备餐";
    else if (oStatus == 2) return "待取餐";
    else if (oStatus == 3) return "已完成";
    return "已取消";
  }

}
