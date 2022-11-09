import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';
import { Editor } from 'ngx-editor';
import { Toolbar } from 'ngx-editor/public_api';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit,OnDestroy {
	public page_title: string;
	public identity;
	public token;
	public post: Post;
	public categories;
	public resetVar:string;
	public status;
	public is_edit;
	public editor:Editor;
	public toolbar: Toolbar;

	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.png,.gif,.jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+"post/upload",
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
	    attachPinText: 'Sube la imagen de la entrada'
	};

	constructor(
		private _route: ActivatedRoute,
		private _router : Router,
		private _userService: UserService,
		private _categoryService: CategoryService,
		private _postService: PostService
	) {
		this.page_title = 'Crear una entrada';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.is_edit = false;
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
		]
	}

	ngOnInit(): void {
		this.getCategories();
		this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
		console.log(this.post);
	}
	
	ngOnDestroy(): void {
		this.editor.destroy();
	}

	onSubmit(form){
		this._postService.create(this.token, this.post).subscribe(
			response => {
				if(response.status == 'success'){
					this.post = response.post;
					this.status = 'success';
					this._router.navigate(['/inicio']);
				}else{

				}
			},
			error => {
				console.log(error)
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
		let image_data = (JSON.parse(data.response));
		this.post.image = image_data.image;
	}


}
