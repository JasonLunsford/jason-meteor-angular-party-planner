angular.module('socially').controller('NavigationCtrl', [
	'$rootScope',
	'$meteor',
	'$scope',
	'$state',
	function($rootScope, $meteor, $scope, $state) {

		var currentUser = $rootScope.currentUser;

		$scope.$watch('currentUser', function() {
			if ($rootScope.currentUser) {
				$scope.userName = $rootScope.currentUser.emails[0].address;
			}
		});

	}]);