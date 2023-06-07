import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wstatus'
})
export class WstatusPipe implements PipeTransform {

  transform(status: number): string {
    if (status == 1) return "正在接单"
    return "已打烊"
  }

}
