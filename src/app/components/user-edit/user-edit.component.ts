import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
	
	public page_title: string;
	public user: User;
	public status: string;
	public identity;
	public token;
	public url;
	public resetVar = true;

	public froala_options: Object = {
	    charCounterCount: true,
	    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	  };

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

		//Rellenar objeto de Usuario
		this.user = new User(
			this.identity.sub,
			this.identity.name,
			this.identity.surname,
			this.identity.role,
			this.identity.email,
			'',
			this.identity.description,
			this.identity.image
		)
	}

	ngOnInit(): void {

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
