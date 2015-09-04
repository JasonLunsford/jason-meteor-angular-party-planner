var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};

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

Meteor.methods({
	invite: function (partyId, userId) {
		check(partyId, String);
		check(userId, String);
		var party = Parties.findOne(partyId);

		if (!party)
			throw new Meteor.Error(404, "No such party");
		if (party.owner !== this.userId)
			throw new Meteor.Error(404, "No such party");
		if (party.public)
			throw new Meteor.Error(400, "Public party, no invites needed.");

		if (userId !== party.owner && !_.contains(party.invited, userId)) {
			Parties.update(partyId, { $addToSet: { invited: userId } });

			var from = contactEmail(Meteor.users.findOne(this.userId));
			var to = contactEmail(Meteor.users.findOne(userId));

			if (Meteor.isServer && to) {
				// This code only runs on the server. If you didn't want clients
				// to be able to see it, you could move it to a separate file.
				Email.send({
					from: "noreply@socially.com",
					to: to,
					replyTo: from || undefined,
					subject: "PARTY: " + party.name,
					text:
					"Hey, I just invited you to '" + party.name + "' on Socially." +
					"\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
				});
			}
		}
	},
	rsvp: function (partyId, rsvp) {
		check(partyId, String);
		check(rsvp, String);
		var party = Parties.findOne(partyId);
		var rsvpIndex = _.indexOf(_.pluck(party.rsvps, 'user'), this.userId);

		if (!this.userId)
			throw new Meteor.Error(403, "You must be logged in to RSVP");
		if (!_.contains(['yes', 'no', 'maybe'], rsvp))
			throw new Meteor.Error(400, "Invalid RSVP answer");
		if (!party)
			throw new Meteor.Error(404, "No such party dude are you high?");
		if (!party.public && party.owner !== this.userId && !_.contains(party.invited, this.userId))
			throw new Meteor.Error(403, "Not invited to this party sunshine - Crash It!");

		if (rsvpIndex !== -1) {
			// Update existing RSVP entry on server (mongo) and client (minimongo)
			if (Meteor.isServer) {
				// Not sure what's going on with the naked $, probably a mongo specific
				// variable/special character
				Parties.update(
					{_id: partyId, "rsvps.user": this.userId},
					{$set: {"rsvps.$.rsvp": rsvp}} // <-- the mystery $
				);
			} else {
				// minimongo doesn't support the mystery $ in modifier, so workaround
				// for clients below. this is safe on client since dealing w only one
				// thread and thus index will be accurate
				var modifier = {$set: {}};
				modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
				Parties.update(partyId, modifier);
			}
			// Next Version: Email RSVP updates to party invitees! Woot!
		} else {
			// Add new RSVP entry
			Parties.update(partyId, {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
		}
	}
});

