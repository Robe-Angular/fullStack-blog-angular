import { Component, OnInit, Input, Output , EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

	@Input() posts;
	@Input() identity;
	@Input() url;

	@Output()
	eliminar = new EventEmitter<number>();

	@Output()
	outPublish = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {
	}

	deletePost(id){
		this.eliminar.emit(id);
	}

	publish(id,publish){
		this.outPublish.emit({id,publish});
	}

}
