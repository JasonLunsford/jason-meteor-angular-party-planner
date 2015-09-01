angular.module('socially').controller('PartiesListCtrl', [
	'$rootScope',
	'$meteor',
	function($rootScope, $meteor) {

		var that = this;

		that.page = 1;
		that.perPage = 3; 
		that.sort = { name: 1 };

		// this line is functionally equivolant to these two lines:
		// $meteor.subscribe('parties');
		// this.parties = $meteor.collection(Parties);
		that.parties = $meteor.collection(function() {
			return Parties.find({}, {
				sort: that.sort
			});
		});

		$meteor.subscribe('parties', {
			limit: parseInt(that.perPage),
			skip: parseInt((that.page - 1) * that.perPage),
			sort: that.sort
		});

		that.showMe = function() {
			//console.log($rootScope.currentUser._id);
		};

		that.remove = function(party) {
			// splice the array, old-school style
			// this.parties.splice(this.parties.indexOf(party), 1);

			// or use Meteor's helper function .remove(item)
			that.parties.remove(party);
		};

		that.removeAll = function() {
			// note w/o parameter remove will nuke all documents in collection
			// belonging to user (if user security set up)
			that.parties.remove();
		};

		that.pageChanged = function(newPage) {
			that.page = newPage;
		};

	}]);