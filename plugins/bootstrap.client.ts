// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/dist/js/bootstrap.bundle';
// export default defineNuxtPlugin(() => {})
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('bootstrap', bootstrap);
  });
// export default {}