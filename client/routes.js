// Careful, tutorial outlining run() method is buggy. For proper usage see:
// http://angular-meteor.com/api/auth
angular.module("socially").run([
	"$rootScope",
	"$state",
	function($rootScope, $state) {
		// yup, $stateChangeError takes six parameters
		// anyway, catch error thrown when the $meteor.requireUser() promise is
		// rejected and redirect user back to login page
		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
			if (error === "AUTH_REQUIRED") {
			  $state.go("parties");
			}
		});
	}]);

angular.module('socially').config([
	'$urlRouterProvider',
	'$stateProvider',
	'$locationProvider',
	function($urlRouterProvider, $stateProvider, $locationProvider) {

		// bc everyone knows you got to hide your hash
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'client/users/login.ng.html',
				controller: 'LoginCtrl as lc'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'client/users/register.ng.html',
				controller: 'RegisterCtrl as rc'
			})
			.state('resetpw', {
				url: '/resetpw',
				templateUrl: 'client/users/reset-password.ng.html',
				controller: 'ResetCtrl as rpc'
			})
			.state('logout', {
				url: '/logout',
				resolve: {
					"logout": ['$meteor', '$state', function($meteor, $state) {
						return $meteor.logout().then(function() {
							$state.go('parties');
						}, function(err) {
							console.log('Logout error: ', err);
						});
					}]
				}
			})
			.state('parties', {
				url: '/parties',
				templateUrl: 'client/parties/parties-list.ng.html',
				controller: 'PartiesListCtrl' //,
				// example of resolving a subscription in $state's resolve method:
				/*
				resolve: {
					'subscribe': [
						'$meteor', function($meteor) {
							return $meteor.subscribe('parties');
						}
					]
				}
				*/
			})
			.state('partyDetails', {
				url: '/parties/:partyId',
				templateUrl: 'client/parties/party-details.ng.html',
				controller: 'PartyDetailsCtrl',
				resolve: {
					"currentUser": ["$meteor", function($meteor) {
						// 3 functions we can use, this one rejects promise if
						// any old user not logged in
						return $meteor.requireUser();
						// .waitForUser() and .requireValidUser() are the others
						// reference:
						// http://angular-meteor.com/api/auth
					}]
				}
			});

		$urlRouterProvider.otherwise('/parties');

	}]);