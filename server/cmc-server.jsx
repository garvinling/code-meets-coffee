
var github = new GitHub({
	version:"3.0.0",
	timeout:5000
});

Repos = new Mongo.Collection("repos");

Future = Npm.require('fibers/future');


Meteor.methods({

	authenticateGitHub : () => {


		github.authenticate({

			type : "basic",
			username: Meteor.settings.private.GITHUB_USERNAME,
			password: Meteor.settings.private.GITHUB_PW


		});


	},

	searchRepos : (keyword , sortBy , order) => {
			
			var fut = new Future();

			github.search.repos({

				q : 'language:'+keyword , 
				sort : sortBy , 
				order: 'desc',
				per_page:1


			}, function(err,res){

				if(err) {
					fut.return(err);
				} else {

					fut.return(res.items);
				}


			});
			return fut.wait();
	}


	// 		name : repoObj.name,
	// 		link : repoObj.html_url,
	// 		stars : repoObj.stargazers_count,
	// 		forks : repoObj.forks_count,
	// 		watchers : repoObj.watchers_count,
	// 		size : repoObj.size,
	// 		rank : repoObj.score,
	// 		description : repoObj.description,
	// 		image : repoObj.owner.avatar_url


});









