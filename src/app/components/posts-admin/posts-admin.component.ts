import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from  '../../services/global';
import { I18nSelectPipe } from '@angular/common';
import { I18nServiceService } from 'src/app/services/i18n-service.service';



@Component({
  selector: 'app-posts-admin',
  templateUrl: './posts-admin.component.html',
  styleUrls: ['./posts-admin.component.css'],
  providers:[PostService, UserService]
})
export class PostsAdminComponent implements OnInit {
  public url;
	public posts: Array<Post>;
	public identity;
	public token;
	public locale_language:string;
	public langs:string[];
	public languageParam:string;

  constructor(
		private _postService: PostService,
		private _userService: UserService,
		private _i18nService: I18nServiceService
	) { 
		
		this.url = global.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken(); 
		this.locale_language = "";
		this.langs = global.langs;
		this.languageParam = this._i18nService.getlocale();
  }

  ngOnInit(): void {

	this.locale_language = this._i18nService.getlocale();
	this.getPosts(this.locale_language);

  }

  getPosts(language:string){
		this._postService.getPostsAdmin(this.token,language).subscribe(
			response => {
				if(response.status == 'success'){
					this.posts = response.posts;

					console.log(this.posts);
				}
			},
			error =>{
				console.log(error);
			}

		)
	}

	deletePost(id){
		this._postService.delete(this.token, id).subscribe(
			response => {
				this.getPosts(this.locale_language);
			},error =>{

			}
		);
	}

	publishPost($event){
		let publish =  $event.publish;
		let postId = $event.id;
		console.log($event);
		this._postService.publishPost(this.token,publish,postId).subscribe(
			response => {
				this.getPosts(this.locale_language);
			},error => {
				console.log(error);
			}
		)
	}

	changeLang(lang:string){
		this.languageParam = lang;
		this.getPosts(this.languageParam);
	}

}
