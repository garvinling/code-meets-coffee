
Repos = new Mongo.Collection("repos");

if(Meteor.isClient) {

	Meteor.subscribe('repos',function(err, result){

	});


	Meteor.call("authenticateGitHub");
	
	Meteor.call("searchRepos","javascript","stars","desc");   //use for test / prototype

	// Meteor.call("getRandomRepo","javascript","stars","desc");  //live call 


	Meteor.startup(function(){

		ReactDOM.render(<App /> , document.getElementById('render-target'));


	});

}




