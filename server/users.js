// Meteor.users is a pre-defined collection, made available via meteor-accounts,
// no need to explicitly create a new Meteor Collection

Meteor.publish("users", function() {
	// find with empty object as first parameter means "all documents within collection"
	// but select only the email & profile fields from each users document
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});