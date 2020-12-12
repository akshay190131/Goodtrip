import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  public contactusform : FormGroup;

  constructor( private fb : FormBuilder ) { }

  ngOnInit() {
    this.contactusform = this.fb.group({
      'username': [null,[Validators.required,Validators.minLength(3)]],
      'message': [null,Validators.required],
      'email':[null,[Validators.required,Validators.email]]
    });

  }


  sendMessage(formData : NgForm)
  {
    console.log(formData);
  }

}
