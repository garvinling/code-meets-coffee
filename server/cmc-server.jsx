

var github = new GitHub({
	version:"3.0.0",
	timeout:5000
});

Repos = new Mongo.Collection("repos");

Future = Npm.require('fibers/future');

Meteor.publish('repos',function(){

	return Repos.find();

});

const NUM_PER_PAGE = 40;
const MAX_PAYLOAD_LENGTH = 1000;
const NUM_PAGES = (MAX_PAYLOAD_LENGTH / NUM_PER_PAGE);
const NUM_REPOS_TO_QUEUE = 10;

var getRandomPageNum = function(min, max){

	return Math.floor(Math.random() * (max - min + 1)) + min;

}




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
					issues : repoObj.open_issues_count,
					language : repoObj.language,
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
			per_page:1,
			page:1


		}, boundCallback);

	return fut.wait();
	},

	getRandomRepo : function(keyword , sortBy , order) {


		Repos.remove({});  //clear the db before getting new batch of repos

		var fut = new Future();


		var getRandomRepoCallback = Meteor.bindEnvironment(function(err,res){

				if(err) {
					
					fut.return(err);

				} else {

					//TODO: handle duplicates.
					for(var i = 0 ; i < NUM_REPOS_TO_QUEUE ; i++) {

						var randomIndex = getRandomPageNum(0,res.items.length);
						var repoObj     = res.items[randomIndex];

						var repoToPush = {

							name : repoObj.name,
							link : repoObj.html_url,
							stars : repoObj.stargazers_count,
							forks : repoObj.forks_count,
							watchers : repoObj.watchers_count,
							size : repoObj.size,
							rank : repoObj.score,
							description : repoObj.description,
							issues : repoObj.open_issues_count,
							language : repoObj.language,
							image : repoObj.owner.avatar_url

						}

						Repos.update({name:repoObj.name},repoToPush,{upsert:true});


						console.log('Queueing: ' + repoToPush.name);
					}

		
					// Repos.update({name:repoObj.name},repoToPush,{upsert:true});
					
					fut.return(repoObj);
				}

		});




		github.search.repos({

			q : 'language:' + keyword , 
			sort : sortBy , 
			order : 'desc',
			per_page: NUM_PER_PAGE,
			page: getRandomPageNum(1,NUM_PAGES)


		},getRandomRepoCallback);
	
	return fut.wait();

	}




});








