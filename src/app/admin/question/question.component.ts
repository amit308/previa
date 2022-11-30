import { AfterViewInit, Component, OnInit, ViewChild,Inject, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HealthService } from './../../service/health.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddQuestionComponent} from './add-question/add-question.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup;
  sectionForm:FormGroup;
  subQuestionForm:FormGroup;
  displayedColumns: string[] = ['id','code', 'question',  'type','actions'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  sectiondetails: any;
  questionRes: any;
  subQuestionFormDetails: any;
  questiondetails: any;
  SectionFilterData: any;
  questionFilterData: any;
  sectionId: any;
  questionId: any;
  sectionType: any;

  ngAfterViewInit() {
  }
  constructor(public health: HealthService,public dialog: MatDialog,private fb:FormBuilder) {
    this.questionForm = this.fb.group({
      section:[""],
      isSubQuestion:[false],
      question:[null],
      type:[""],
      code:[""],
      units:null,
      possiableAnswers:this.fb.array([this.optionForm()])
      // subQuestionForm:this.fb.array([this.SubQuestionForm()])

    })
    this.sectionForm = this.fb.group({
      sectionName: ["",Validators.required],
      // sectionNameForm : this.fb.array([this.sectionDetailsForm()])
    })
    
   }

  ngOnInit(): void {
    this.getQuestionaries();
    this.getQuestionariesSection()
    this.SubQuestionForm()
  }

  optionForm(): FormGroup {
    return this.fb.group({
      possiableAnswersOptions: [""]
    });
  }
  public removeOptionForm(index): void {
    (<FormArray>this.questionForm.get('possiableAnswers')).removeAt(index);
  }




  addoptionFormItem(): void {
    (<FormArray>this.questionForm.get('possiableAnswers')).push(this.optionForm());
  }
  SubQuestionForm(){
    this.subQuestionForm = this.fb.group({
      question: [""],
      type:[""],
      code:[""],
      id:[null],
      units:null,
      possiableAnswers:this.fb.array([this.optionForm()])
    });
  }
  addSubQuestionForm(): void {
    (<FormArray>this.subQuestionForm.get('possiableAnswers')).push(this.optionForm());
  }
  public removeSubQuestionForm(index): void {
    (<FormArray>this.subQuestionForm.get('possiableAnswers')).removeAt(index);
  }

  public opendailog(templateRef: TemplateRef<any>,type): void {
     this.dialog.open(templateRef, {
      width:"400px"

    })
    this.sectionType = type
    console.log("type",type)
    if(type !== 'create'){
        this.sectionForm.patchValue({
          sectionName: type.name
        })
    }else{
      this.sectionForm.patchValue({
        sectionName: ''
      })
    }
  }

  addSection(){
    console.log("section form",this.sectionForm.value)
    const formdata ={
      name:this.sectionForm.value.sectionName
    }
    if(this.sectionType === 'create'){
      this.health.addquestionnaireSection(formdata).subscribe(res=>{
        console.log("res",res)
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          // this.questionForm.reset()
          // this.getQuestionaries();
          this.getQuestionariesSection()
          this.dialog.closeAll()
        })
        
      })
    }else{
      this.health.updateQuestionnaireSectionid(this.sectionType._id,formdata).subscribe(res=>{
        console.log("res",res)
        Swal.fire({
          title:'WelCome!',
          text: `${res?.message}`,
          icon: 'success',
          confirmButtonText: 'ok'
         
    
        }).then(result=>{
          // this.questionForm.reset()
          this.getQuestionaries();
          this.getQuestionariesSection()
          this.dialog.closeAll()
        })
        
      })
    }
    
      
  }


  onChangetoggle(event){
    this.questionForm.patchValue({
      question:null,
      code:"",
      type:""

    })
    this.questionRes = {}
    this.subQuestionForm.reset()
    this.subQuestionFormDetails = {}
    
  }
  clearAll(){
    this.questionForm.patchValue({
      question:null,
      code:"",
      type:"",
      section:"",
      units:null,
      isSubQuestion :false

    })
    this.questionRes = {}
    this.subQuestionForm.reset()
    let frmArray = this.questionForm.get('possiableAnswers') as FormArray;
    frmArray.clear();
    let frmArray1 = this.subQuestionForm.get('possiableAnswers') as FormArray;
    frmArray1.clear();
    this.subQuestionFormDetails = {};
    (<FormArray>this.questionForm.get('possiableAnswers')).push(this.optionForm());
    (<FormArray>this.subQuestionForm.get('possiableAnswers')).push(this.optionForm());
    
  }

  addSubQuestionFormItem(){
    const data = this.subQuestionForm.value
    const obj ={
      code:data.code,
      question:data.question,
      type:data.type,
      isSubQuestion: true,
      units:data.units
      // parentQuestion:this.questionRes.data._id,
      // section:this.questionRes.data.section,
    }
    const array = []
    for (let i = 0; i < this.subQuestionForm.value.possiableAnswers.length; i++) {
      
      if(this.subQuestionForm.value.possiableAnswers[i].possiableAnswersOptions !== null && this.subQuestionForm.value.possiableAnswers[i].possiableAnswersOptions !== ""){
        const element = this.subQuestionForm.value.possiableAnswers[i].possiableAnswersOptions;
        array.push(element)
      }
      
      
    }
    if(this.subQuestionForm.value.type === 'options' || this.subQuestionForm.value.type === 'checkbox' || this.subQuestionForm.value.type === 'dropdown'){
      obj['possibleAnswers'] =  array
    }else{
      obj['possibleAnswers'] =  []
    }
    
    if(this.questionForm.value.isSubQuestion === true){
      obj['parentQuestion'] = this.questionForm.value.question
      obj['section'] = this.questionForm.value.section
      this.sectionId = this.questionForm.value.section
      this.questionId = this.questionForm.value.question
    }else{
      obj['parentQuestion'] = this.questionRes.data._id,
      obj['section'] = this.questionRes.data.section
      this.sectionId = this.questionRes.data.section
      this.questionId = this.questionRes.data._id
    }
    if(this.subQuestionForm.value.id !== null){
      console.log('suresh')
      this.health.updateQuestionary(this.subQuestionForm.value.id,obj).subscribe(res => {
      Swal.fire({
        title:'WelCome!',
        text: `${res?.message}`,
        icon: 'success',
        confirmButtonText: 'ok'
       
  
      }).then(result=>{
        let frmArray = this.subQuestionForm.get('possiableAnswers') as FormArray;
        frmArray.clear();
        (<FormArray>this.subQuestionForm.get('possiableAnswers')).push(this.optionForm());
        this.subQuestionForm.reset()
        this.getQuestionaries();
        this.getSubQuestionary(this.sectionId,this.questionId)
      })
      
    })
    }else{
      this.health.addQuestionary(obj).subscribe(res => {
      Swal.fire({
        title:'WelCome!',
        text: `${res?.message}`,
        icon: 'success',
        confirmButtonText: 'ok'
       
  
      }).then(result=>{
        this.subQuestionForm.reset();
        let frmArray = this.subQuestionForm.get('possiableAnswers') as FormArray;
        frmArray.clear();
       (<FormArray>this.subQuestionForm.get('possiableAnswers')).push(this.optionForm());
        this.getQuestionaries();
        this.getSubQuestionary(this.sectionId,this.questionId)
      })
      
    })
    }
  }
  getSubQuestionary(sectionId,questionId){

    this.health.getQuestionary().subscribe(res => {
      const array = res.data.filter(res=>{ return res._id === sectionId})
      console.log("array",array)
      this.subQuestionFormDetails = array[0].questions?.find(res=>{ return res._id === questionId})
      console.log("array",this.subQuestionFormDetails)
    })
  }
  onFilterbySection(event,type){
    if(type === 'section'){
      this.SectionFilterData = this.questiondetails.find(res=>{return res._id === event.target.value})
      // this.questionForm.value.question = null
      this.questionForm.patchValue({
        question:null
      })
      this.subQuestionForm.reset()
      this.subQuestionFormDetails = {}
    }else if(type === 'question'){
      this.subQuestionFormDetails = this.SectionFilterData?.questions?.find(res=>{ return res._id === event.target.value})
      this.subQuestionForm.reset()
    }
  console.log("event",event.target.value,type,this.SectionFilterData,this.questionFilterData)
  }

  editSubQuestion(item){

    this.subQuestionForm.patchValue({
      question:item.question,
      code:item.code,
      type:item.type,
      id:item._id,
      units:item.units
    })
    this.subQuestionForm.setControl('possiableAnswers', this.setSubQuestionPossibleAnswers(item.possibleAnswers));
  }

  setSubQuestionPossibleAnswers(possibleAnswersArray): FormArray {
    console.log("setSubQuestionPossibleAnswers123",possibleAnswersArray)
    const formArray = new FormArray([]);
    possibleAnswersArray.forEach(element => {
      formArray.push(this.fb.group({
        possiableAnswersOptions: element
      }))
    });
    return formArray;
  }

  deleteSubQuestion(item){
    console.log("item",item)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.health.deleteQuestionary(item._id).subscribe(res=>{
          this.getQuestionaries();
          if(this.questionForm.value.isSubQuestion === true){
            this.getSubQuestionary(this.questionForm.value.section,this.questionForm.value.question)
          }
          else{
            this.getSubQuestionary(this.questionForm.value.section,this.questionId)

            
          }
          Swal.fire(
            'Deleted!',
            'Question Has Been Deleted successfully.',
            'success'
          )
        })
      }})

  }

  deleteQuestionSection(item){
    Swal.fire({
      title: 'Are you sure to Delete Section?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.health.deleteQuestionarySectionid(item._id).subscribe(res=>{
          this.getQuestionaries();
          this.getQuestionariesSection()
          Swal.fire(
            'Deleted!',
            'Question Section Has Been Deleted successfully.',
            'success'
          )
        })
      }})
  }


   
   
   

  

    

  addQuestinary(data) {

    const obj = {
      code:this.questionForm.value.code,
      section:this.questionForm.value.section,
      question:this.questionForm.value.question,
      type:this.questionForm.value.type,
      units:this.questionForm.value.units
      // isSubQuestion: true,
      // parentQuestion:"5fce3d914caf05cdc66cef8d"
    }
    const array = []
    for (let i = 0; i < this.questionForm.value.possiableAnswers.length; i++) {
      
      if(this.questionForm.value.possiableAnswers[i].possiableAnswersOptions !== null && this.questionForm.value.possiableAnswers[i].possiableAnswersOptions !== ""){
        const element = this.questionForm.value.possiableAnswers[i].possiableAnswersOptions;
        array.push(element)
      }
      
      
    }
    obj['possibleAnswers'] =  array

    this.health.addQuestionary(obj).subscribe(res => {
      Swal.fire({
        title:'WelCome!',
        text: `${res?.message}`,
        icon: 'success',
        confirmButtonText: 'ok'
       
  
      }).then(result=>{
       
        if(data === 'subquestion'){
          this.questionRes = res
          this.questionId = this.questionRes.data._id
          this.subQuestionFormDetails = {}
          this.getQuestionaries();
        }else if(data === 'question'){
          this.getQuestionaries();
          let frmArray = this.questionForm.get('possiableAnswers') as FormArray;
            frmArray.clear();
          this.questionForm.reset();
          (<FormArray>this.questionForm.get('possiableAnswers')).push(this.optionForm());
          this.questionForm.patchValue({
            question:null,
            code:"",
            type:"",
            section:"",
            isSubQuestion :false,
            possiableAnswers:[]
      
          })
        
        }
      })
      
    })
    
    console.log("question form",this.questionForm.value,obj)
   
    console.log("array",array)
    
  }

  getQuestionaries() {
    this.health.getQuestionary().subscribe(res => {
      this.questiondetails = res.data
      // this.dataSource = new MatTableDataSource<any>(res.data[4].questions);
      // this.dataSource.paginator = this.paginator;
    })
  }

  getQuestionariesSection(){
    this.health.getQuestionnaireSection().subscribe(res=>{
      console.log("section",res)
      this.sectiondetails = res.data.sections
    })
  }

  deleteQuestion(ele:any){
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.health.deleteQuestionary(ele._id).subscribe(res=>{
          this.getQuestionaries();
          Swal.fire(
            'Deleted!',
            'Question Has Been Deleted successfully.',
            'success'
          )
        })
      }})
  }

  openDialog(ele:any): void {
    console.log("question",ele)
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width:'54rem',
      data: ele
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.getQuestionaries()
    });
  }

}


