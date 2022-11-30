import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {

  headerFooterData: any
  selectedImage: any
  title: any
  imageBaseUrl1 = environment.imageBaseUrl1
  file: any
  headerFooterUploadForm: FormGroup
  addFooterUploadForm: FormGroup
  errormessage1: any
  user: any
  headerFooterList = []
  // headerData = ['header', 'footer']

  constructor(
    private adminservice: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.headerFooterUploadForm = this.fb.group({
      file_name: [""]
    })
    this.addFooterUploadForm = this.fb.group({
      file_name: [""],
      attachment_type: [""]
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
      this.headerFooterList = this.headerFooterData.filter(item => item.attachmentType  !== 'promotion');

    })  
  }

  fileUploading(ev){
    this.file = ev.target.files[0];
   
  }


  editHeaderFooter(content, info){
    if(info?.attachmentType == 'header'){
      this.title = 'Header'
    }else{
      this.title = 'Footer'
    }

    this.errormessage1 = ""
    const dialogRef = this.dialog.open(content ,{
      width: '30rem',
      data: {},
    })

  }

  public onClose(): void {
    this.dialog.closeAll();
    this.headerFooterUploadForm.reset()
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


  addSubmit(){
    if (!this.file) {
      this.errormessage1 = "Please Upload Valid Image";
      return
    } 
    var formData: any = new FormData();
    formData.append('organizationId', this.user?.subdivision_id);
    formData.append('attachmentType', this.addFooterUploadForm.value.attachment_type);
    formData.append('attachment', this.file);
    console.log(formData,'formData');
    
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

addHeaderModal(headerContent){
  this.addFooterUploadForm.reset()
  // if(attachmentType == this.headerData){
  //   this.title = 'Header'
  // }else{
  //   this.title = 'Footer'
  // }

  this.errormessage1 = ""
  const dialogRef = this.dialog.open(headerContent ,{
    width: '30rem',
    data: {},
  })
}

}
