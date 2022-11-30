// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

// import { BrowserModule ,BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponentComponent } from './layout/main-component/main-component.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import { PromeaComponent } from './promea/promea.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TestsStatusPipe } from './shared/pipes/tests-status.pipe';
import { MainPipeModule } from './shared/pipes/main-pipe.module';
import { QuillModule } from 'ngx-quill';
import { TestReportComponent } from './test-report/test-report.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainComponentComponent,
    AuthComponent,
    PromeaComponent,
    TestReportComponent,
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    AppRoutingModule,
    // RouterModule.forRoot(route, { useHash: true }),
    BrowserAnimationsModule,
    NgxBarcodeModule,
    HttpClientModule,
    MaterialModule,
    NgxQRCodeModule,
    NgbModule,
    DocumentViewerModule,
    NgSelectModule,
    PdfViewerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    QuillModule.forRoot(),
    MainPipeModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
