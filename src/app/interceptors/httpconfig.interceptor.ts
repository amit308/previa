import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router ,private  spinner : NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(2),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide()
        if (error.status === 401) {
          localStorage.clear()
          Swal.fire({
            text: "Session Expired, Please login",
            icon: 'warning',
            confirmButtonText: 'Ok'
          }).then((res) => {
            if (res.isConfirmed) {
              this.router.navigateByUrl('/session/signIn')
            }
          });
        } else {
          return throwError(error);
        }

      })
    );
      

  }

}