import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title:string;
  public user: User;
  public status:string;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
  	this.page_title = 'identifícate';
    this.user = new User(1, '', '','ROLE-USER', '', '', '', '');
  }

  ngOnInit(): void {
    //Se ejecuta siempre y cierra sesión sólo cuando le llega el parámetro sure por la urL
    this.logout();
  }

  onSubmit(form):void{
    this._userService.signup(this.user).subscribe(
      response => {
        //token        
        if(response.status != Error){
          this.status = 'success';
          this.token = response;

          //Objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              //Usuario
              this.identity = response;
              console.log(this.token);
              console.log(this.identity);
              //Persistir datos de usuario identificado
              localStorage.setItem('token',this.token);
              localStorage.setItem('identity',JSON.stringify(this.identity));
              
              //Redirección
              this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
            }
        );
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redirección

        this._router.navigate(['inicio']);
      }
    });
  }
}

