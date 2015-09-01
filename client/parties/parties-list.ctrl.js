angular.module('socially').controller('PartiesListCtrl', [
	'$rootScope',
	'$meteor',
	function($rootScope, $meteor) {

		// this line is functionally equivolant to these two lines:
		// $meteor.subscribe('parties');
		// this.parties = $meteor.collection(Parties);
		this.parties = $meteor.collection(Parties).subscribe('parties');

		this.showMe = function(party) {
			//console.log($rootScope.currentUser._id);
		};

		this.remove = function(party) {
			// splice the array, old-school style
			// this.parties.splice(this.parties.indexOf(party), 1);

			// or use Meteor's helper function .remove(item)
			this.parties.remove(party);
		};

		this.removeAll = function() {
			// note w/o parameter remove will nuke all documents in collection
			// belonging to user (if user security set up)
			this.parties.remove();
		};
	}]);