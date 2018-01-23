import { Component, OnInit } from '@angular/core';

import {FeedbackService} from '../services/feedback.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType} from '../shared/feedback';
import {flyInOut,expand, visibility} from '../animations/app.animation';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback:Feedback;
  contactType= ContactType;
  feedbackcopy=null;
  visibilityForm='shown';
  formStatus=true;
  visibilitySpinner=true;
  visibilitySubmit='hidden';
formErrors={
  'firstname':'',
  'lastname':'',
  'telnum':'',
  'email':''
};

validationMessages={
  'firstname':{
    'required':'First name is required',
    'minlength':'First name must be at least 2 characters long',
    'maxlength':'First name cannot be more than 25 characters long'
  },
  'lastname':{
    'required':'Last name is required',
    'minlength':'Last name must be at least 2 characters long',
    'maxlength':'Last name cannot be more than 25 characters long'
  },
  'telnume':{
    'required':'Tel number is required',
    'pattern':'Tel. number must contain only numbers',

  },
  'email':{
   'required':'Email is required',
   'email':'Email not in valid format'
  }
};

  constructor(private feedBackService:FeedbackService,
     private fb:FormBuilder
    ) { 
    this.createForm();
  }
 
  ngOnInit() {
  }
  createForm(){
    this.feedbackForm=this.fb.group({
      firstname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required, Validators.email]],
      agree:false,
      contacttype:'None',
      message:''

    });

    this.feedbackForm.valueChanges
      .subscribe(data=> this.onValueChanged(data));

      this.onValueChanged();
  }
  onValueChanged(data ?:any){
    if(!this.feedbackForm){return;}
    const form =this.feedbackForm;
    for(const field in this.formErrors){
      this.formErrors[field]='';
      const control=form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages=this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field]+=messages[key]+' ';
        }
      }
    }
  }
  onSubmit(){
    this.visibilityForm='hidden';
    this.formStatus=false;
    this.feedbackcopy=this.feedbackForm.value;
    console.log(this.feedbackcopy);
     this.feedBackService.submitFeedback(this.feedbackcopy)
      .subscribe(feedback=>{
        this.visibilitySpinner=false;
        setTimeout(()=>{this.feedback=feedback;
          this.visibilitySpinner=true;
          this.visibilitySubmit='shown'},5000)
        setTimeout(()=>{this.visibilityForm='shown';
          this.formStatus=true;
          this.feedback=null;
          this.visibilitySubmit='hidden'},10000)
      });
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:'',
      agree:false,
      contacttype:'None',
      message:''
    });
  }
}
