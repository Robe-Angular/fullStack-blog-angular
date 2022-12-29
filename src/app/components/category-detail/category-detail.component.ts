import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { I18nServiceService } from 'src/app/services/i18n-service.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers:[CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {
	public page_title: string;
	public category: Category;
	public posts: any;
	public postsLoaded: Boolean;
	public url: string;
	public identity;
	public token;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _categoryService:  CategoryService,
		private _userService: UserService,
		private _postService: PostService,
		private _i18nService: I18nServiceService
	) { 
		this.url = global.url;
		this.posts = [];
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken(); 
		this.postsLoaded = false;
	}

	ngOnInit(): void {
		this.getPostsByCategory();
	}

	getPostsByCategory(){
		this._route.params.subscribe(params=>{
			let id = +params['id'];
			this._categoryService.getCategory(id).subscribe(
				response => {
					if(response.status == 'success'){
						console.log(response);
						this.category = response.category;
						let languageParam = this._i18nService.getlocale();
						this._categoryService.getPosts(id,languageParam).subscribe(
							response => {
								if(response.status == 'success'){

									this.posts = response.posts;
									this.postsLoaded = true;
								}else{
									this._router.navigate(['/inicio']);
								}
								
							},
							error => {
								console.log(error)
							}
						);
					}else{
						this._router.navigate(['/inicio']);
					}
				},
				error => {
					console.log(error)
				}
			);
		});
	}
	deletePost(id){
		this._postService.delete(this.token, id).subscribe(
			response => {
				this.getPostsByCategory();
			},error =>{

			}
		);
	}
}
