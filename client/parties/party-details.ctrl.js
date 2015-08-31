angular.module('socially').controller('PartyDetailsCtrl', [
	'$scope',
	'$stateParams',
	'$meteor',
	'$state',
	function($scope, $stateParams, $meteor, $state) {

		// adding false as 3rd parameter prevents autosaving object on every change
		this.party = $meteor.object(Parties, $stateParams.partyId, false);

		this.save = function() {
			this.party.save().then(function(numberOfDocs) {
				console.log('doc '+numberOfDocs+' saved!');
				$state.go("parties");
			}, function(error) {
				console.log('save error: ', error);
			});
		};

		this.reset = function() {
			this.party.reset();
		};

		this.cancel = function() {
			$state.go("parties");
		};

	}]);