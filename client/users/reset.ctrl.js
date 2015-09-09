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

		that.reset = function () {
			if (that.credentials.email) {
				$meteor.forgotPassword({email: that.credentials.email}, function(err) {
					if (err) {
						if (err.message === 'User not found [403]') {
							that.error = 'Sorry we cannot find this email. Try again?';
						} else {
							that.error = 'Ouch, something went wrong.';
						}
					} else {
						that.error = 'Email sent - check your mailbox baby!';
					}
				});
			} else {
				that.error = 'Need an email address fool!';
			}
		};
	}]);