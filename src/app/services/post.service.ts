import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService{
	public url: string;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	pruebas(){
		return "Hola desde el servicio de entradas";
	}

	create(token, post): Observable<any>{
		let json = JSON.stringify(post);
		let params = "json="+encodeURIComponent(json);

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization',token);

		return this._http.post(this.url + 'post', params, {headers: headers});
	}

	getPostsLanguage(language:string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'post-lang' + '/' + language, {headers:headers});
	}

	getPost(id,token,language:string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization',token);
		return this._http.get(this.url + 'post-language/' + id + '/' + language, {headers:headers});	
	}

	update(token, post, postId:number, postLanguageId:number):Observable<any>{
		let json = JSON.stringify(post);
		let params_sin_encode = "json="+(json);
		let params = "json="+encodeURIComponent(json);
		//console.log(params_sin_encode);
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.put(this.url + 'post/update/' + postLanguageId + "/" + postId, params, {headers: headers});
	}

	delete(token, id){
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.delete(this.url + 'post/' + id, {headers: headers});	
	}

	registerImage(token, imageToRegister):Observable<any>{
		let json = JSON.stringify(imageToRegister);
		let params = "json="+encodeURIComponent(json);
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.post(this.url + 'image/save', params, {headers: headers});
	}

	getImagesByPost(token, postId):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.get(this.url + 'images-by-post/'+postId, {headers: headers});
	}

	setMainImage(token,imageId){
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.get(this.url + 'image/'+imageId+'/edit', {headers: headers});
	}

	changeImageDescription(token,imageId,image){
		let json = JSON.stringify(image);
		let params = "json="+encodeURIComponent(json);

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.put(this.url + 'image/'+imageId, params , {headers: headers});
	}

	deleteImage(token,imageId){
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		return this._http.delete(this.url + 'image/'+imageId, {headers: headers});
	}

	getPostsAdmin(token,language):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		console.log('posts-admin');
		return this._http.get(this.url + 'list-post-admin' + '/' + language , {headers:headers});
	}

	
	publishPost(token,booleanInBoolean,postId):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);
		let booleanValueString = booleanInBoolean ? 'true':'false';
		
		return this._http.get(this.url + 'post/publish/'+ postId + '/' + booleanValueString, {headers:headers});
	}
	
}