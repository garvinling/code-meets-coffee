
var github = new GitHub({
	version:"3.0.0",
	timeout:5000
});

Repos = new Mongo.Collection("repos");

Future = Npm.require('fibers/future');

Meteor.publish('repos',function(){

	return Repos.find();

});



Meteor.methods({

	authenticateGitHub : function(){


		github.authenticate({

			type : "basic",
			username: Meteor.settings.private.GITHUB_USERNAME,
			password: Meteor.settings.private.GITHUB_PW


		});


	},

	searchRepos : function(keyword , sortBy , order){
			
			var fut = new Future();

			var boundCallback = Meteor.bindEnvironment(function(err,res){

					if(err) {
						fut.return(err);
					} else {

						var repoObj = res.items[0];

						var repoToPush = {

							name : repoObj.name,
							link : repoObj.html_url,
							stars : repoObj.stargazers_count,
							forks : repoObj.forks_count,
							watchers : repoObj.watchers_count,
							size : repoObj.size,
							rank : repoObj.score,
							description : repoObj.description,
							image : repoObj.owner.avatar_url

						}
						Repos.update({name:repoObj.name},repoToPush,{upsert:true});
						fut.return(res);
					}


			});


			github.search.repos({

				q : 'language:'+keyword , 
				sort : sortBy , 
				order: 'desc',
				per_page:1


			}, boundCallback);

		return fut.wait();
	}

});



//  Meteor.methods({
//     callAsync: function () {
//       var fut = new Future();
//       var bound_callback = Meteor.bindEnvironment(function (err, res) {
//         if(err) {
//           fut.throw(err);
//         }  else {
//           fut.return(res)
//         }
//       });
//       async(bound_callback);
//       fut.wait();
//     }
//   });
// }
 





