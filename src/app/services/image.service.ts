import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public url:string;
  constructor(
    private _http:HttpClient
  ) { 
    this.url = global.url;
  }
  
  getImagesLanguageOnImage(imageId:number,language:string,token:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this._http.get(this.url + 'images-language-on-image/' + imageId + '/' + language, {headers:headers});
  }

  deleteImageLanguage(imageLanguageId:number,token){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this._http.delete(this.url + 'delete-image-language/' + imageLanguageId, {headers:headers});
  }
}
