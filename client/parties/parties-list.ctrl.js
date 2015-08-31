angular.module('socially').controller('PartiesListCtrl', [
	'$rootScope',
	'$meteor',
	function($rootScope, $meteor) {

		this.parties = $meteor.collection(Parties);

		this.add = function(party) {
			party.owner=$rootScope.currentUser._id;
			this.parties.push(party);
		};

		this.remove = function(party) {
			// splice the array, old-school style
			// this.parties.splice(this.parties.indexOf(party), 1);

			// or use Meteor's helper function .remove(item)
			this.parties.remove(party);
		};

		this.removeAll = function() {
			// note w/o item remove nukes all documents in collection
			this.parties.remove();
		};
	}]);