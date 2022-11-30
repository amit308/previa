// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { config } from "./../config";
export const environment = {
  production: false,
  // url: config.url,
 url: "https://dev.previahealth.in/api/", //  tHis is live url
  imageBaseUrl : config.doumentimageBaseurl,
  imageBaseUrl1 : config.imageUrl,
  testReportBaseurl:config.testReportBaseurl,
  invoiceImageUrl:config.invoiceImageUrl,

   //url:'http://139.59.16.224:3001/', // Ye local ki hai..usmein fir response nhi aegi
 

  mapApiKey: "AIzaSyBiTuyfeiLXpcg4s4vlscRanQ47uIHGuFk",

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
