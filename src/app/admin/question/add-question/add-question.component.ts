import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {HealthService} from './../../../service/health.service';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  updateForm:FormGroup = new FormGroup({
    question: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    code: new FormControl(''),
    units: new FormControl(null),
    section: new FormControl('',Validators.required),
    isSubQuestion: new FormControl(false),
    parentQuestion: new FormControl(''),
    possibleAnswers: this.fb.array([this.optionForm()]),
  })
  sectiondetails: any;
  questionDetailsData: any;
  constructor(public dialogRef: MatDialogRef<AddQuestionComponent>,private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,public health:HealthService) { 
      console.log("data123",data)
      this.questionDetailsData = data
      this.updateForm.patchValue({
        question:data.question,
        type:data.type,
        code:data.code,
        units:data.units,
        section:data.section,
        isSubQuestion:data.isSubQuestion,
        parentQuestion:data.parentQuestion,
      })
      this.updateForm.setControl('possiableAnswers', this.setPossibleAnswers(data.possibleAnswers));
  
      console.log("data",data,this.updateForm.value)
    }

  ngOnInit(): void {
    this.getQuestionariesSection()
  }

  optionForm(): FormGroup {
    return this.fb.group({
      possiableAnswersOptions: [""]
    });
  }
  addPossibleAnswersForm(): void {
    (<FormArray>this.updateForm.get('possiableAnswers')).push(this.optionForm());
  }

  public removeOptionForm(index): void {
    (<FormArray>this.updateForm.get('possiableAnswers')).removeAt(index);
  }

  

  setPossibleAnswers(possibleAnswersArray): FormArray {
    console.log("setSubQuestionPossibleAnswers123",possibleAnswersArray)
    const formArray = new FormArray([]);
    possibleAnswersArray.forEach(element => {
      formArray.push(this.fb.group({
        possiableAnswersOptions: element
      }))
    });
    return formArray;
  }
  getQuestionariesSection(){
    this.health.getQuestionnaireSection().subscribe(res=>{
      console.log("section",res)
      this.sectiondetails = res.data.sections
    })
  }

  onClose(){
    this.dialogRef.close()
  }

  updateQuestion(){

    Object.assign(this.updateForm.value);
    
    
    // if(this.updateForm.value.possibleAnswers == this.questionDetailsData.possibleAnswers){
    // console.log("length",this.updateForm.value.possibleAnswers,this.updateForm.value.possibleAnswers?.length)
    // this.updateForm.patchValue({
    //   possibleAnswers:this.updateForm.value.possibleAnswers
    // })
    //  }else{
    //    const array = []
    //    var str = this.updateForm.value.possibleAnswers
    //    var arrSplit = str.split(",");
    //   for (let i = 0; i < arrSplit.length; i++) {
    //     array.push(arrSplit[i]) ;
    //    }
    //    this.updateForm.patchValue({
    //     possibleAnswers:array
    //   })
     
    //  }

     let req = {
      code: this.updateForm.value.code,
      isSubQuestion: this.updateForm.value.isSubQuestion,
      parentQuestion: this.updateForm.value.parentQuestion,
      question: this.updateForm.value.question,
      section: this.updateForm.value.section,
      type: this.updateForm.value.type,
      units: this.updateForm.value.units
    }
    if(this.updateForm.value.type === 'options' || this.updateForm.value.type === 'checkbox' || this.updateForm.value.type === 'dropdown'){
      const array = []
    for (let i = 0; i < this.updateForm.value.possiableAnswers.length; i++) {
      
      if(this.updateForm.value.possiableAnswers[i].possiableAnswersOptions !== null && this.updateForm.value.possiableAnswers[i].possiableAnswersOptions !== ""){
        const element = this.updateForm.value.possiableAnswers[i].possiableAnswersOptions;
        array.push(element)
      }
      
      
    }
    console.log("array",array)
    req['possibleAnswers'] = array
    // if(array.length > 0){
    //   req['possibleAnswers'] = array
    // }else{
    //   req['possibleAnswers'] = []
    // }
      
    }else{
      req['possibleAnswers'] = []
    }
    console.log("this.updateForm.value",req,this.updateForm.value.possibleAnswers)
    this.health.updateQuestionary(this.data._id,req).subscribe(res=>{
      Swal.fire({
        title:'WelCome!',
        text: `${res?.message}`,
        icon: 'success',
        confirmButtonText: 'ok'
       
  
      }).then(result=>{
        this.onClose()
      })
    })

  }

}
