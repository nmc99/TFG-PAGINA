import { Pipe, PipeTransform } from '@angular/core';
import { Result } from 'src/app/models/result';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(value: Array<Result>, ...args: unknown[]): any {
    value.sort((a, b) => {
      let x = new Date(a.gameDate);
      let y = new Date(b.gameDate);
      if (x<y){
        return -1;
      } else{
        return 1;
      }
      return 0;
    })
  }

}
