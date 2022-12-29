import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class I18nServiceService {

  constructor() { }

  getlocale(){
    let locale = $localize.locale;
    let languageParam = locale == undefined ? window.navigator.language: locale;
    return languageParam;
  }
}
