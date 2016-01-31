
var app = angular.module('SampleD3App', [
  'ngRoute','ChartsDirModule', 'MainCtrlModule']);
//'MockApiModule',
//]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider /*, $locationProvider*/) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "MainCtrl"})

  // Pages
  .when("/bubble", {templateUrl: "partials/bubble.html", controller: "PageCtrl"})
 // .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
  //.when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
  .when("/help", {templateUrl: "partials/help.html", controller: "PageCtrl"})

  .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
    

}])
