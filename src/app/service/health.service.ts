import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { data, param } from "jquery";

@Injectable({
  providedIn: "root",
})
export class HealthService {
  private baseUrl: string = environment.url;
  private mapKey: string = environment.mapApiKey;
  // baseUrl = environment.url

  constructor(private http: HttpClient, private router: Router) {}

  /* add Company */
  addCompany(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "company", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  // get quote
  // GetQuote() {
  //   const access_token = localStorage.getItem("user_token");

  //   let headers = new HttpHeaders();
  //   headers = headers.set("Authorization", "Bearer " + access_token);

  //   var raw = JSON.stringify({
  //     "quote": 1
  //   });
    
  //   var requestOptions: any = {
  //     method: 'POST',
  //     headers: headers,
  //   };
    
  //   fetch("http://localhost:4002/api/patient/addQuote", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  
  // }

  

  /* get Company */
  getCompany(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + "company", { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update Company */

  updateCompany(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `company/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* Delete Company */
  deleteCompany(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `company/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  // /user/createAdmin

  /* add admin */
  addAdmin(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createAdmin", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get admin details */

  getAdmin(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params
      .set("start", data.start)
      .set("limit", data.limit)
      .set("role", data.role);
    if (data.id) {
      params = params.set("id", data.id);
    }
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + `user`, { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* update Company */

  updateAdmin(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/updateAdmin/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* Delete users */
  deleteUser(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `user/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  // /patient/addPatients

  /* add Bulk Patients */
  addBulkPatients(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "patient/addPatients", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*   add patients  */
  addPatients(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "patient", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get Company */
  getPatientsDataBySearch(search): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("searchString", search);
    try {
      return this.http
        .get(this.baseUrl + "patient", { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get Patient */
  getPatients(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "patient", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* get patient list */
  getPatientsList(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    if (data.vaccinationPatients) {
      params = params.set("vaccinationPatients", data.vaccinationPatients);
    }
    if (data.searchString) {
      params = params.set("searchString", data.searchString);
    }
    if (data.searchReferrer) {
      params = params.set("searchReferrer", data.searchReferrer);
    }
    if (data.startDate) {
      params = params.set("startDate", data.startDate);
    }
    if (data.endDate) {
      params = params.set("endDate", data.endDate);
    }
    if (data.category) {
      params = params.set("category", data.category);
    }

    try {
      return this.http
        .get(this.baseUrl + "patient/active", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get patient list */
  getPatientsListvaccine(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    if (data.vaccinationPatients) {
      params = params.set("vaccinationPatients", data.vaccinationPatients);
    }
    if (data.vaccinatedDate) {
      params = params.set("vaccinatedDate", data.vaccinatedDate);
    }
    if (data.vaccinationDose) {
      params = params.set("vaccinationDose", data.vaccinationDose);
    }
    if (data.searchString != null) {
      params = params.set("searchString", data.searchString);
    }
    try {
      return this.http
        .get(this.baseUrl + "patient/active", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* get patienttestsCounts list */

  getPatientsTestsCountsList(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);

    if (data.testsStatus) {
      params = params.set("testsStatus", data?.testsStatus);
    }
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    if (data.startDate) {
      params = params.set("startDate", data.startDate);
    }
    if (data.endDate) {
      params = params.set("endDate", data.endDate);
    }
    if (data.searchString) {
      params = params.set("searchString", data.searchString);
    }
    if (data?.isLabAssignPatients) {
      params = params.set("isLabAssignPatients", data.isLabAssignPatients);
    }
    if (data?.category) {
      params = params.set("category", data.category);
    }

    try {
      return this.http
        .get(this.baseUrl + "patient/patientsTestsCount", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  services for test result master */

  saveTestMaster(data: Object) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "test-result", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  get patient By Pid */
  getPatientsbyPId(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `patient/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  // /*  get patient By Pid */
  // getReferralPatients(id): Observable<any> {
  //   let access_token = localStorage.getItem('user_token');
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', "Bearer " + access_token);
  //   try {
  //     return this.http.get(this.baseUrl + `patient-tests/referral/${id}`, { headers: headers })
  //       .pipe(catchError(this.handleError));
  //   } catch (error) {
  //     return error;
  //   };
  // }

  getReferralPatients(data, id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.id) {
      params = params.set("id", data.id);
    }
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + `patient-tests/referral/${id}`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  add vaccine details By Pid */
  vaccineInsert(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `patient/vaccine`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*  add patient details By Pid */
  addpatientsdetilsBypid(patientId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient-details/${patientId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  add patient tests By Pid */
  addpatientsTestsBypid(patientId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient-tests/${patientId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* patient test update */

  updatePatientTestByPid(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `patient-tests/tests`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* patient test delete */

  deletePatientTestById(testId: string): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `patient-tests/${testId}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  add patient MedicalHistory By Pid */
  addpatientsMedicalHistoryBypid(patientId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient-medical-history/${patientId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  add patient family-history By Pid */
  addpatientsFamilyHistoryBypid(patientId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient-family-history/${patientId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*  add patient doctor Reviews By Pid */
  addpatientsDoctorReviewsBypid(patientId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient-reviews/${patientId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* patient doctor reviews update */

  updatePatientDoctorReviewsByPid(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `patient-reviews/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*  add patient document By Pid */
  addpatientsDocumentsBypid(patientId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient/documents/${patientId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*   get patient Documents  */
  getPatientDocuments(patientId) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `patient/documents/${patientId}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  // /test
  getTest(data) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    // if (data) {
    //   params = params.set('searchString', data)
    // }
    if (data?.testMaster) {
      params = params.set("testMaster", data?.testMaster);
    }

    try {
      let params = new HttpParams();
      params = params.set("testMaster", "true");
      return this.http
        .get(this.baseUrl + "test", { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get test by id */
  getTestsById(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* Delete TestsById */
  deleteTestsById(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `test/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*technician search */

  getDDTechnicians(search): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("role", "dd-technician").set("search", search);
    try {
      return this.http
        .get(this.baseUrl + "user", { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  technicianAssign(data: any): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "technician/assign", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  // /test
  getSearchTestsPackages(search, id) {
    console.log("hospitalId", id);
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    if (search) {
      params = params.set("searchString", search);
      params = params.set("id", id);
    }
    console.log(params);

    try {
      return this.http
        .get(this.baseUrl + "test/searchTestsPackages", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updateTestMaster(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `test/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  // /* get Company */
  // getPatientsDataBySearch(search): Observable<any> {
  //   let access_token = localStorage.getItem('user_token');
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', "Bearer " + access_token);
  //   let params = new HttpParams();
  //   params = params.set('searchString', search)
  //   try {
  //     return this.http.get(this.baseUrl + 'patient', { headers: headers, params: params })
  //       .pipe(map((resp) => resp));
  //   } catch (error) {
  //     return error;
  //   };
  // }

  // /test
  getTestAndSubTests() {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "test/testsStructure", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  // getTemplateLabels
  getTemplateLabels() {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "test/template/label", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  patient generate-pid   */
  getgeneratePid(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "patient/generate-pid", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  // ​/questionnaire-section

  /* add questionnaire-section */
  addquestionnaireSection(data: Object) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "questionnaire-section", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get questionary */
  getQuestionnaireSection(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "questionnaire-section", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* questionnaire-section update */

  updateQuestionnaireSectionid(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `questionnaire-section/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* Delete questionnaire-section */
  deleteQuestionarySectionid(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `questionnaire-section/${id}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* add questionary */
  addQuestionary(data: Object) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "questionnaire", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get questionary */
  getQuestionary(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "questionnaire", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* Delete Questionary */
  deleteQuestionary(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `questionnaire/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* Update Questionary */
  updateQuestionary(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `questionnaire/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* department services */

  /* save department */
  saveDepart(data: Object) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "department", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* get departments */
  getDepartments(): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http
        .get(this.baseUrl + "department", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get departments */
  getDepartmentsList(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + "department", { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update departments */
  updateDepartments(id, data) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `department/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* delete departments */
  deleteDepartments(id) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `department/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* test master services */

  /* save test service */
  saveTest(data: Object) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "test", data, { headers })
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }
  // /test/actualTests

  getActualTests(search): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("searchString", search);
    try {
      return this.http
        .get(this.baseUrl + "test/actualTests", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* save bulk test results */

  saveBulkResult(data: Object) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "patient/test-results", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*   test-package  */

  /* add test-package*/
  addTestPackages(data: Object) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "test-package", data, { headers })
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  /* get test-package */
  getTestPackages(data) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + "test-package", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get test-package */
  getTestPackagesById(id) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-package/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update TestPackages */
  updateTestPackages(id, data) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `test-package/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* delete TestPackages */
  deleteTestPackages(id) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `test-package/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get default test-package */
  getDefaultTestPackages() {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-package/defaultPackage`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* add userQuestionnaire   */
  adduserQuestionnaire(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "userQuestionnaire", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getQuestionarieByPid(id) {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http.get(this.baseUrl + `userQuestionnaire/${id}`, {
        headers,
      });
      // .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get tests service */
  // getTest(){
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization',"Bearer " + this.access_token);
  //   try {
  //    return this.http.get(this.baseUrl + 'test' , {headers: headers})
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public getCollections(data): Observable<any> {
    console.log(data, "dataaa");

    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    if (data.start !== undefined && data.start != null) {
      params = params.set("start", data.start).set("limit", data.limit);
    }
    if (data.id) {
      params = params.set("id", data.id);
    }
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    if (data?.status) {
      params = params.set("status", data.status);
    }
    if (data?.sampleDate) {
      params = params.set("sampleDate", data.sampleDate);
    }
    try {
      return this.http
        .get(this.baseUrl + `patient-tests/${data.status}`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* for samples collectd */

  public moveToSamplesCollectd(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "patient-tests/samplesCollected", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* for samples AssignedToTechnician */

  public moveToSampleAssignedToTechnician(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "patient-tests/sampleAssignedToTechnician", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  public moveToSampleCollectedTechnician(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "patient-tests/sampleCollectedByTechnician", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* for samples received */
  public moveToSamplesReceived(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "patient-tests/samplesReceived", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* For test master list */

  getTestMasterList(data) {
    console.log({ data });

    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + "test/testsStructure", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  update testResult settings */

  updateTestResultMaster(id, data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `test-result/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  update testResult settings */

  updateTestResultTemplate(id, data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `test-result-templates/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update possible test result */

  addNewPossibleTestResult(id, data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `possible-test-result/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updatePossibleTestResults(id, data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `possible-test-result/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  deletePossibleTestResults(id): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `possible-test-result/${id}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update Test Result Reference ranges */

  addNewRefRange(id, data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `test-result-reference-range/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  updateRefRanges(id, data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `test-result-reference-range/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  deleteRefRanges(id): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `test-result-reference-range/${id}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getTestResultMasterDetailsByID(id): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-result/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getTechnicianSlots(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("technicianId", data.id).set("status", data.status);
    try {
      return this.http
        .get(this.baseUrl + `technician/slots`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  technicianVaccineSlots(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("technicianId", data.id).set("status", data.status);
    try {
      return this.http
        .get(this.baseUrl + `technician/vaccineSlots`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  removeTechnicianSlots(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `technician/removeFromList`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getRiderSlots(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("riderId", data.id).set("status", data.status);
    try {
      return this.http
        .get(this.baseUrl + `rider/slots`, { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  assignRider(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http
        .post(this.baseUrl + `rider/assign`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* add Bulk Patients And Results*/
  addBulkPatientsAndResults(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "patient/addBulkPatients", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* add Bulk Patients And Results in organization*/
  addBulkPatientsOrganization(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "patient/organizationBulkPatients", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* vaccine patients assign to technician */
  vaccinePatientAssignTechnician(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "technician/vaccineAssign", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  uploadReport(body: any): Observable<any> {
    try {
      return this.http
        .post(
          "https://testgeps.greenko.net/app/api/add_pdf_header_footer",
          body
        )
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  addressToLatLang(address: string): Observable<any> {
    try {
      return this.http.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.mapKey}`
      );
    } catch (error) {
      return error;
    }
  }

  /* cancel patient test */
  cancelPatientTest(data): Observable<any> {   
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "patient-tests/cancel", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*  Get user info  */
  getUserById(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + "user/userData", { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  downloadReport(data) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    const params = new HttpParams()
      .set("patientId", data.patientId)
      .set("isHeader", data.isHeader)
      .set("isReferralPatient", data.isReferralPatient)
      .set("subdivision_id", data?.subdivision_id)
      .set("promotionPage", data?.promotionPage)
      .set("customerPhone", data.customerPhone)
      .set("customerName", data.customerName)
      .set("type", data.type);
    console.log({ params });

    try {
      return this.http
        .get(this.baseUrl + `patient-tests/report/${data.testId}`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* create ftp  */
  createFtp(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "ftp/create", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* ftp upload */
  ftpUpload(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "ftp/upload_files", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* ftp upload */
  getFtpUploadedfiles(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);

    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    if (data.company_id) {
      params = params.set("company_id", data.company_id);
    }
    if (data.createdAt) {
      params = params.set("createdAt", data.createdAt);
    }
    if (data.created_by) {
      params = params.set("created_by", data.created_by);
    }
    try {
      return this.http
        .get(this.baseUrl + "ftp/get_files", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get ftp  */
  getFtpData(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("start", data.start).set("limit", data.limit);
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    try {
      return this.http
        .get(this.baseUrl + `ftp`, { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  roles(): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `roles`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  menus(body: any): Observable<any> {
    console.log({ body });

    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    if (body?.subdivision_id) {
      params = params.set("subdivision_id", body.subdivision_id);
    }
    try {
      return this.http
        .get(this.baseUrl + `roles/menus/${body?.roleId}`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  addRemoveMenu(body): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "roles/menu", body, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  subdivisionUsers(data: any): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    if (data.subdivision) {
      params = params.set("subdivision", data.subdivision);
    }
    if (data?.role) {
      params = params.set("role", data.role);
    }

    try {
      return this.http
        .get(this.baseUrl + `user/subdivisions`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getOrganizationData(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("companyId", data.companyId);
    try {
      return this.http
        .get(this.baseUrl + `subdivision/${data.companyId}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  // patient/organizationBulkPatientsInvalidRecords/{subDivisionId}

  getInvalidBulkUploadData(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("subDivisionId", data.subDivisionId);
    try {
      return this.http
        .get(
          this.baseUrl +
            `patient/organizationBulkPatientsInvalidRecords/${data.subDivisionId}`,
          { headers }
        )
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  labAssign(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http
        .post(this.baseUrl + `patient/labAssign`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  transactions(data: any): Observable<any> {
    try {
      let headers = new HttpHeaders();
      const access_token = localStorage.getItem("user_token");
      headers = headers.set("Authorization", "Bearer " + access_token);
      let params = new HttpParams();
      params = params
        .set("start", data.start || 0)
        .set("limit", data.limit || 100);
      if (data.sortBy) {
        params = params
          .set("sortBy", data.sortBy)
          .set("sortOrder", data.sortOrder);
      }
      if (data.search) {
        params = params.set("search", data.search);
      }
      if (data.startDate) {
        params = params.set("fromDate", data.startDate);
      }
      if (data.endDate) {
        params = params.set("toDate", data.endDate);
      }
      return this.http
        .get(this.baseUrl + `transactions`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  downloadInvoice(data): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("invoiceId", data.invoiceId);
    params = params.set("isSendToMail", data.isSendToMail);
    params = params.set("emailAddress", data.emailAddress);
    params = params.set("type", data.type);
    params = params.set("customerPhone", data.customerPhone);
    params = params.set("customerName", data.customerName);
    params = params.set("b2b", data.b2b || "false");
    try {
      return this.http
        .get(this.baseUrl + "transactions/invoice", {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  createPaymentLink(data: any): Observable<any> {
    try {
      let headers = new HttpHeaders();
      const access_token = localStorage.getItem("user_token");
      headers = headers.set("Authorization", "Bearer " + access_token);

      return this.http
        .post(this.baseUrl + `transactions/createPaymentLink`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getPaymentTransactions(data: any): Observable<any> {
    try {
      let headers = new HttpHeaders();
      const access_token = localStorage.getItem("user_token");
      headers = headers.set("Authorization", "Bearer " + access_token);
      let params = new HttpParams();
      params = params.set("start", data.start).set("limit", data.limit);
      if (data.sortBy) {
        params = params
          .set("sortBy", data.sortBy)
          .set("sortOrder", data.sortOrder);
      }
      if (data.searchString) {
        params = params.set("searchString", data.searchString);
      }
      if (data.startDate) {
        params = params.set("startDate", data.startDate);
      }
      if (data.endDate) {
        params = params.set("endDate", data.endDate);
      }
      if (data.paymentType) {
        params = params.set("paymentType", data.paymentType);
      }
      return this.http
        .get(this.baseUrl + `transactions/paymentTransactions`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getAllCategories(): Observable<any> {
    let headers = new HttpHeaders();
    const access_token = localStorage.getItem("user_token");
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http
        .post(this.baseUrl + `subdivision/category`, {}, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*  For Session Handling */

  handleError(error) {
    let errorMessage = "";
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
      icon: "warning",
      confirmButtonText: "ok",
    }).then((result) => {
      if (errorMessage === "Unauthorized") {
        console.log("suresh");
        // localStorage.removeItem('user_token')
        this.router.navigateByUrl("/session/signIn");
        // localStorage.removeItem('user_details')
      }
    });
    return throwError(errorMessage);
  }
}
