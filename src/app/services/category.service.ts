import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService{
	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, category):Observable<any>{
		let json = JSON.stringify(category);
		let params = "json="+json;

		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.post(this.url + 'category', params, {headers: headers});
	}

	
	getCategories():Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'category', {headers: headers});
	}

	getCategoriesLanguage(locale:string):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'getCategoriesLanguage/' + locale, {headers: headers});
	}

	getCategory(id):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'category/' + id, {headers: headers});
	}

	getCategoryDetail(id):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'getCategoriesLanguageFromOne/' + id, {headers: headers});
	}

	submitCategoryLanguage(token,categoryLanguage,id):Observable<any>{
		let json = JSON.stringify(categoryLanguage);
		let params = "json="+json;

		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.put(this.url + 'categoryLanguage/'+id, params, {headers: headers});
	}

	
	deleteCategoryLanguage(token,id):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.delete(this.url + 'categoryLanguage/'+id, {headers: headers});
	}

	deleteCategory(id,token):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.delete(this.url + 'category/' + id, {headers: headers});
	}


	getPosts(id):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'post/category/' + id, {headers: headers});
	}
}