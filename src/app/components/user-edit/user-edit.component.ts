import { Component, OnInit,OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {global} from '../../services/global';
import { Editor } from 'ngx-editor';
import { Toolbar } from 'ngx-editor/public_api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit,OnDestroy {
	
	public page_title: string;
	public user: User;
	public status: string;
	public identity;
	public token;
	public url;
	public resetVar = true;
	public editor: Editor;
	public toolbar:Toolbar;

  	public afuConfig = {
	    multiple: false,
	    formatsAllowed: ".jpg,.png,.gif,.jpeg",
	    maxSize: "50",
	    uploadAPI:  {
	      url:global.url+"user/upload",
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
	    attachPinText: 'Sube tu avatar de usuario'
	};


	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Ajustes de Usuario';
		this.user = new User(1, '', '','ROLE-USER', '', '', '', '');
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
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
		]

		//Rellenar objeto de Usuario
		let identityDescription = this.identity.description == null ? "": this.identity.description;
		this.user = new User(
			this.identity.sub,
			this.identity.name,
			this.identity.surname,
			this.identity.role,
			this.identity.email,
			'',
			identityDescription,
			this.identity.image
		)
		
	}

	ngOnInit(): void {

	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
	
	onSubmit(form){
		console.log(this.user);
		this._userService.update(this.token,this.user).subscribe(
			response =>{
				if(response){
					this.status = 'success';

					//Actualizar usuario en sesión
					if(response.changes.name){
						this.user.name = response.changes.name;
					}
					if(response.changes.surname){
						this.user.surname = response.changes.name;
					}
					if(response.changes.email){
						this.user.email = response.changes.email;
					}
					if(response.changes.description){
						this.user.description = response.changes.description;
					}					
					if(response.changes.image){
						this.user.image= response.changes.image;
					}

					this.identity = {
						'sub' : this.user.id,
						'description' : this.user.description,
						'email' : this.user.email,
						'image' : this.user.image,
						'name' : this.user.name,
						'password' : this.user.password,
						'surname' : this.user.surname,
					};
					
					localStorage.setItem('identity', JSON.stringify(this.identity));
				}else{
					this.status = 'error';						
				}

			},
			error => {
				console.log(<any>error);
				this.status = 'error';
			}
		);
		
	}

	avatarUpload(datos){
		let data = (JSON.parse(datos.response));
		this.user.image = data.image;
	}

}
