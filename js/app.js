var myApp = angular.module('myApp', ['ngRoute'])

//ng-route config
.config(function ($routeProvider, $locationProvider){
	$routeProvider
		.when('/contacts', {
			templateUrl: '/html/contact.html',
		})
		.when('/contact-info/:contact_id', {
			templateUrl: '/html/contact_info.html',
			controller: 'ContactInfoController'
		})
		.when('/add', {
		  templateUrl: '/html/contact_form.html',
		  controller: 'AddContactController'
		})
		.when('/edit/:contact_id', {
		  templateUrl: '/html/contact_form.html',
		  controller: 'EditContactController'
		})
		.when('/database', {
		  templateUrl: '/html/database.html',
		  controller: 'DatabaseController'
		})
		.otherwise({redirectTo: '/contacts'});
})

.controller('ContactInfoController', function ($scope, $routeParams){
	var id = $routeParams.contact_id;
	$scope.currentContact = $scope.$parent.getContact(id);
	$scope.removeContact = function(contact, $event){
		$scope.$parent.removeContact(contact, $event);  
	}
})

.controller('AddContactController', function ($scope, $location, helperService) {
    $scope.path = $location.path();
    $scope.currentContact = {};
    $scope.addContact = function(){
	    if (helperService.validateContact($scope.currentContact)) {
			$scope.$parent.addContact($scope.currentContact);  
		} else {
			$scope.$parent.alert = {type: 'alert-danger', message: 'Some fields is invalid.'};  
		}
	}
})

.controller('EditContactController', function ($scope, $routeParams, $location, helperService){
	var id = $routeParams.contact_id;
	$scope.currentContact = $scope.$parent.getContact(id);
	
	$scope.updateContact = function(){
		if (helperService.validateContact($scope.currentContact)) {
			$scope.$parent.updateContact($scope.currentContact);  
		} else {
			$scope.$parent.alert = {type: 'alert-danger', message: 'Some fields is invalid.'};  
		}
	}
})

.controller('DatabaseController', function ($scope, $routeParams, contactService, $location){
	$scope.databaseName = localStorage.getItem('databaseName');
	$scope.saveConfigDatabase = function(){
		contactService.saveConfigDatabase($scope.databaseName);
		$scope.$parent.alert = {type: 'alert-success', message: 'Change database successfully. Please refresh page to apply this change.'};  
	}
});
