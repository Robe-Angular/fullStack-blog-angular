import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class I18nServiceService {

  constructor() { }

  getlocale(){
    return $localize.locale;
  }
}
