import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';

class CategoryLanguageClass {
  constructor(
    public name_language:string,
    public language_symbol:string
  ) {
    
  }
}

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  public categories: Array<Category>;
  public token:string;
  public activatedCategory: string;
  public categoriesLanguageArray: Array<any>;
  public categoryLanguage:CategoryLanguageClass;

  constructor(
    private _categoryService:CategoryService,
    private _userService:UserService,
  ) { 
    this.categories = [];
    this.token = this._userService.getToken();
    this.categoryLanguage = new CategoryLanguageClass("","");
    this.activatedCategory = "";
  }

  ngOnInit(): void {
    this.showCategories();
  }

  delete(id){
    this._categoryService.deleteCategory(id,this.token).subscribe(
      response => {
        this.showCategories();
        //console.log(response);
        window.location.reload();
      },error => {
        console.log(error);
      }
    );
  }

  showCategoryDetail(id){
    this._categoryService.getCategoryDetail(id).subscribe(
      response => {
        //two arrays and links id with index
        this.activatedCategory = id;
        console.log(this.activatedCategory);
        this.categoriesLanguageArray = response.categories;
        this.categoryLanguage = {
          name_language:"",
          language_symbol:""
        }
        
      },error => {
        console.log(error);
      }
    );
  }

  saveCategoryLanguage(id){
    this._categoryService.submitCategoryLanguage(this.token,this.categoryLanguage,id).subscribe(
      response => {
        this.activatedCategory = "";
        this.categoryLanguage = {
          name_language:"",
          language_symbol:""
        }
      },error => {
        console.log(error);
      }
    )
  }

  deleteCategoryLanguage(id){
    this._categoryService.deleteCategoryLanguage(this.token, id).subscribe(
      response => {
        this.activatedCategory = "";
        this.categoryLanguage = {
          name_language:"",
          language_symbol:""
        }
      },error => {
        console.log(error);
      }
    );
  }

  showCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;
      },error => {
        console.log(error);
      }
    );
  }

}
