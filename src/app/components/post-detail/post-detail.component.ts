import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService,UserService]
})
export class PostDetailComponent implements OnInit {
	public post: Post;
	public identity;
	public url;

	constructor(
		private _postService: PostService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,

	){ 
		this.identity = this._userService.getIdentity();
		this.url = global.url;
	}

	ngOnInit(): void {
		this.getPost();
	}

	getPost(){
		//Sacar el id del post de la URL
		this._route.params.subscribe(params => {
			let id = +params['id'];
			//Petición Ajax para sacar los datos
			this._postService.getPost(id).subscribe(
				response => {
					if(response.status = 'success'){
						this.post = response.post;
						console.log(this.post);
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
