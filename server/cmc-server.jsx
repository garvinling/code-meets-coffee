
var github = new GitHub({
	version:"3.0.0",
	timeout:5000
});





Meteor.methods({

	authenticateGitHub() {


		github.authenticate({

			type : "basic",
			username: Meteor.settings.private.GITHUB_USERNAME,
			password: Meteor.settings.private.GITHUB_PW


		});


	}

});