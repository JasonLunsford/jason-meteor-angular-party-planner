/*
	A note on subscribe: .subscribe() is a service wrapper for Meteor.subscribe, populates the 
	client version of the mongoDB (called Minimongo), which is a record set (a subset) of the real
	collection located on the server. Clients get record sets when they subscribe to a collection.
*/
angular.module('socially').controller('PartyDetailsCtrl', [
	'$scope',
	'$stateParams',
	'$meteor',
	'$state',
	function($scope, $stateParams, $meteor, $state) {

		// adding false as 3rd parameter prevents autosaving object on every change
		// $meteor.object will find first object that matches 2nd argument ($stateParams.partyId)
		$scope.party = $meteor.object(Parties, $stateParams.partyId, false);

		// binding users object to the Meteor.users collection, and passing "false"
		// prevents changes in client from automatically propogating to Meteor collection.
		// $meteor.collection does not afford a built in query, unlike $meteor.object
		$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
		$scope.$meteorSubscribe('parties');

		$scope.invite = function(user) {
			$meteor.call('invite', $scope.party._id, user._id).then(
				function(data) {
					console.log('success inviting', data);
				},
				function(err) {
					console.log('failed', err);
				}
			);
		};

		$scope.save = function() {
			$scope.party.save().then(function(numberOfDocs) {
				console.log('doc '+numberOfDocs+' saved!');
				$state.go("parties");
			}, function(error) {
				console.log('save error: ', error);
			});
		};

		$scope.reset = function() {
			$scope.party.reset();
		};

		$scope.cancel = function() {
			$state.go("parties");
		};

	}]);