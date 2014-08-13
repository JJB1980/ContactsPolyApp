'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('ContactsApp', [
  'ContactsApp.controllers',
  'ContactsApp.services',
  'ContactsApp.factories',
  'ContactsApp.directives',
  'ngSanitize',
  'ng-polymer-elements',
  'ui.router',
  'ngAnimate'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home/");
  $stateProvider
    .state('details', {
      url: "/home/",
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .state('showid', {
      url: "/home/:id",
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .state('search', {
      url: "/search/",
      templateUrl: "partials/search.html",
      controller: "searchController"
    })
    .state('offline', {
      url: "/offline/",
      templateUrl: "partials/offline.html",
      controller: "applicationController"
    });
    
});

var _offline = false;

app.run(function ($rootScope, $timeout) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    //console.log(next);
    console.log("Page: "+next.name);
    if (next.name === "offline") {
      _offline = true;
    }
    if (_offline) {
      event.preventDefault();
      return;
    }
    //console.log("menu_"+next.name);
    var name = next.name;
    if (next.name === "showid") {
      name = "details";
    }
    $timeout(function () {
      var tabs = document.querySelector('#tabs');
      window._currentTab = name;
      tabs.selected = name;
      console.log("SelTab: "+tabs.selected);
    },200);
  });
});