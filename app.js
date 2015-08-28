// "Parties" available client & server, not owned exclusively by either
// contents can be modified programmatically in client, by user via View,
// or by server (due maybe to another client making changes)
Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
	angular.module('socially', [
		'angular-meteor',
		'ui.router'
	]);

	angular.module('socially').config([
		'$urlRouterProvider',
		'$stateProvider',
		'$locationProvider',
		function($urlRouterProvider, $stateProvider, $locationProvider) {

			// bc everyone knows you got to hide your hash
			$locationProvider.html5Mode(true);

			$stateProvider
				.state('parties', {
					url: '/parties',
					templateUrl: 'parties-list.ng.html',
					controller: 'PartiesListCtrl as partyList'
				})
				.state('partyDetails', {
					url: '/parties/:partyId',
					templateUrl: 'party-details.ng.html',
					controller: 'PartyDetailsCtrl as partyDeets'
				});

			$urlRouterProvider.otherwise('/parties');

		}]);

	angular.module('socially').controller('PartiesListCtrl', [
		'$scope',
		'$meteor',
		function($scope, $meteor) {

			this.parties = $meteor.collection(Parties);

			this.remove = function(party) {
				// splice the array, old-school style
				// this.parties.splice(this.parties.indexOf(party), 1);

				// or use Meteor's helper function .remove(item)
				this.parties.remove(party);
			};

			this.removeAll = function() {
				// note w/o item remove nukes all documents in collection
				this.parties.remove();
			};
		}]);

	angular.module('socially').controller('PartyDetailsCtrl', [
		'$scope',
		'$stateParams',
		'$meteor',
		function($scope, $stateParams, $meteor) {

			// adding false as 3rd parameter prevents autosaving object on every change
			this.party = $meteor.object(Parties, $stateParams.partyId, false);

			this.save = function() {
				this.party.save().then(function(numberOfDocs) {
					console.log('doc '+numberOfDocs+' saved!');
				}, function(error) {
					console.log('save error: ', error);
				});
			};

			this.reset = function() {
				this.party.reset();
			};

		}]);
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Parties.find().count() === 0) {
			// this data loaded into memory, NOT available until server
			// rebooted
			var parties = [
				{
					'name': 'Dubstep-Free Zone',
					'description': 'Can we please just for an evening not listen to dubstep?'
				},
				{
					'name': 'All Dubstep All The Time',
					'description': 'Get it on!'
				},
				{
					'name': 'Savage Lounging',
					'description': 'Leisure suit required. And only fiercest manners.'
				}
			];
			for (var i = 0; i < parties.length; i++) {
				Parties.insert(parties[i]);
			}
		}
	});
}