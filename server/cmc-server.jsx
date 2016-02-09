
const NUM_PER_PAGE       = 100;
const MAX_PAYLOAD_LENGTH = 1000;
const NUM_PAGES          = (MAX_PAYLOAD_LENGTH / NUM_PER_PAGE);
const NUM_REPOS_TO_QUEUE = 100;


SavedRepos    = new Mongo.Collection('fastrepos');
Repos         = new Mongo.Collection('repos');

Future = Npm.require('fibers/future');

var github = new GitHub({
	version:"3.0.0",
	timeout:5000
});



Meteor.publish('repos',function(){

	return Repos.find();

});



Meteor.publish('fastrepos',function(){


	return SavedRepos.find();


})




var getRandomPageNum = function(min, max){

	return Math.floor(Math.random() * (max - min + 1)) + min;

}
 
var getReadMe = function(username , repo) {

		var fut = new Future();
		var arrayToParse = [];



		var getReadMeCallback = function(err, res){

			if(err) {
					
				fut.return(err);
			} else {

				fut.return(res);
			}

		};


		github.repos.getReadme({
				headers : {

					"Accept": "application/vnd.github-blob.html"
				},
				user :  username,
				repo :  repo

		},getReadMeCallback);

		return fut.wait();

	}



var getReadMeAndPushRepo = function(repoToPush){

	Repos.update({name:repoToPush.name},repoToPush,{upsert:true});


}








Meteor.methods({


	authenticateGitHub : function(){


		github.authenticate({

			type : "basic",
			username: Meteor.settings.private.GITHUB_USERNAME,
			password: Meteor.settings.private.GITHUB_PW

		});

	},

	cacheRepos : function(keyword , sortBy , order){
		
		var cacheReposCallback = Meteor.bindEnvironment(function(err,res){
			if(err) {
				fut.return(err);
			} else {

				for(var i = 0 ; i < 40 ; i++) {

					var randomIndex = getRandomPageNum(0,res.items.length -1 );
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


					SavedRepos.update({name:repoObj.name},repoToPush,{upsert:true},function(err,res){


					});

				}
				
			}
		});

		github.search.repos({
		
			q : 'language:' + keyword , 
			sort : sortBy , 
			order : 'desc',
			per_page: NUM_PER_PAGE,
			page: getRandomPageNum(1,NUM_PAGES)

		}, cacheReposCallback);

	},

	getReposFromAPI: function(keyword , sortBy , order , destroy) {

		if(destroy) {

			Repos.remove({});  //clear the db before getting new batch of repos

		}

		var fut = new Future();


		var getRandomRepoCallback = Meteor.bindEnvironment(function(err,res){

			if(err) {
				
				fut.return(err);

			} else {

				for(var i = 0 ; i < NUM_REPOS_TO_QUEUE ; i++) {

					var randomIndex = getRandomPageNum(0,res.items.length -1 );
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
					getReadMeAndPushRepo(repoToPush)

					// Repos.update({name:repoObj.name},repoToPush,{upsert:true});
				}

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








