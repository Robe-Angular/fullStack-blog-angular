import { Component, OnInit, DoCheck, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { LoadingService } from './services/loading.service';
import { I18nServiceService } from './services/i18n-service.service';
import { global } from  './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService,CategoryService]
})
export class AppComponent implements OnInit, DoCheck, AfterViewChecked {
	public title = 'Blog de Angular';
	public identity;
	public token;
	public url;
	public categories;
	public loading$ = this._loadingService.loading$;

	constructor(
		private _userService: UserService,
		private _categoryService: CategoryService,
		private _i18nService: I18nServiceService,
		private _loadingService:LoadingService,
		private _detectorRef: ChangeDetectorRef
	){
		this.loadUser();
		this.url = global.url;
	}

	ngOnInit(){
		console.log('Webapp Cargada correctamente');
		this.getCategories();
	}

	ngAfterViewChecked(): void {
		this._detectorRef.detectChanges();
		
	}
	ngDoCheck(){
		this.loadUser();
		
	}

	loadUser(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();		
	}

	getCategories(){
		console.log($localize.locale);
		
		let locale = this._i18nService.getlocale();
		let languageParam = locale == undefined ? window.navigator.language: locale;
		this._categoryService.getCategoriesLanguage(languageParam).subscribe(
			response =>{
				if(response.status=='success'){
					
					this.categories = response.categories;
					console.log(response);
				}
				
			},
			error => {
				console.log(error);
			}
		)
	}

	

}
