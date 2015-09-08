angular.module('socially').controller('LoginCtrl', [
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

		that.login = function () {
			$meteor.loginWithPassword(that.credentials.email, that.credentials.password).then(
				function() {
					$state.go('parties');
				}, function(err) {
					that.error = err;
				}
			);
		};
	}]);