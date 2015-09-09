angular.module('socially').controller('RegisterCtrl', [
	'$meteor',
	'$scope',
	'$state',
	function($meteor, $scope, $state) {
		var that = this;

		that.credentials = {
			email: '',
			password: ''
		};

		that.error = '';

		that.register = function () {
			$meteor.createUser(that.credentials).then(
				function() {
					$state.go('root.parties');
				}, function(err) {
					that.error = "Registration " + err;
				}
			);
		};
	}]);