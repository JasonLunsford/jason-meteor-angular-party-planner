Meteor.publish("parties", function() {
	return Parties.find({
		// $or, $and, and $exists are Mongo operators used for writing queries
		// such as this one
		$or:[
			// if following tutorial lesson by lesson, be careful here. old data set does not
			// contain "public" field, add it or you'll never see "public" parties
			{$and: [
				{"public": true},
				{"public": {$exists: true}}
			]},
			{$and: [
				// query for equality, owner userId must match current userId
				{owner: this.userId},
				// and owner userId must exist
				{owner: {$exists: true}}
			]}
		]});
});