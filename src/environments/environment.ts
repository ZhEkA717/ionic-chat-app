// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: "fire-chat-db",
    appId: "1:9121296116:web:09e5eb2d0c96ee44d6b8a1",
    databaseURL: "https://fire-chat-db-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "fire-chat-db.firebasestorage.app",
    apiKey: "AIzaSyDBKCPx_zgunIbYI1AqMOcXUPj8cxK8DN8",
    authDomain: "fire-chat-db.firebaseapp.com",
    messagingSenderId: "9121296116"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
