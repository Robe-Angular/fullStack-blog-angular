import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(value: string, maxLength:number): string {
    if(value.length < maxLength){
      return value;
    }
    let newValue = value.slice(0,maxLength - 1);
    return `${newValue}...`;
  }

}
