// Very weak, needs serious expansion / development before using as reference
// Nothing happens when "reset" button clicked, should send a fake email (via console) and allow a one
// time log in w that, with a forced "change password" process
// Also: need to make a change password process!

angular.module('socially').controller('ResetCtrl', [
	'$meteor',
	'$scope',
	'$state',
	function($meteor, $scope, $state) {
		var that = this;

		that.credentials = {
			email: ''
		};

		that.error = '';

		that.login = function () {
			$meteor.forgotPassword(that.credentials.email).then(
				function() {
					$state.go('parties');
				}, function(err) {
					that.error = err;
				}
			);
		};
	}]);