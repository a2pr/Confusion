import { Component, OnInit} from '@angular/core';

import {DishService} from '../services/dish.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Dish} from '../shared/dish';

import 'rxjs/add/operator/switchMap';

import { Comment} from '../shared/comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  commentForm:FormGroup;
  dish: Dish;
  dishIds:number[];
  prev:number;
  next:number;
  comment=Comment;


formErrors={
  'name':'',
  'rating':'',
  'comment':''
};

validationMessages={
  'name':{
    'required':'First name is required',
    'minlength':'First name must be at least 2 characters long',
    'maxlength':'First name cannot be more than 25 characters long'
  },
  'rating':{},
  'comment':{
    'required':'Comment is required',
  }
};


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
  private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit() { 
    this.dishservice.getDishIds()
      .subscribe(dishIds=> this.dishIds=dishIds);

    let id= +this.route.params
      .switchMap((params:Params)=> this.dishservice.getDish(+params['id']))
        .subscribe(dish=> {this.dish = dish; this.setPrevNext(dish.id)});
  }
  

  setPrevNext(dishId:number){
    let index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length + index+1)%this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
    
  }
  createForm(){
    this.commentForm=this.fb.group({
      name:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating:[5],
      comment:['',Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data=> this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data ?:any){
    if(!this.commentForm){return;}
    const form =this.commentForm;
    for(const field in this.formErrors){
      
      this.formErrors[field]='';
      const control=form.get(field);
      
      if (control && control.dirty && !control.valid) {
        console.log(field);
        console.log(control);
        const messages=this.validationMessages[field];
        console.log(messages);
        for(const key in control.errors){
          console.log(key);
          this.formErrors[field]+=messages[key]+' ';
        }
      }
    }
  }

  onSubmit(){
    /*this.comment={
      rating= new Date();
  }*/
    console.log(this.comment);
    this.commentForm.reset({
      name:'',
      rating:5,
      comment:''
    });
  }
}

