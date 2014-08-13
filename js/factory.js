'user strict';

/* Factories */

angular.module('ContactsApp.factories', []).

factory('contactsServices', function($http) {

  var contactsAPI = {};

    contactsAPI.node = function (url) {
        var aws = true;
        var host = "http://localhost:3000/";
        if (aws) {
            host = "http://ebserv-env-mvfvjqxg2m.elasticbeanstalk.com/";
        }
        console.log(host+url);
        return $http.jsonp(host+url+"/?callback=JSON_CALLBACK");
       // return host;
    };

    contactsAPI.newContact = function (json) {
        var url = "contacts/create/"+json; //&json="+json;
        return this.node(url);
    };
    
    contactsAPI.updateContact = function (json) {
        var url = "contacts/update/"+json; //&json="+json;
        return this.node(url);
    };

    contactsAPI.retrieveContact = function (id) {
        var url = "contacts/retrieve/"+id;
        return this.node(url);
    };

    contactsAPI.searchContact = function (qstring) {
        var url = "contacts/search/"+qstring;
        return this.node(url);
    };
  
    contactsAPI.initApplication = function () {
        var url = "appinit";
        return this.node(url);
    };

  return contactsAPI;
});