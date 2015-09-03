// removed Controller As, replaced with $scope, to make dealing
// with sort/filtering/search easier. Improvement suggestion:
// refactor using Controller As / eliminating $scope

angular.module('socially').controller('PartiesListCtrl', [
	'$rootScope',
	'$meteor',
	'$scope',
	function($rootScope, $meteor, $scope) {

		$scope.page = 1;
		$scope.perPage = 3; 
		$scope.sort = { name: 1 };
		$scope.orderProperty = '1';

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

		$scope.$watch('orderProperty', function() {
			if ($scope.orderProperty) {
				$scope.sort = {name: parseInt($scope.orderProperty)};
			}
		});

	}]);