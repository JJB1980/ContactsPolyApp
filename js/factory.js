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
        var fullUrl = host+url+"/?callback=JSON_CALLBACK";
        console.log(fullUrl);
        return $http.jsonp(fullUrl);
       // return host;
    };

    contactsAPI.newContact = function (json) {
        return this.node("contacts/create/"+json);
    };
    
    contactsAPI.updateContact = function (json) {
        return this.node("contacts/update/"+json);
    };

    contactsAPI.retrieveContact = function (id) {
        return this.node("contacts/retrieve/"+id);
    };

    contactsAPI.searchContact = function (qstring) {
        return this.node("contacts/search/"+qstring);
    };
  
    contactsAPI.initApplication = function () {
        return this.node("appinit");
    };

  return contactsAPI;
});