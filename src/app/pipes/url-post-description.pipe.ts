import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPostDescription'
})
export class UrlPostDescriptionPipe implements PipeTransform {

  
    transform(value: string): string {
      let newValue = value.replace(/\s+/g, '-');
      
      return newValue;
    }
  

}
