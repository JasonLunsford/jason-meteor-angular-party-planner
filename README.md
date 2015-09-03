## The Full Angular-Meteor Tutorial

Definitely worth the work!

http://angular-meteor.com/tutorials/angular1

### Notes

To prepare Meteor for the real world **remove** these default packages:
* meteor remove insecure (removes permit all as default Collections security/behavior)
* meteor remove autopublish (disables explicit publishing of documents)

Add these packages:
* meteor add accounts-password (enables user level Collections security)
* meteor add tmeasday:publish-counts (allows publishing of the full count of a publication to Clients)
* meteor add email (to enable email services from server)

### My Tweaks

Skipped steps 10 & 11, but if you've never deployed a Meteor app for public consumption, or wired it for PhoneGap and Android support DO these chapters!

References
----------

[StackOverflow Understanding Meteor Publish/Subscribe](https://stackoverflow.com/questions/19826804/understanding-meteor-publish-subscribe/21853298#21853298)