import { Component, Input, OnInit } from '@angular/core';
import {  AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import {  filter, map } from 'rxjs/operators';
import { SearchService } from 'src/app/shared/services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { Categories } from '../shared/models/categories.interface';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  {
  public newVal:any=null
  cat:Categories[];
  @ViewChild('mySelect') inputElement: ElementRef;
  @Output() click: EventEmitter<string> = new EventEmitter<string>();


  constructor(private searchService: SearchService) { }

  ngOnInit()
  {
    this.handleSearch();
  }

  public onChange(event): any
  {

    this.newVal = event.target.value;

    this.searchService.setTest(this.newVal);
    console.log(this.newVal);
    return (this.newVal);


  }

  public getTwo()
  {
    this.searchService.getOne(this.newVal).subscribe(data=>{
    console.log(data);

})

  }

  handleSearch() {
    this.searchService.getCategories()
      .subscribe((items: any) => {
        this.cat = items.map(item => {

          return( {
            title: item.snippet.title,
            id :item.id,
            assignable:item.snippet.assignable,
          });

        });
  });



}}
