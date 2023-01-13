import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { PostLanguage } from 'src/app/models/post_language';
import { global } from '../../services/global';
import { Editor } from 'ngx-editor';
import { Toolbar } from 'ngx-editor/public_api';
import { SafeHtml } from '@angular/platform-browser';


import { I18nServiceService } from 'src/app/services/i18n-service.service';

interface ItoSubmitImageLanguageName{
	description_language: string;
	language_symbol:string;
}

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['../post-new/post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit, OnDestroy {
	public page_title: string;
	public identity;
	public token;
	public post: Post;
	public postLoaded: boolean;
	public categories;
	public resetVar:string;
	public status;
	public isEdit: boolean;
	public url: string;
	public editor: Editor;
	public toolbar: Toolbar;
	public securityTrust: SafeHtml;
	public imagesOnPost:Array<any>;
	public mainImage:string;
	public htmlDoc:string;
	public htmlLocal:string;
	public langs: string[];
	public languageParam:string;
	public postLanguage: PostLanguage;
	public activatedImage: string;

	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.png,.gif,.jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+"post/upload/",
	      method:"POST",
	      headers: {
	     "Authorization" : this._userService.getToken()
	      }
	    },
	    theme: "attachPin",
	    hideProgressBar:false,
	    hideResetBtn: true,
	    hideSelectBtn: false,
	    fileNameIndex: true,
	    attachPinText: 'Sube una imagen'
	};

	constructor(
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UserService,
		private _categoryService: CategoryService,
		private _postService: PostService,
		private _i18nService: I18nServiceService
	) {
		this.page_title = 'Editar una entrada';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.isEdit = true;
		this.url = global.url;
		this.editor = new Editor();
		this.toolbar = [			
			// default value
			['bold', 'italic'],
			['underline', 'strike'],
			['code', 'blockquote'],
			['ordered_list', 'bullet_list'],
			[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
			['link', 'image'],
			['text_color', 'background_color'],
			['align_left', 'align_center', 'align_right', 'align_justify'],
			['horizontal_rule', 'format_clear']			
		];
		this.imagesOnPost = [];
		this.postLoaded = false;		
		this.htmlDoc = '';
		this.htmlLocal = '';
		this.langs = global.langs;
		this.languageParam = this._i18nService.getlocale();
		this.activatedImage = "";
	}

	ngOnInit(): void {
		this.getCategories();
		this.post = new Post(1, 1, '',  null);
		this.postLanguage = new PostLanguage(1,"","","",null,null);
		this.getPost(true,this.languageParam);

	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}

	onSubmit(form){
		//console.log(this.htmlDoc);
		//this.post.content = this.htmlDoc;
		this.postLanguage.content_language = this.htmlDoc;
		let submitData = {
			title_language: this.postLanguage.title_language,
			content_language: this.postLanguage.content_language,
			category_id: this.post.category_id
		}

		this._postService.update(this.token, submitData, this.post.id,this.postLanguage.id).subscribe(
			response =>{
				if(response.status == 'success'){
					this.status = 'success';
					//this.post = response.post;
					//Redirigir a la página del Post
					this._router.navigate(['/entrada', this.post.id]);
				}else{
					this.status = 'error';
					console.log(response);
				}
			},
			error => {
				this.status = 'error';
				console.log(error);
			}
		)
	}



	getCategories(){
		this._categoryService.getCategories().subscribe(
			response =>{
				if(response.status == 'success'){
					this.categories = response.categories;
					console.log(this.categories);
				}
			},
			error =>{
				console.log(error);
			}
		);
	}

	imageUpload(data){
		console.log(data.response);
		let image_data = (JSON.parse(data.response));
		this.post.image = image_data.image;
		let imageToRegister = {
			'image_name': this.post.image,
			'post_id': this.post.id
		}
		this._postService.registerImage(this.token,imageToRegister).subscribe(
			response => {
				this.getPost(false,this.languageParam);
			},error => {

			}
		)
	}

	getPost(init:boolean=false,language:string){
		if(!init){
			this.htmlLocal = this.htmlDoc;
		}		
		//Sacar el id del post de la URL
		this._route.params.subscribe(params => {
			let id = +params['id'];
			//Petición Ajax para sacar los datos
			this._postService.getPost(id,this.token,language).subscribe(
				response => {
					if(response.status = 'success'){

						this.htmlDoc = response.post[0].posts_language[0].content_language;
						this.postLanguage = response.post[0].posts_language[0];
						this.post = response.post[0];
						if(!init){
							this.htmlDoc = this.htmlLocal;
						}		
						this.postLoaded = true;
						if(this.identity.sub != 1){
							this._router.navigate(['/inicio']);
						}else{
							this._postService.getImagesByPost(this.token,this.post.id).subscribe(
								response =>{
									this.imagesOnPost = response.images;
								},error => {
									this._router.navigate(['inicio']);
								}
							);
						}
					}else{
						this._router.navigate(['/inicio']);
					}
				},
				error => {
					console.log(error);
					this._router.navigate(['inicio']);
				}	
			)
		});
		
	}
	setMainImage(imageId){
		this._postService.setMainImage(this.token,imageId).subscribe(
			response => {
				this.getPost(false,this.languageParam);
			},error => {
				console.log(error);
			}
		);
	}
	submitDescription(imageId,imageOnPost){
		this._postService.changeImageDescription(this.token,imageId,imageOnPost).subscribe(
			response => {
				this.getPost(false,this.languageParam);
			},error => {
				console.log(error);
			}
		)
	}

	deleteImage(imageOPostId){
		this._postService.deleteImage(this.token,imageOPostId).subscribe(
			response => {
				this.getPost(false,this.languageParam);
			},error => {
				console.log(error);
			}
		);
	}

	changeLanguage(lang:string){
		this.languageParam = lang;
		this.postLoaded = false;
		this.getPost(true,this.languageParam);
	}

	publishPost(postLanguageId,publish){
		
		this._postService.publishPost(this.token,publish,postLanguageId).subscribe(
			response => {
				this.getPost(false,this.languageParam);
			},error => {
				console.log(error);
			}
		)
	}

	showImageDetail(imageOnPostId){
		this.activatedImage = imageOnPostId;
	}

}
