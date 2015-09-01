// No "(Meteor.isServer)" conditional check required since code is located
// in the server directory!

Meteor.startup(function () {
	if (Parties.find().count() === 0) {
		// this data loaded into memory, NOT available until server
		// rebooted
		var parties = [
			{
				'name': 'Dubstep-Free Zone',
				'description': 'Can we please just for an evening not listen to dubstep?',
				'public':true
			},
			{
				'name': 'All Dubstep All The Time',
				'description': 'Get it on!',
				'public':true
			},
			{
				'name': 'Savage Lounging',
				'description': 'Leisure suit required. And only fiercest manners.',
				'public':true
			}
		];
		for (var i = 0; i < parties.length; i++) {
			Parties.insert(parties[i]);
		}
	}
});