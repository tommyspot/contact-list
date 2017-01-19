angular.module('myApp').service('helperService', function ($q) {
    		
    this.validateContact = function (contact) {		
		if(contact.firstName == null || contact.firstName == ''){
			return false;
		}
		if(contact.phone == null || contact.phone == ''){
			return false;
		}
		return true;
	};
	
});