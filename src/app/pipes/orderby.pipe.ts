
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderbyPipe',
  pure: false
})
export class OrderbyPipe implements PipeTransform {
	// ------------------works for sorting the array----------------------
  transform(array: Array<string>, args: string): Array<string> {
  if(!array || array === undefined || array.length === 0) return null;
    array.sort((a: any, b: any) => {
      if (a.orderNo < b.orderNo) {
        return -1;
      } else if (a.orderNo > b.orderNo) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
