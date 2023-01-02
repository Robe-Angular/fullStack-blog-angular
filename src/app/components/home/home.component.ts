import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { I18nServiceService } from 'src/app/services/i18n-service.service';
import { global } from  '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[PostService, UserService]
})
export class HomeComponent implements OnInit {
	public page_title: string;
	public url;
	public posts: Array<Post>;
	public identity;
	public token;

	constructor(
		private _postService: PostService,
		private _userService: UserService,
		private _i18nService: I18nServiceService
	) { 
		this.page_title = 'inicio';
		this.url = global.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken(); 
	}

	ngOnInit(): void {
		
		this.getPosts();
	}

	getPosts(){

		let language_locale = this._i18nService.getlocale();
		this._postService.getPostsLanguage(language_locale).subscribe(
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
				this.getPosts();
			},error =>{

			}
		);
	}
}
