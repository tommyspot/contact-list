angular.module('myApp').service('contactService', function ($q) {
    var db;
	var databaseName = localStorage.getItem('databaseName');
	if(databaseName){
		db = new PouchDB(databaseName);
	} else {
		localStorage.setItem('databaseName', 'contacts');
		db = new PouchDB('contacts');	
	}
		
    this.getAll = function () {		
		var defer = $q.defer();
		db.allDocs({include_docs: true, descending: true}, function(err, doc) {
			var contacts = [];
			for(var docRow = 0; docRow < doc.rows.length; docRow++){
				contacts.push(doc.rows[docRow].doc); 
			}
			defer.resolve(contacts);
		});
		return defer.promise;
	};
	
	this.update = function (contactInfo) {		
		var defer = $q.defer();
			
		db.get(contactInfo._id).then(function(doc) {
		  return db.put({
			_id: contactInfo._id,
			_rev: contactInfo._rev,
			firstName: contactInfo.firstName,
			lastName: contactInfo.lastName,
			email: contactInfo.email,
			phone: contactInfo.phone,
			url: contactInfo.url,
			notes: contactInfo.notes
		  });
		}).then(function(result) {
		  // handle response
		  defer.resolve(result);
		}).catch(function (reason) {
		  //console.log(reason);
		  defer.reject(reason);
		});
		
		return defer.promise;
	};
	
	this.delete = function (contactInfo) {		
		var defer = $q.defer();
			
		db.get(contactInfo._id).then(function(doc) {
		  return db.remove(doc._id, doc._rev);
		}).then(function (result) {
		  // handle result
		  defer.resolve(result);
		}).catch(function (reason) {
		  //console.log(reason);
		  defer.reject(reason);
		});
		
		return defer.promise;
	};
	
	this.add = function (contactInfo) {		
		var defer = $q.defer();
			
		db.post(contactInfo).then(function (result) {
		  // handle response
		  defer.resolve(result);
		}).catch(function (reason) {
		  //console.log(reason);
		  defer.reject(reason);
		});
		
		return defer.promise;
	};
	
	//realtime service
	this.autoLoadingOnChanged = function(callback) {		
		db.changes({
			since: 'now',
			live: true
		}).on('change', callback);		
	}

	this.saveConfigDatabase = function(connectionString){
		localStorage.setItem('databaseName', connectionString);
		db = new PouchDB(connectionString);	
	}
});
