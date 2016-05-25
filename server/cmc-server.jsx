
const NUM_PER_PAGE       = 100;
const MAX_PAYLOAD_LENGTH = 1000;
const NUM_PAGES          = (MAX_PAYLOAD_LENGTH / NUM_PER_PAGE);
const NUM_REPOS_TO_QUEUE = 100;


var github_access_token = "";
var github_scope = "";


ServiceConfiguration.configurations.remove({
  service: "github"
});

ServiceConfiguration.configurations.insert({
  service: "github",
  clientId: Meteor.settings.public.GITHUB_CLIENT_ID,
  secret: Meteor.settings.private.GITHUB_CLIENT_SECRET,
  loginStyle: "redirect"
});




SavedRepos    = new Mongo.Collection('fastrepos');
Repos         = new Mongo.Collection('repos');

Future = Npm.require('fibers/future');

var github = new GitHub({
	version:"3.0.0",
	timeout:9000
});



Meteor.publish('repos',function(){

	return Repos.find();

});



Meteor.publish('fastrepos',function(){


	return SavedRepos.find();

});




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
	authenticate : function() {

		github.authenticate({
		    type: "oauth",
		    token: Meteor.user().services.github.accessToken
		});
	},

	cacheRepos : function(keyword , sortBy , order){
		
		var cacheReposCallback = Meteor.bindEnvironment(function(err,res){
			if(err) {
				fut.return(err);
			} else {

				for(var i = 0 ; i < NUM_REPOS_TO_QUEUE; i++) {

					var randomIndex = getRandomPageNum(0,res.items.length -1 );
					var repoObj     = res.items[randomIndex];
					var repoToPush = {

						name : repoObj.name,
						username : repoObj.owner.login,
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

					console.log('pushing: ' + repoToPush.name);
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
		
		var fut = new Future();
		var reposToReturn = [];


		if(destroy) {

			Repos.remove({});  //clear the db before getting new batch of repos

		}


		var getRandomRepoCallback = Meteor.bindEnvironment(function(err,res){

			if(err) {
				
				fut.return(err);

			} else {

				for(var i = 0 ; i < NUM_REPOS_TO_QUEUE ; i++) {

					var randomIndex = getRandomPageNum(0,res.items.length -1 );
					var repoObj     = res.items[randomIndex];

					var repoToPush = {
						_id : repoObj.id,
						name : repoObj.name,
						username : repoObj.owner.login,
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

					reposToReturn.push(repoToPush);

					Repos.update({name:repoToPush.name},repoToPush,{upsert:true},function(err,data){
							


					});

				}			

				fut.return(reposToReturn);

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

	},

	authorizeCode : function(userCode) {

		var fut = new Future();

		HTTP.call( 'POST', 'https://github.com/login/oauth/access_token', {

		  headers: {
					"Accept": "application/json"
		  },

		  data: {
		    "client_id": Meteor.settings.public.GITHUB_CLIENT_ID,
		    "client_secret": Meteor.settings.private.GITHUB_CLIENT_SECRET,
		    "code": userCode
		  }
		}, function( error, response ) {
		  
		  if ( error ) {
		    console.log( error );
		    fut.return(error);
		  } else {

		  	var content = JSON.parse(response.content);
		  	github_access_token = content.access_token;
		  	github_scope = content.scope;

		  	fut.return('ok');

		  }

		});

		return fut.wait();
	},

	starRepo : function(repoOwner,repoName) {
		
		var fut = new Future();

		github.repos.star({

			user : repoOwner , 
			repo : repoName 

		},function(err,res){
			console.log('Wait')
			if(err) {
				console.log('error');
				console.log(err);
				fut.return(err);
			} else {
				console.log('response');
				console.log(res);
				fut.return(res);
			}

		});

		return fut.wait();
	}

});








