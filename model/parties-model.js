// "Parties" available client & server, not owned exclusively by either
// contents can be modified programmatically in client, by user via View,
// or by server (due maybe to another client making changes)
Parties = new Mongo.Collection("parties");

Parties.allow({
	insert: function (userId, party) {
		return userId && party.owner === userId;
	},
	update: function (userId, party, fields, modifier) {
		return userId && party.owner === userId;
	},
	remove: function (userId, party) {
		return userId && party.owner === userId;
	}
});