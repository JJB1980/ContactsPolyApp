'user strict';

/* Factories */

angular.module('ContactsApp.factories', []).

factory('contactsServices', function($http, $rootScope, $location, API) {

  var contactsAPI = {};

    contactsAPI.node = function (url) {
        var aws = false;
        var host = "http://localhost:3000/";
        if (aws) {
            host = "http://localhost:3000/";
        }
        console.log(host+url);
        return $http.jsonp(host+url);
       // return host;
    };

    contactsAPI.newContact = function (json) {
        var url = "contacts/create/"+json+"/?callback=JSON_CALLBACK"; //&json="+json;
        return this.node(url);
    };
    
    contactsAPI.updateContact = function (json) {
        var url = "contacts/update/"+json+"/?callback=JSON_CALLBACK"; //&json="+json;
        return this.node(url);
    };

    contactsAPI.retrieveContact = function (id) {
        var url = "contacts/retrieve/"+id+"/?callback=JSON_CALLBACK";
        return this.node(url);
    };

    contactsAPI.searchContact = function (qstring) {
        var url = "contacts/search/"+qstring+"/?callback=JSON_CALLBACK";
        return this.node(url);
    };
  
    contactsAPI.initApplication = function () {
        var url = "appinit/?callback=JSON_CALLBACK";
        return this.node(url);
    };

  return contactsAPI;
});