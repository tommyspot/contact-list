angular.module('myApp').controller('ContactController', function ($scope, contactService, $q, $location){	
	initHomePage = function() {
		contactService.getAll().then(function(result) {
				$scope.contacts = result;
				$scope.contactsView = groupingContact(result);			
			}, function(reason) {}
		);
	}
	
	groupingContact = function(contactList) {
		var groupingContacts = {};
		for(i = 0; i < contactList.length; i++){
			var letter = contactList[i].firstName ? contactList[i].firstName.charAt(0).toUpperCase() : '';
		    if( groupingContacts[letter] == undefined){
				groupingContacts[letter] = [];
		    }
			groupingContacts[letter].push(contactList[i]);
		}
		return groupingContacts;
	}
	
	initHomePage();
	contactService.autoLoadingOnChanged(initHomePage);
	
	$scope.removeContact = function (contact, $event) {
		$event.stopPropagation();
		contactService.delete(contact).then(function(result) {
				$location.path( "/contacts");
				$scope.alert = {type: 'alert-success', message: 'Remove contact successfully.'};
			}, function(reason) {
				$scope.alert = {type: 'alert-danger', message: 'Remove contact fail.'};
			}
		);
	};
	
	$scope.updateContact = function(contact) {
		contactService.update(contact).then(function(result) {
				$location.path( "/contact-info/" + contact._id);
				$scope.alert = {type: 'alert-success', message: 'Update contact successfully.'};
			}, function(reason) {
				$scope.alert = {type: 'alert-danger', message: 'Update contact fail.'};
			}
		);
	}
	
	$scope.addContact = function(contact) {
		contactService.add(contact).then(function(result) {
				$location.path( "/contacts");
				$scope.alert = {type: 'alert-success', message: 'Add contact successfully.'};
			}, function(reason) {
				$scope.alert = {type: 'alert-danger', message: 'Add contact fail.'};
			}
		);
	}
	
	$scope.editContact = function(contactId, $event) {
		$event.stopPropagation();
		$location.path( "/edit/" + contactId);
	}
	
	$scope.showContactInfo = function(contactId) {
		$location.path( "/contact-info/" + contactId);
	}

	$scope.closeMessage = function() {
		$scope.alert = null;		
	}
	
	$scope.getContact = function(id) {
		for(var i=0; i< $scope.contacts.length; i++){
			if($scope.contacts[i]._id === id) {
				return $scope.contacts[i];
			}
		}
		return null;
	}
});
