'use strict';

/* Controllers */
angular.module('ContactsApp.controllers', ['ng-polymer-elements']).

controller('applicationController', function($scope, $rootScope, $timeout, contactsServices, API) {

	$scope.initApp = function () {
		contactsServices.initApplication().success(function (response) {
		}).error(function (response) {
			window.location = "#/offline/";
		});
	};
			
}).

controller('searchController', function($scope, $rootScope, $timeout, contactsServices, API) {

	
	$scope.runSearch = function () {
		var text = $scope.SearchText;
		console.log("Search Text: "+text);
		$.cookie("search-text", text, { expires: 100 });
		if (text === "") {
			$scope.resetResults();
			return;
		}
		contactsServices.searchContact(text).success(function (response) {
			$scope.SearchResults.Results = response.results;
			$scope.SearchResults.Count = response.resultsCount;
		});
	};

	$scope.selectContact = function (id) {
		console.log("Selected ID: "+id);
		window.location = "#/home/"+id;
	}
	
	$scope.resetResults = function () {
		$scope.SearchResults = {};
		$scope.SearchResults.Results = [];
		$scope.SearchResults.Count = 0;
	}
	
	$scope.resetResults();
	$scope.SearchText = $.cookie("search-text");
	$scope.runSearch();
}).

controller('homeController', function($scope, $rootScope, $stateParams, $timeout, contactsServices, API) {
	
	$scope.Action = {};
	$scope.Action.message = "";

	
	$scope.displayMessage = function (msg) {
		console.log("Message: "+msg);
		$scope.Action.message = msg;
		var el = document.querySelector('#messageToast');
		if (el) 
			el.show();	
	}
	
	$scope.saveContact = function () {
		console.log($scope.Contact.ID);
		$scope.Error.FirstName = false;
		$scope.Error.Surname = false;
		if ($scope.Contact.FirstName == "") {
			$scope.Error.FirstName = true;
		}
		if ($scope.Contact.Surname == "") {
			$scope.Error.Surname = true;
		}
		if ($scope.Error.FirstName || $scope.Error.Surname) {
			return
		}
		if ($scope.Contact.ID == "" || $scope.Contact.ID == undefined) {
			contactsServices.newContact(API.toJsonUri($scope.Contact)).success(function (response) {
				$scope.Contact.ID = response.ID;
				//alert(response.message);
				$scope.displayMessage(response.message);
			});
		} else {
			contactsServices.updateContact(API.toJsonUri($scope.Contact)).success(function (response) {
				//alert(response.message);
				$scope.displayMessage(response.message);
			});
		}
	}

	$scope.loadContact = function () {
		//console.log($scope.Contact);
		var id = $scope.Contact.ID;
		console.log("ID: "+id);
		if (id == "" || id == undefined)
			return;
		$scope.resetContact();
		contactsServices.retrieveContact(id).success(function (response) {
			if (response.status == "error") {
				//alert(response.message);
				$scope.displayMessage(response.message);
			}
			$scope.Contact = response.Contact;
		});
	}
	
	$scope.copyContact = function () {
		if ($scope.Contact.ID == "")
			return;
		$scope.Contact.ID = "";
		$scope.saveContact();
	}
	
	$scope.resetContact = function () {
		$scope.Contact = {};
		$scope.Contact.ID = "";
		$scope.Contact.FirstName = "";
		$scope.Contact.Surname = "";
		$scope.Contact.Email = "";
		$scope.Contact.DateOfBirth = "";
		$scope.Contact.Phone = "";
		$scope.Contact.Mobile = "";
		$scope.Error = {};
		$scope.Error.FirstName = false;
		$scope.Error.Surname = false;
	}
	
	$scope.clearContact = function () {
		$scope.resetContact();
	}
	
	$scope.resetContact();
	
	$scope.Contact.ID = $stateParams.id;

	$scope.loadContact();
	
});
  
