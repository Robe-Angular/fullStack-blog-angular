import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Post } from '../../models/post';
import { PostLanguage } from 'src/app/models/post_language';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { I18nServiceService } from 'src/app/services/i18n-service.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService,UserService]
})
export class PostDetailComponent implements OnInit,AfterViewChecked {
	public postLanguage: PostLanguage;
	public identity;
	public url;
	public token:string;
	public languageParam:string;
	public post:Post;
	

	constructor(
		private _postService: PostService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _i18nService: I18nServiceService

	){ 
		this.identity = this._userService.getIdentity();
		this.url = global.url;
		this.token = this._userService.getToken();
		this.languageParam = this._i18nService.getlocale();
	}

	ngAfterViewChecked(){
		window.FB.XFBML.parse();
	}
	
	ngOnInit(): void {		
		this.getPost(this.languageParam);
		
	}

	getPost(language:string){
		//Sacar el id del post de la URL
		this._route.params.subscribe(params => {
			let id = +params['id'];
			//Petición Ajax para sacar los datos
			this._postService.getPost(id,this.token,language).subscribe(
				response => {
					if(response.status = 'success'){
						this.postLanguage = response.post;
						this.postLanguage.content_language = response.post.content_language;
						FB.XFBML.parse(document.getElementById('post-container'));
						console.log(this.postLanguage);
					}else{
						this._router.navigate(['inicio']);
					}
				},
				error => {
					console.log(error);
					this._router.navigate(['inicio']);
				}	
			)
		});
	}
}
