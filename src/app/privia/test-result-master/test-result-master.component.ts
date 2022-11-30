/// <reference types="@types/ckeditor" />
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { HealthService } from "./../../service/health.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AdminService } from "src/app/service/admin.service";
// import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { ClipboardService } from "ngx-clipboard";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { CKEditorComponent } from "ng2-ckeditor";

@Component({
  selector: "app-test-result-master",
  templateUrl: "./test-result-master.component.html",
  styleUrls: ["./test-result-master.component.scss"],
})
export class TestResultMasterComponent implements OnInit {
  name = "ng2-ckeditor";
  ckeConfig: CKEDITOR.config;
  mycontent: string;
  log: string = "";
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  modules = {};
  content: any = "";
  options: any;
  menu:any;
  selectedData: any;
  showUploadBtnFlag = false;
  resultTypes = [
    { name: "numeric", id: 1 },
    { name: "calculated", id: 2 },
    { name: "pick-list", id: 3 },
    { name: "culture", id: 4 },
    { name: "template", id: 5 },
    { name: "heading", id: 6 },
  ];

  public Editor = ClassicEditor;
  testResultMasterForm: FormGroup;
  possibleTestResultUpdateForm: FormGroup;
  testResultRefRangesEditForm: FormGroup;
  testDetails: any;
  templateContent: void;
  showUpdateBtn = false;
  closeResult = "";
  editPossibleTestResultItem: any;
  editTestResultRefRangeItem: any;
  departments: any;
  materialName: any;
  formulaTest: any;
  operator: any;
  materials: any = [];
  formula: any = [];
  operators: any = [];
  templateType: any;
  templateTest$: any = [];
  testResultTemplates$: any = [];
  selectedPreviousTemplate: any;
  isshown: boolean = false;
  isshown1 = false;
  isshown2 = false;
  isShowFormula = false;

  constructor(
    private health: HealthService,
    private adminService: AdminService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _clipboardService: ClipboardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.getpatients();
    this.mycontent = `<p>My html content</p>`;
    this.loadQuillModules();
    this.loadTestResultMasterForm();
    this.getDepartments();
    this.getTemplateLabels();
    this.getResultUnit();
    this.getFormulaTest();
    this.getOperators();
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: "divarea",
      forcePasteAsPlainText: true,
      removePlugins: "exportpdf",
    };
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  openInvoiceModel(dialogContent) {
    const dialogRef = this.dialog.open(dialogContent, {
      width: "40%",
      data: {},
    });
  }

  addmedicalHistoryItem(): void {
    (this.testResultMasterForm.get("medicalHistory") as FormArray).push(
      this.medicalHistoryDetailsForm()
    );
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "300",
    maxHeight: "auto",
    width: "auto",
    minWidth: "auto",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  loadQuillModules() {
    this.modules = {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }],
        // [{ 'labels': ['name', 'testName', 'result', 'comments'] }],  // custom dropdown
        // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button

        ["link", "image", "video"], // link and image, video
      ],
    };
  }

  getDepartments() {
    this.health.getDepartments().subscribe((res) => {
      this.departments = res.data.departments;
      console.log("departments", this.departments);
    });
  }

  createMaterialType() {
    console.log(this.materialName);
    const params = {
      materialName: this.materialName,
    };
    this.adminService.createResultUnit(params).subscribe(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.dialog.closeAll();
          this.materialName = null;
          this.getResultUnit();
        }
      },
      (err) => {
        Swal.fire({
          title: "Already Exits",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  createFormulaTest() {
    console.log(this.formulaTest);
    const params = {
      formulaTest: this.formulaTest,
    };
    this.adminService.createFormulaTest(params).subscribe(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.dialog.closeAll();
          this.formulaTest = null;
          this.getFormulaTest();
        }
      },
      (err) => {
        Swal.fire({
          title: "Already Exits",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  createOperator() {
    console.log(this.operator);
    const params = {
      operator: this.operator,
    };
    this.adminService.createOperator(params).subscribe(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.dialog.closeAll();
          this.operator = null;
          this.getOperators();
        }
      },
      (err) => {
        Swal.fire({
          title: "Already Exits",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  getTemplateLabels() {
    this.health.getTemplateLabels().subscribe((res) => {
      if (res && res.statusCode === 200) {
        this.templateTest$ = res.data.templateLabels;
      }
    });
  }

  getResultUnit() {
    this.adminService.getResultUnit().subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.materials = resp.data;
      }
    });
  }

  getFormulaTest() {
    this.adminService.getFormulaTest().subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.formula = resp.data;
      }
    });
  }

  getOperators() {
    this.adminService.getOperators().subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.operators = resp.data;
      }
    });
  }

  copyLabel(text: any) {
    const format = " {{" + text.collectionName + "_" + text.name + "}} ";
    this._clipboardService.copy(format);
  }

  loadTestResultMasterForm() {
    this.testResultMasterForm = this.fb.group({
      templateType: [null],
      templateContent: [null],
      test: [""],
      testName: [""],
      subTest: [null],
      resultType: [null],
      resultUnit: [null],
      noOfDecimals: [null],
      panicLaw: [null],
      panicHigh: [null],
      noResult: [false],
      attachImage: [false],
      editReferenceRange: [false],
      printBlankPage: [false],
      separate: [false],
      referenceRange: [null],
      notes: [null],
      possibleTestResults: this.fb.array([this.loadPossibleTestResults()]),
      testResultReferenceRanges: this.fb.array([
        this.loadTestResultRefRanges(),
      ]),
      medicalHistory: this.fb.array([this.medicalHistoryDetailsForm()]),
      testResultTemplates: this.fb.array([this.loadTestResultTemplates()]),
    });
  }

  loadPossibleTestResults(): FormGroup {
    return this.fb.group({
      result: [null],
      comments: [null],
      isAbnormal: [false],
      isDefault: [false],
    });
  }

  medicalHistoryDetailsForm(): FormGroup {
    return this.fb.group({
      medicine: [""],
    });
  }
  loadTestResultRefRanges(): FormGroup {
    return this.fb.group({
      gender: ["both"],
      fromAge: [null],
      fromAgeUnit: [null],
      toAge: [null],
      toAgeUnit: [null],
      fromValue: [null],
      toValue: [null],
      refRange: [null],
      panicLow: [null],
      panicHigh: [null],
    });
  }

  loadTestResultTemplates(): FormGroup {
    return this.fb.group({
      template: [null],
    });
  }

  getActualTests(event) {
    // this.loadTestResultMasterForm()
    const value = (event.target as HTMLInputElement).value;
    console.log("value", value);
    if (value) {
      this.health.getActualTests(value).subscribe((res) => {
        this.options = res.data.tests;
        console.log("tests", res);
      });
    } else {
      this.options = [];
    }
  }
  removePossibleTestResult(index) {
    console.log("removePossibleTestResult index", index);
    (
      this.testResultMasterForm.get("possibleTestResults") as FormArray
    ).removeAt(index);
  }

  removeTestResultRefRange(index) {
    (
      this.testResultMasterForm.get("testResultReferenceRanges") as FormArray
    ).removeAt(index);
  }

  testResultMasterData(event) {
    let testObj = this.options.find((option) => option.displayName === event);
    if (!testObj) {
      return;
    }
    this.adminService.testResultMasterByTestID(testObj._id).subscribe((res) => {
      if (res.data?._id != null || res.data?._id !== undefined) {
        this.showUpdateBtn = true;
      } else {
        this.showUpdateBtn = false;
      }

      if (res?.data !== null) {
        this.testDetails = res?.data;
        const data = res?.data;
        if (data.resultType === "template") {
          this.showUploadBtnFlag = true;
        }
        this.testResultTemplates$ = this.testDetails?.testResultTemplates;
        this.patchFormValues();

        // this.testResultMasterForm.setControl('possibleTestResults', this.setPossibleTestResults(res?.data.possibleTestResults));
        // this.testResultMasterForm.setControl('testResultReferenceRanges', this.setTestResultRefRange(res?.data.testResultReferenceRanges));
        // this.testResultMasterForm.setControl('testResultTemplates', this.setTestResultTemplate(res?.data.testResultTemplates));
      } else {
        this.loadTestResultMasterForm();
        this.showUploadBtnFlag = false;
        this.testDetails = {};
        this.testResultMasterForm.patchValue({
          test: testObj._id,
          testName: testObj.name,
        });
      }
    });
  }

  patchFormValues() {
    console.log(this.testDetails);

    this.testResultMasterForm.patchValue({
      templateContent: this.testDetails.template,
      test: this.testDetails.test,
      testName: this.testDetails.testInfo[0].name,
      subTest: this.testDetails.subTest,
      resultType: this.testDetails.resultType,
      resultUnit: this.testDetails.resultUnit,
      noOfDecimals: this.testDetails.noOfDecimals,
      panicLaw: this.testDetails.panicLaw,
      panicHigh: this.testDetails.panicHigh,
      noResult: this.testDetails.noResult,
      attachImage: this.testDetails.attachImage,
      editReferenceRange: this.testDetails.editReferenceRange,
      printBlankPage: this.testDetails.printBlankPage,
      separate: this.testDetails.separate,
      referenceRange: this.testDetails.referenceRange,
      notes: this.testDetails.notes,
      templateType: this.templateType,
    });
  }

  selectPreviousTemplate(selectedTemplate) {
    console.log(selectedTemplate);
    this.selectedPreviousTemplate = selectedTemplate;
    this.testResultMasterForm.patchValue({
      templateType: selectedTemplate.templateType,
      templateContent: selectedTemplate.template,
    });
  }

  setPossibleTestResults(possibleTestResults): FormArray {
    console.log("setPossibleTestResults", possibleTestResults);
    const formArray = new FormArray([]);
    possibleTestResults.forEach((element) => {
      formArray.push(
        this.fb.group({
          result: element.result,
          comments: element.comments,
          isAbnormal: element.isAbnormal,
          isDefault: element.isDefault,
        })
      );
    });
    return formArray;
  }

  setTestResultRefRange(testResultRefRanges): FormArray {
    const formArray = new FormArray([]);
    testResultRefRanges.forEach((element) => {
      formArray.push(
        this.fb.group({
          gender: element.gender,
          fromAge: element.fromAge,
          fromAgeUnit: element.fromAgeUnit,
          toAge: element.toAge,
          toAgeUnit: element.toAgeUnit,
          fromValue: element.fromValue,
          toValue: element.toValue,
          refRange: element.refRange,
          panicLow: element.panicLow,
          panicHigh: element.panicHigh,
        })
      );
    });
    return formArray;
  }

  setTestResultTemplate(testResultTemplate): FormArray {
    const formArray = new FormArray([]);
    testResultTemplate.forEach((element) => {
      formArray.push(
        this.fb.group({
          templateContent: element.template,
        })
      );
    });
    return formArray;
  }

  showUpload(e) {
    console.log("event123", e.value);
    if (e.value === "template") {
      this.showUploadBtnFlag = true;
    } else {
      this.showUploadBtnFlag = false;
    }
    if (e.value === "numeric") {
      this.isshown1 = true;
      this.isshown = false;
      this.isshown2 = false;
      this.isShowFormula = false;
      this.testResultMasterForm.get("resultUnit").enable();
      this.testResultMasterForm.get("noOfDecimals").enable();
      this.testResultMasterForm.get("panicLaw").enable();
      this.testResultMasterForm.get("panicHigh").enable();
      this.testResultMasterForm.get("referenceRange").enable();
      this.testResultMasterForm.get("notes").enable();
    }
    if (e.value === "calculated") {
      this.isshown1 = true;
      this.isshown = false;
      this.isshown2 = false;
      this.isShowFormula = true;
      this.testResultMasterForm.get("resultUnit").enable();
      this.testResultMasterForm.get("noOfDecimals").enable();
      this.testResultMasterForm.get("panicLaw").enable();
      this.testResultMasterForm.get("panicHigh").enable();
      this.testResultMasterForm.get("referenceRange").enable();
      this.testResultMasterForm.get("notes").enable();
    }
    if (e.value === "pick-list") {
      this.isshown = true;
      this.isshown1 = false;
      this.isshown2 = false;
      this.isShowFormula = false;
      this.testResultMasterForm.get("resultUnit").enable();
      this.testResultMasterForm.get("noOfDecimals").disable();
      this.testResultMasterForm.get("panicLaw").disable();
      this.testResultMasterForm.get("panicHigh").disable();
      this.testResultMasterForm.get("referenceRange").enable();
      this.testResultMasterForm.get("notes").enable();
    }
    if (e.value === "culture") {
      this.isshown = false;
      this.isshown1 = false;
      this.isshown2 = false;
      this.isShowFormula = false;
      this.testResultMasterForm.get("resultUnit").disable();
      this.testResultMasterForm.get("noOfDecimals").disable();
      this.testResultMasterForm.get("panicLaw").disable();
      this.testResultMasterForm.get("panicHigh").disable();
      this.testResultMasterForm.get("referenceRange").disable();
      this.testResultMasterForm.get("notes").disable();
    }
    if (e.value === "template") {
      this.isshown2 = true;
      this.isshown = false;
      this.isshown1 = false;
      this.isShowFormula = false;
      this.testResultMasterForm.get("resultUnit").disable();
      this.testResultMasterForm.get("noOfDecimals").disable();
      this.testResultMasterForm.get("panicLaw").disable();
      this.testResultMasterForm.get("panicHigh").disable();
      this.testResultMasterForm.get("referenceRange").disable();
      this.testResultMasterForm.get("notes").enable();
    }
    if (e.value === "heading") {
      this.isshown = false;
      this.isshown1 = false;
      this.isshown2 = false;
      this.isShowFormula = false;
      this.testResultMasterForm.get("resultUnit").disable();
      this.testResultMasterForm.get("noOfDecimals").disable();
      this.testResultMasterForm.get("panicLaw").disable();
      this.testResultMasterForm.get("panicHigh").disable();
      this.testResultMasterForm.get("referenceRange").disable();
      this.testResultMasterForm.get("notes").disable();
    }
  }

  onFileChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      const fileName = event.target.files[i].name.split(".");
      const check = fileName.filter((item) => {
        return item.toUpperCase() === "DOCX" || item.toUpperCase() === "DOC";
      });
      if (check.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "File Should be in DOCX or DOC format",
        });
      } else {
      }
    }
  }

  possibleTestResult() {
    const testResult = this.testResultMasterForm.get(
      "possibleTestResults"
    ) as FormArray;
    testResult.push(
      new FormGroup({
        result: new FormControl(null),
        comments: new FormControl(null),
        isAbnormal: new FormControl(false),
        isDefault: new FormControl(false),
      })
    );
  }

  getPossibleFormArray() {
    return (this.testResultMasterForm.get("possibleTestResults") as FormArray)
      .controls;
  }

  referenceRange() {
    const refRange = this.testResultMasterForm.get(
      "testResultReferenceRanges"
    ) as FormArray;
    refRange.push(
      new FormGroup({
        gender: new FormControl("both"),
        fromAge: new FormControl(null),
        fromAgeUnit: new FormControl(null),
        toAge: new FormControl(null),
        toAgeUnit: new FormControl(null),
        fromValue: new FormControl(null),
        toValue: new FormControl(null),
        refRange: new FormControl(null),
        panicLow: new FormControl(null),
        panicHigh: new FormControl(null),
      })
    );
  }

  getRefRange() {
    return (
      this.testResultMasterForm.get("testResultReferenceRanges") as FormArray
    ).controls;
  }

  resultTemplate() {
    const resTemplate = this.testResultMasterForm.get(
      "testResultTemplates"
    ) as FormArray;
    resTemplate.push(
      new FormGroup({
        template: new FormControl(null),
      })
    );
  }

  getRefTemplate() {
    return (this.testResultMasterForm.get("testResultTemplates") as FormArray)
      .controls;
  }

  submit() {
    console.log("templateContent", this.testResultMasterForm.value);
    console.log("getPossibleFormArray", this.getPossibleFormArray());
    console.log(this.testDetails);
    const l1 = this.testDetails?.possibleTestResults
      ? this.testDetails?.possibleTestResults.length
      : 0;
    const l2 = this.testResultMasterForm.value.possibleTestResults
      ? this.testResultMasterForm.value.possibleTestResults.length
      : 0;
    const diff = Math.abs(l1 - l2);
    const lastPossibleTestResults =
      this.testResultMasterForm.value.possibleTestResults.slice(
        Math.max(l2 - diff, 0)
      );
    const l3 = this.testDetails?.testResultReferenceRanges
      ? this.testDetails?.testResultReferenceRanges.length
      : 0;
    const l4 = this.testResultMasterForm.value.testResultReferenceRanges
      ? this.testResultMasterForm.value.testResultReferenceRanges.length
      : 0;
    const diff1 = Math.abs(l3 - l4);
    const lastTestResultRefRanges =
      this.testResultMasterForm.value.testResultReferenceRanges.slice(
        Math.max(l4 - diff1, 0)
      );

    let testResultTemplates = [
      {
        templateType: this.testResultMasterForm.value.templateType,
        template: this.testResultMasterForm.value.templateContent,
      },
    ];
    console.log(this.selectedPreviousTemplate);

    if (this.selectedPreviousTemplate) {
      console.log("data");
      testResultTemplates = [];
      this.updateTestResultTemplate();
    }

    const formData: any = {
      test: this.testResultMasterForm.value.test,
      // testName: this.testResultMasterForm.value.test,
      subTest: this.testResultMasterForm.value.subTest,
      resultType: this.testResultMasterForm.value.resultType,
      resultUnit: this.testResultMasterForm.value.resultUnit,
      noOfDecimals: this.testResultMasterForm.value.noOfDecimals,
      panicLaw: this.testResultMasterForm.value.panicLaw,
      panicHigh: this.testResultMasterForm.value.panicHigh,
      noResult: this.testResultMasterForm.value.noResult,
      attachImage: this.testResultMasterForm.value.attachImage,
      editReferenceRange: this.testResultMasterForm.value.editReferenceRange,
      printBlankPage: this.testResultMasterForm.value.printBlankPage,
      separate: this.testResultMasterForm.value.separate,
      referenceRange: this.testResultMasterForm.value.referenceRange,
      notes: this.testResultMasterForm.value.notes,
      possibleTestResults: lastPossibleTestResults,
      testResultReferenceRanges: lastTestResultRefRanges,
      testResultTemplates: testResultTemplates,
    };
    if (this.testResultMasterForm.value.resultType === "templete") {
      formData.template = this.testResultMasterForm.value.templateContent;
    }
    console.log("req123", formData);
    // this.testResultMasterForm.reset()
    // this.loadTestResultMasterForm()
    console.log("..", this.testResultMasterForm.value);
    this.health.saveTestMaster(formData).subscribe((res) => {
      console.log("=================>>??", res);
      if (res.statusCode === 200) {
        Swal.fire({
          title: "WelCome!",
          text: `${res?.message}`,
          icon: "success",
          confirmButtonText: "ok",
        }).then((result) => {});
      }
    });
  }

  // changeEditorContent({ editor }: ChangeEvent) {
  //   const data = editor.getData();
  //   console.log('editor data', data);
  // }

  updateTestResultSettings() {
    const id = this.testDetails._id;
    let testResultTemplates = [
      {
        templateType: this.testResultMasterForm.value.templateType,
        template: this.testResultMasterForm.value.templateContent,
      },
    ];
    if (this.selectedPreviousTemplate) {
      console.log("data");
      testResultTemplates = [];
      this.updateTestResultTemplate();
    }
    const req = {
      resultType: this.testResultMasterForm.value.resultType,
      template: this.testResultMasterForm.value.templateContent,
      resultUnit: this.testResultMasterForm.value.resultUnit,
      noOfDecimals: this.testResultMasterForm.value.noOfDecimals,
      panicLaw: this.testResultMasterForm.value.panicLaw,
      panicHigh: this.testResultMasterForm.value.panicHigh,
      noResult: this.testResultMasterForm.value.noResult,
      attachImage: this.testResultMasterForm.value.attachImage,
      editReferenceRange: this.testResultMasterForm.value.editReferenceRange,
      printBlankPage: this.testResultMasterForm.value.printBlankPage,
      separate: this.testResultMasterForm.value.separate,
      referenceRange: this.testResultMasterForm.value.referenceRange,
      notes: this.testResultMasterForm.value.notes,
      possibleTestResults: this.testResultMasterForm.value.possibleTestResults,
      testResultReferenceRanges:
        this.testResultMasterForm.value.testResultReferenceRanges,
      testResultTemplates: testResultTemplates,
    };
    console.log("updateData req", req);
    this.health.updateTestResultMaster(id, req).subscribe((resp) => {
      console.log("updateTestResultMaster resp", resp);
      if (resp.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: `${resp.message}`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.getResultsByID();
          }
        });
      }
    });
  }

  editPossibleTestResult(content, item) {
    console.log("editPossibleTestResult item", item);
    this.editPossibleTestResultItem = item;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.loadPossibleTestResultEditForm(item);
  }

  loadPossibleTestResultEditForm(item) {
    this.possibleTestResultUpdateForm = this.fb.group({
      editPossibleTestResult: item.result,
      editComments: item.comments,
      editIsAbnormal: item.isAbnormal,
      editIsDefault: item.isDefault,
    });
  }

  editTestResultRefRange(content1, item) {
    console.log("editTestResultRefRange item", item);
    this.editTestResultRefRangeItem = item;
    this.modalService
      .open(content1, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.loadRefRangesEditForm(item);
  }

  loadRefRangesEditForm(item) {
    this.testResultRefRangesEditForm = this.fb.group({
      editGender: [null],
      editFromAge: [null],
      editFromAgeUnit: [null],
      editToAge: [null],
      editToAgeUnit: [null],
      editFromValue: [null],
      editToValue: [null],
      editRefRange: [null],
      editPanicLow: [null],
      editPanicHigh: [null],
    });
    if (item != null || item !== undefined) {
      this.possiblePatchValues(item);
    }
  }

  possiblePatchValues(item) {
    this.testResultRefRangesEditForm.patchValue({
      editGender: item.gender,
      editFromAge: item.fromAge,
      editFromAgeUnit: item.fromAgeUnit,
      editToAge: item.toAge,
      editToAgeUnit: item.toAgeUnit,
      editFromValue: item.fromValue,
      editToValue: item.toValue,
      editRefRange: item.refRange,
      editPanicLow: item.panicLow,
      editPanicHigh: item.panicHigh,
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  addPossibleTestResults() {
    const id = this.testDetails._id;
    const req = {
      possibleTestResults: this.testResultMasterForm.value.possibleTestResults,
    };
    this.health.addNewPossibleTestResult(id, req).subscribe((resp) => {
      console.log("addNewPossibleTestResult resp", resp);
      if (resp.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: `${resp.message}`,
        }).then((res) => {
          if (res.isConfirmed) {
            const arr = this.testResultMasterForm.controls
              .possibleTestResults as FormArray;
            arr.controls = [];
            this.possibleTestResult();

            this.getResultsByID();
          }
        });
      }
    });
  }

  addTestResultRefRanges() {
    const id = this.testDetails._id;
    const req = {
      testResultReferenceRange:
        this.testResultMasterForm.value.testResultReferenceRanges,
    };
    this.health.addNewRefRange(id, req).subscribe((resp) => {
      console.log("addNewPossibleTestResult resp", resp);
      if (resp.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: `${resp.message}`,
        }).then((res) => {
          if (res.isConfirmed) {
            const arr = this.testResultMasterForm.controls
              .testResultReferenceRanges as FormArray;
            arr.controls = [];
            this.referenceRange();
            this.getResultsByID();
          }
        });
      }
    });
  }

  updatePossibleTestResults() {
    const id = this.editPossibleTestResultItem._id;
    console.log("123", this.editPossibleTestResultItem);
    const req = {
      // possibleTestResults: this.testResultMasterForm.value.possibleTestResults,
      result: this.possibleTestResultUpdateForm.value.editPossibleTestResult,
      comments: this.possibleTestResultUpdateForm.value.editComments,
      isAbnormal: this.possibleTestResultUpdateForm.value.editIsAbnormal,
      isDefault: this.possibleTestResultUpdateForm.value.editIsDefault,
    };
    this.health.updatePossibleTestResults(id, req).subscribe((resp) => {
      console.log("updatePossibleTestResults resp", resp);
      Swal.fire({
        icon: "success",
        title: `${resp.message}`,
      }).then((result) => {
        if (result.isConfirmed) {
          // this.getDismissReason('Cross click');
          this.modalService.dismissAll();
          this.getResultsByID();
        }
      });
    });
  }

  updateTestResultRefRanges() {
    const id = this.editTestResultRefRangeItem._id;
    const req = {
      // testResultReferenceRanges: this.testResultMasterForm.value.testResultReferenceRanges,
      gender: this.testResultRefRangesEditForm.value.editGender,
      fromAge: this.testResultRefRangesEditForm.value.editFromAge,
      fromAgeUnit: this.testResultRefRangesEditForm.value.editFromAgeUnit,
      toAge: this.testResultRefRangesEditForm.value.editToAge,
      toAgeUnit: this.testResultRefRangesEditForm.value.editToAgeUnit,
      fromValue: this.testResultRefRangesEditForm.value.editFromValue,
      toValue: this.testResultRefRangesEditForm.value.editToValue,
      refRange: this.testResultRefRangesEditForm.value.editRefRange,
      panicLow: this.testResultRefRangesEditForm.value.editPanicLow,
      panicHigh: this.testResultRefRangesEditForm.value.editPanicHigh,
    };
    this.health.updateRefRanges(id, req).subscribe((resp) => {
      console.log("updatePossibleTestResults resp", resp);
      Swal.fire({
        icon: "success",
        title: `${resp.message}`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll();
          this.getResultsByID();
        }
      });
    });
  }

  deletePossibleTestResult(item) {
    Swal.fire({
      icon: "info",
      title: "Are you sure want to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        this.health.deletePossibleTestResults(item._id).subscribe((resp) => {
          console.log("deletePossibleTestResults resp", resp);
          if (resp.statusCode === 200) {
            Swal.fire({
              icon: "success",
              title: `${resp.message}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getResultsByID();
              }
            });
          }
        });
      }
    });
  }

  deleteTestResultRefRange(item) {
    Swal.fire({
      icon: "info",
      title: "Are you sure want to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        this.health.deleteRefRanges(item._id).subscribe((resp) => {
          console.log("deleteTestResultRefRange resp", resp);
          if (resp.statusCode === 200) {
            Swal.fire({
              icon: "success",
              title: `${resp.message}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getResultsByID();
              }
            });
          }
        });
      }
    });
  }

  getResultsByID() {
    const id = this.testDetails._id;
    this.health.getTestResultMasterDetailsByID(id).subscribe((res) => {
      console.log("getTestResultMasterDetailsByID resp", res);
      this.testDetails = res.data;
      this.patchFormValues();
    });
  }

  updateTestResultTemplate() {
    const reqObj = {
      templateType: this.testResultMasterForm.value.templateType,
      template: this.testResultMasterForm.value.templateContent,
    };

    this.health
      .updateTestResultTemplate(this.selectedPreviousTemplate._id, reqObj)
      .subscribe((res) => {
        console.log(res);
      });
  }

  clearDate() {
    this.testResultTemplates$ = null;
    this.selectedPreviousTemplate = null;
    this.selectedData = null;
    this.testResultMasterForm.patchValue({
      templateType: "",
      templateContent: "",
    });
  }
}
