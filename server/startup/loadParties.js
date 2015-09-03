// No "(Meteor.isServer)" conditional check required since code is located
// in the server directory!

Meteor.startup(function () {
	if (Parties.find().count() === 0) {
		// this data loaded into memory, NOT available until server
		// rebooted
		var parties = [
			{
				'name': 'Outlaw Country',
				'description': 'country when it was still cool',
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
			},
			{
				'name': 'Hip Hop Mega Bash',
				'description': 'Rocking underground hits all night',
				'public':true
			},
			{
				'name': 'Liquid Jazz Groove',
				'description': 'groove so smooth you will move and move',
				'public':true
			},
			{
				'name': 'Metal BOX THROWDOWN',
				'description': 'come get your face stomped',
				'public':true
			}
		];
		for (var i = 0; i < parties.length; i++) {
			Parties.insert(parties[i]);
		}
	}
});