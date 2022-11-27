import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from  '../../services/global';


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
  constructor(private _postService: PostService,
		private _userService: UserService
	) { 
		
		this.url = global.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken(); 
  }

  ngOnInit(): void {
  }

  getPosts(){
		this._postService.getPosts().subscribe(
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
