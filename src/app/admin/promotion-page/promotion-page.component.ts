import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.scss']
})
export class PromotionPageComponent implements OnInit {

  headerFooterData: any
  selectedImage: any
  title: any
  imageBaseUrl1 = environment.imageBaseUrl1
  file: any
  promotionUploadForm: FormGroup
  addPromotionForm: FormGroup
  errormessage1: any
  user: any
  promotionData = []
  headerData = ['header', 'footer']

  constructor(
    private adminservice: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.promotionUploadForm = this.fb.group({
      file_name: [""]
    })
    this.addPromotionForm = this.fb.group({
      file_name: [""]
    })
   }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user_details'))
    // console.log(user,'user');
    
    this.loadHeaderFooter()
  }
  
  getHeaderFooter(data){
    this.selectedImage = data?.attachmentType
  }

  loadHeaderFooter(){
    this.adminservice.getHeaderFooter().subscribe(res=>{
      this.headerFooterData = res.data?.attachments    

      const obj = this.headerFooterData.find(item => item.attachmentType == 'promotion');
      if(obj){
        this.promotionData = []
          this.promotionData.push(obj)
      }      
    })  
  }


  


  fileUploading(ev){
    this.file = ev.target.files[0];
   
  }


  addPromotionModal(addContent){
    this.addPromotionForm.reset()
    this.errormessage1 = ""
    const dialogRef = this.dialog.open(addContent ,{
      width: '30rem',
      data: {},
    })

  }

  editPromotion(content){
    this.errormessage1 = ""
    const dialogRef = this.dialog.open(content ,{
      width: '30rem',
      data: {},
    })

  }

  public onClose(): void {
    this.dialog.closeAll();
    this.promotionUploadForm.reset()

  }

  headerFileSubmit(){
    if (!this.file) {
      this.errormessage1 = "Please Upload Valid Image";
      return
    } 
    var formData: any = new FormData();
    formData.append('organizationId', this.user?.subdivision_id);
    formData.append('attachmentType', this.selectedImage);
    formData.append('attachment', this.file);
  this.adminservice.headerFooterUpload(formData).subscribe(res=>{
    this.loadHeaderFooter()
      if(res.statusCode == 200){
        this.onClose()
        Swal.fire({
          title: `${res.message}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
  })

  }

  
  addPromotionSubmit(){
    if (!this.file) {
      this.errormessage1 = "Please Upload Valid Image";
      return
    } 
    var formData: any = new FormData();
    formData.append('organizationId', this.user?.subdivision_id);
    formData.append('attachmentType', 'promotion');
    formData.append('attachment', this.file);
  this.adminservice.headerFooterUpload(formData).subscribe(res=>{
    this.loadHeaderFooter()
      if(res.statusCode == 200){
        this.onClose()
        Swal.fire({
          title: `${res.message}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
  })

  }

clearError(){
  this.errormessage1 = " ";
}

}
