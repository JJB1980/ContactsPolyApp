'use strict';

/* Services */

angular.module('ContactsApp.services', []).

service('API', function () {
  this.toJsonUri = function (jsonObj) {
    return this.toUri(angular.toJson(jsonObj));
  };
  this.toUri = function (str) {
    return encodeURIComponent(str);
  };
  this.isInt = function (n) {
    n = parseInt(n);
    return (Math.ceil(parseFloat(n)) === n);
  };
  this.isNum = function (n) {
    var ok = this.isInt(n);
    if (ok && n < 0) {
      ok = false;
    }
    console.log("n:"+n+"|"+ok);
    return ok;
  };
  this.val = function (id) {
    return this.elem(id).value;
  }
  this.elem = function (id) {
    return window.document.getElementById(id);
  }
  return this;
});