Meteor.publish("parties", function(options, searchString) {
	if (searchString === null) { searchString = ''; }
	// reference for the noReady flag:
	// https://github.com/percolatestudio/publish-counts#readiness
	Counts.publish(this, 'numberOfParties', Parties.find({
		'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
		$or:[
			{$and:[
				{'public': true},
				{'public': {$exists: true}}
			]},
			{$and:[
				{owner: this.userId},
				{owner: {$exists: true}}
			]}
		]}), { noReady: true});

	return Parties.find({
		// $or, $and, and $exists are examples of Mongo operators
		'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
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
		]}, options);
});