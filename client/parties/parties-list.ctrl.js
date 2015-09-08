// removed Controller As, replaced with $scope, to make dealing
// with sort/filtering/search easier. Improvement suggestion:
// refactor using Controller As / eliminating $scope

angular.module('socially').controller('PartiesListCtrl', [
	'$rootScope',
	'$meteor',
	'$scope',
	'$state',
	function($rootScope, $meteor, $scope, $state) {

		$scope.page = 1;
		$scope.perPage = 3; 
		$scope.sort = { name: 1 };
		$scope.orderProperty = '1';

		//$scope.$meteorSubscribe('users');
		$scope.users = $scope.$meteorCollection(Meteor.users, false).subscribe('users');

		$scope.parties = $meteor.collection(function() {
			return Parties.find({}, {
				sort: $scope.getReactively('sort')
			});
		});

		$meteor.autorun($scope, function() {
			$meteor.subscribe('parties', {
				limit: parseInt($scope.getReactively('perPage')),
				skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
			}, $scope.getReactively('search')).then(function() {
				$scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
			});
		});

		$scope.rsvp = function(partyId, rsvp) {
			$meteor.call('rsvp', partyId, rsvp).then(
				function(data) {
					console.log('RSVP action successful!');
				},
				function(err) {
					console.log('Failure in RSVP action: ', err);
				}
			);
		};

		$scope.outstandingInvitations = function(party) {
			return _.filter($scope.users, function (user) {
				return (_.contains(party.invited, user._id) && 
				!_.findWhere(party.rsvps, {user: user._id}));
			});
		};

		$scope.getUserById = function(userId) {
			return Meteor.users.findOne(userId);
		};

		$scope.creator = function(party) {
			if (!party)
				return;
			var owner = $scope.getUserById(party.owner);
			if (!owner)
				return "Unknown";

			if ($rootScope.currentUser)
				if ($rootScope.currentUser._id)
					if (owner._id === $rootScope.currentUser._id)
						return 'Me!';

			return owner;
		};

		$scope.remove = function(party) {
			// splice the array, old-school style
			// this.parties.splice(this.parties.indexOf(party), 1);

			// or use Meteor's helper function .remove(item)
			$scope.parties.remove(party);
		};

		$scope.removeAll = function() {
			// note w/o parameter remove will nuke all documents in collection
			// belonging to user (if user security set up)
			$scope.parties.remove();
		};

		$scope.pageChanged = function(newPage) {
			$scope.page = newPage;
		};

		$scope.visitParty = function(partyId) {
			$state.go('partyDetails', {partyId: partyId});
		};

		$scope.$watch('orderProperty', function() {
			if ($scope.orderProperty) {
				$scope.sort = {name: parseInt($scope.orderProperty)};
			}
		});

	}]);