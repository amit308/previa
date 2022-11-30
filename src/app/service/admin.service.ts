import { EventEmitter, Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { CATCH_STACK_VAR } from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}
  private baseUrl: string = environment.url;
  /* add Company */
  createLabEmployees(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createLabEmployees", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
      //   map((resp) => resp));
    } catch (error) {
      return error;
    }
  }

  /* add user (frontOffice) */
  createUser(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createUser", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* add user (frontOffice) */
  createOrganizationUser(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createOrganizationAdmin", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update user  (front office, lab , labincharge,lab-technician) */
  updateUser(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/updateUser/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* update user  (front office, lab , labincharge,lab-technician) */
  updateOrganizationUser(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/updateOrganizationAdmin/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  // /user/updateDoctor/{id}

  /* update updateDoctor */
  updateDoctor(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/updateDoctor/${id}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* add subdivision  (branch location lab hospital) */
  addSubdivision(data): Observable<any> {
    console.log(data);
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "subdivision", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get subdivision  (branch location lab hospital) */
  getSubdivision(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    if (data.limit) {
      params = params.set("start", data.start).set("limit", data.limit);
    }

    if (data) {
      params = params.set("category", data.category);
    }
    if (data.sortBy) {
      params = params
        .set("sortBy", data.sortBy)
        .set("sortOrder", data.sortOrder);
    }
    if (data.search) {
      params = params.set("search", data.search);
    }
    try {
      return this.http
        .get(this.baseUrl + `subdivision/${data.companyId}`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* update subdivision  (branch location lab hospital) */
  updateSubdivision(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `subdivision/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* delete subdivision  (branch location lab hospital) */
  deleteSubdivision(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `subdivision/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*   add DoctorMaster  */
  addDoctorMaster(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createDoctor", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* get test packages By id(branch location lab hospital) */
  gettestpackagesByid(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-package/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  testResultMasterByID(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-result/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  testResultMasterByTestID(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-result/test/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updateTestResultMaster(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `test-result/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  deleteTestResultMaster(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `test-result/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* Possible test results */

  createPossibleTestResult(testResultId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `possible-test-result/${testResultId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updatePossibleTestResult(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
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

  deletePossibleTestResult(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.delete("Authorization", "Bearer " + access_token);
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

  /* Test Result reference range */

  createTestResultReferenceRange(testResultId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(
          this.baseUrl + `test-result-reference-range/${testResultId}`,
          data,
          { headers }
        )
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updateTestResultReferenceRange(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
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

  deleteTestResultReferenceRange(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.delete("Authorization", "Bearer " + access_token);
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

  /* for Template */

  createTestResultTemplate(testResultId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `test-result-templates/${testResultId}`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  updateTestResultTemplate(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
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

  deleteTestResultTemplate(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.delete("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `test-result-templates/${id}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /*techinican create */
  technicianData(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createTechincian", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*add rider */
  addRider(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + "user/createRider", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*technician update */
  technicianUpdate(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/techincian/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*rider update */
  riderUpdate(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/rider/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  // /*techinican List */
  // technicianList(data): Observable<any> {
  //   let access_token = localStorage.getItem('user_token');
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', "Bearer " + access_token);
  //   let params = new HttpParams();
  //   params = params.set('role', data.role)

  //   try {
  //     return this.http.get(this.baseUrl + 'user', { headers: headers, params: params })
  //   } catch (error) {
  //     return error;
  //   };
  // }

  technicianList(data): Observable<any> {
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

  usersList(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("role", data.role);
    try {
      return this.http
        .get(this.baseUrl + `user`, { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*riders List */
  ridersList(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("role", data.role);

    try {
      return this.http.get(this.baseUrl + "user", {
        headers,
        params,
      });
    } catch (error) {
      return error;
    }
  }

  /* get riders details */

  ridersListDetails(data): Observable<any> {
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

  /* delete techinican   */
  deleteTechnician(id): Observable<any> {
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

  /* delete rider   */
  deleteRider(id): Observable<any> {
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
  /* change password */

  updatePassword(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "user/password", data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* update profile*/
  editProfileData(id, data) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `user/updateUser/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /*Sub Lab List */
  getSublabDetails(companyId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("category", data.category);

    try {
      return this.http.get(this.baseUrl + `subdivision/${companyId}`, {
        headers,
        params,
      });
    } catch (error) {
      return error;
    }
  }

  /*Sub Lab List */
  getSubDetails(companyId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("category", data.category);

    try {
      return this.http.get(this.baseUrl + `subdivision/${companyId}`, {
        headers,
        params,
      });
    } catch (error) {
      return error;
    }
  }

  getBatchCounts(data, company): Observable<any> {
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
        .get(this.baseUrl + `patient/batches/${company}`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getInvalidRecordsByBatchId(bid): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `patient/batch/invalidrecords/${bid}`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  uploadBatchValidRecords(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .post(this.baseUrl + `patient/batch/validrecords`, data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  getBatchCountsByBatchId(bid): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `patient/batchcounts/${bid}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  getHeaderFooter(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .get(this.baseUrl + `test-result-templates/headerfooter`, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* ftp upload */
  headerFooterUpload(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + "test-result-templates/upload/headerfooter", data, {
          headers,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  riderSublabDetails(companyId, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    let params = new HttpParams();
    params = params.set("category", data.category);

    try {
      return this.http.get(this.baseUrl + `subdivision/${companyId}`, {
        headers,
        params,
      });
    } catch (error) {
      return error;
    }
  }

  createOrgTestStatus(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.post(this.baseUrl + `test/organizationstatus`, data, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  getRiderSamples(data): Observable<any> {
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

    if (data.slotDate) {
      params = params.set("slotDate", data.slotDate);
    }
    if (data.search) {
      params = params.set("search", data.search);
    }
    try {
      return this.http
        .get(this.baseUrl + `rider/selfSlots`, {
          headers,
          params,
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  /* get inventory */
  getInventory(data): Observable<any> {
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
    if (data.search) {
      params = params.set("search", data.search);
    }
    if (data.startDate) {
      params = params.set("startDate", data.startDate);
    }
    if (data.endDate) {
      params = params.set("endDate", data.endDate);
    }
    try {
      return this.http
        .get(this.baseUrl + `inventory`, { headers, params })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }

  /* add inventory */
  addInventory(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      console.log(data);

      return this.http.post(this.baseUrl + `inventory`, data, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  getMaterialTypes(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.get(this.baseUrl + `inventory/getMaterialTypes`, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  getResultUnit(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.get(this.baseUrl + `inventory/getResultUnit`, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  getFormulaTest(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.get(this.baseUrl + `inventory/getFormulaTest`, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  getOperators(): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.get(this.baseUrl + `inventory/getOperators`, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  createMaterialType(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.post(
        this.baseUrl + `inventory/createMaterialType`,
        data,
        {
          headers,
        }
      );
    } catch (error) {
      return error;
    }
  }

  createResultUnit(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.post(this.baseUrl + `inventory/createResultUnit`, data, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  createFormulaTest(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.post(
        this.baseUrl + `inventory/createFormulaTest`,
        data,
        {
          headers,
        }
      );
    } catch (error) {
      return error;
    }
  }

  createOperator(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      return this.http.post(this.baseUrl + `inventory/createOperator`, data, {
        headers,
      });
    } catch (error) {
      return error;
    }
  }

  deleteInventory(id): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .delete(this.baseUrl + `inventory/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  inventoryUpdate(id, data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http
        .put(this.baseUrl + `inventory/${id}`, data, { headers })
        .pipe(catchError(this.handleError));
    } catch (error) {
      return error;
    }
  }
  addBilling(data) {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);

    try {
      console.log(data);

      return this.http.post(
        this.baseUrl + `transactions/updateManualPayment`,
        data,
        { headers }
      );
    } catch (error) {
      return error;
    }
  }

  /* B2B Invoice */
  getB2BInvoiceInfo(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http.post(
        this.baseUrl + `transactions/b2bInvoice/info`,
        data,
        { headers }
      );
    } catch (error) {
      return error;
    }
  }
  createB2bInvoice(data): Observable<any> {
    const access_token = localStorage.getItem("user_token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + access_token);
    try {
      return this.http.post(
        this.baseUrl + `transactions/b2bCreateInvoice`,
        data,
        { headers }
      );
    } catch (error) {
      return error;
    }
  }

  getB2BInvoices(data: any): Observable<any> {
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
      if (data.search) {
        params = params.set("search", data.search);
      }
      if (data.fromDate) {
        params = params.set("fromDate", data.fromDate);
      }
      if (data.toDate) {
        params = params.set("toDate", data.toDate);
      }
      if (data.organization) {
        params = params.set("organization", data.organization);
      }
      return this.http
        .get(this.baseUrl + `transactions/b2bInvoices`, {
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

  /*  For Session Handling */

  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.error.message}`;
    }
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

  riderListUpdate = new EventEmitter<any>();
}
