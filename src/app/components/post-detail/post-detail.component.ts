import { Component, OnInit, AfterViewChecked } from '@angular/core';

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
	public postLanguage: any;
	public identity;
	public url;
	public token:string;
	public idSelected:number;
	public post:any;
	public postCategoryName: string;
	public otherPostsLanguage:Array<any>;
	

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
		this.idSelected = 0;
		this.postCategoryName = "";
		this.otherPostsLanguage = [];
	}

	ngAfterViewChecked(){
		FB.XFBML.parse(document.getElementById('post-container'));
	}
	
	ngOnInit(): void {		
		this._route.params.subscribe(params => {
			let id = +params['id'];
			this.getPost(id);
		});
	}

	getPost(id:number){
		//Sacar el id del post de la URL
		
			
			//Petición Ajax para sacar los datos
			this._postService.getPost(id,this.token).subscribe(
				response => {
					if(response.status = 'success'){
						console.log(response)
						this.postLanguage = response.post;					

						this.postCategoryName = response.post.post.category.categories_language[0].name_language;
						this.idSelected = this.postLanguage.id;
						//FB.XFBML.parse(document.getElementById('post-container'));
						this._postService.getpostsLanguageOnPost(this.postLanguage.post.id).subscribe(
							response => {
								this.otherPostsLanguage = response.posts_language;

							},error => {
								console.log(error);
							}
						);
					}else{
						this._router.navigate(['inicio']);
					}
				},
				error => {
					console.log(error);
					this._router.navigate(['inicio']);
				}	
			)
		
	}

	changeLang(id){
		
		this.getPost(id);
	}
}
