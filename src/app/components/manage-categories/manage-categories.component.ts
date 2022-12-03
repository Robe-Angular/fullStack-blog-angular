import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  public categories: Array<Category>;
  public token:string;

  constructor(
    private _categoryService:CategoryService,
    private _userService:UserService,
  ) { 
    this.categories = [];
    this.token = this._userService.getToken();
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
