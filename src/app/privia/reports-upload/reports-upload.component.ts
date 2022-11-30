import { Component, Directive, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { HealthService } from 'src/app/service/health.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-reports-upload',
  templateUrl: './reports-upload.component.html',
  styleUrls: ['./reports-upload.component.scss']
})
export class ReportsUploadComponent implements OnInit {
  @Directive({
    selector: '[appDragDrop]',
  })
  /* ========= for drag and drop ========== */
  @Output()
  onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

  uploadedFiles: any = []
  files: any = []
  imageBaseUrl = environment.imageBaseUrl
  constructor(
    private healthService: HealthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {



  }

  uploadReport() {
    this.spinner.show()
    const formData = new FormData()
    this.uploadedFiles.forEach(file =>{
      formData.append('pdf_file', file)
    })

    this.healthService.uploadReport(formData).subscribe(res => {
      this.spinner.hide()
      if(res.status_code == 200){
        this.files = []
        this.uploadedFiles = []
        Swal.fire('Uploaded SuccessFully');
        res?.file_path.forEach(file =>{
          saveAs.saveAs(`${this.imageBaseUrl}${file}`, `${file}`)
        })

      }else{
        Swal.fire(res?.message ?? 'Faild to upload');
      }

    })


  }

  uploadFile(event) {
    for (let i = 0; i < event.length; i++) {
      const file = event[i]
      const fileName = file.name.split('.')
      const check = fileName.filter(item => {
        return item.toUpperCase() === 'PDF' 
      })
      if (check.length > 0) {
        this.uploadedFiles.push(file);
        this.files.push(file.name);
      } else {
        alert('Files should be Pdf file')
        break
      }
    }

  }
  deleteAttachment(index) {

    this.files.splice(index, 1)
    this.uploadedFiles.splice(index, 1)
    if (this.files.length == 0 && this.uploadedFiles.length == 0) {
      this.files = []
      this.uploadedFiles = []
    }


  }

}
