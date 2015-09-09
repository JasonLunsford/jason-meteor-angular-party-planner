// No "(Meteor.isClient)" conditional check required since code is located
// in the client directory!

// Disable auto reload on file save
Meteor._reload.onMigrate(function() {
	return [false];
});

angular.module('socially', [
	'angular-meteor',
	'ui.router',
	'angularUtils.directives.dirPagination',
	'uiGmapgoogle-maps',
	'ngFileUpload'
]);