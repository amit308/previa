import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  testForm:FormGroup;
  element:any;

constructor(private formBuilder: FormBuilder) { }
ngOnInit() {

this.testForm=this.formBuilder.group({
element:this.formBuilder.array([
  this.formBuilder.group({
    type:'',
    element:this.formBuilder.array([
      this.formBuilder.group({
        type:'',
        element:this.formBuilder.array([                
        ])
      })
    ])        
  })
])
})
}

onSubmit() {       
  console.log(this.testForm.value);
}
}