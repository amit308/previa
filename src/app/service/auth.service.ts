import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from './../../environments/environment';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.url;

  constructor(private http: HttpClient, private router: Router) {}

  signIn(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'user/logIn', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error.message}`;
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    Swal.fire({
      text: `${errorMessage}`,
      icon: 'warning',
      confirmButtonText: 'ok',
    }).then((result) => {
      if (errorMessage === 'Unauthorized') {
        console.log('suresh');
        // localStorage.removeItem('user_token')
        this.router.navigateByUrl('/session/signIn');
        // localStorage.removeItem('user_details')
      }
    });
    return throwError(errorMessage);
  }

  // vaccination register
  vaccinationRegister(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'patient/vaccine', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  // signup
  verifyOtp(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'patient/registration/verification', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  // signup with otp
  signinCheckOtp(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'patient/registration/verification', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  // resend otp
  resendOtp(mobileNumber: any): Observable<any> {
    return this.http.get(
      `https://2factor.in/API/V1/90272374-e143-11ea-9fa5-0200cd936042/SMS/+91${mobileNumber}/AUTOGEN`
    );
  }

  // signup
  signUp(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'patient/registration', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  loginOTP(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'user/logIn/otp', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  loginOtpVerification(data: Object): Observable<any> {
    try {
      return this.http
        .post(this.baseUrl + 'user/logIn/otp/verification', data)
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  reSendPassword(data: Object): Observable<any> {
    try {
      let access_token = localStorage.getItem('user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', "Bearer " + access_token);
      return this.http
        .put(this.baseUrl + 'user/resendPassword', data , { headers: headers})
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  currentUser() {
    const user = jwt_decode(localStorage.getItem('user_token'));
    return user;
  }
}
