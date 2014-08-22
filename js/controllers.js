'use strict';

/* Controllers */
angular.module('ContactsApp.controllers', ['ng-polymer-elements','ngAnimate']).

controller('applicationController', function($scope, $location, $timeout, contactsServices) {

	$scope.initApp = function () {
		contactsServices.initApplication().success(function (response) {
		}).error(function () {			
			$timeout(function () {
				console.log("offline");
				window.location.assign("#/offline/");
			},500);
			//$location.path("#/offline/").replace();
			//$scope.$apply()
		});
	};
			
}).

controller('searchController', function($scope, $timeout, $location, contactsServices) {

	
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
		$timeout(function () {
			console.log("Selected ID: "+id);
			window.location.assign("#/home/"+id);
		},200);
		//$location.path("#/home/"+id).replace();
		//$scope.$apply()
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

controller('homeController', function($scope, $stateParams, contactsServices, API) {
	
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
		//console.log($scope.Contact.ID);
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
		console.log($scope.Contact);
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
		$scope.resetContact();
		if (id == "" || id == undefined)
			return;
		contactsServices.retrieveContact(id).success(function (response) {
			if (response.status == "error") {
				//alert(response.message);
				$scope.displayMessage(response.message);
			}
			console.log(response.Contact);
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
  
