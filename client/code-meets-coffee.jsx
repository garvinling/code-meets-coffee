
Repos = new Mongo.Collection("repos");

if(Meteor.isClient) {

	Meteor.subscribe('repos',function(err, result){

	});


	Meteor.call("authenticateGitHub");
	
	// Meteor.call("searchRepos","javascript","stars","desc");

	Meteor.call("getRandomRepo","javascript","stars","desc",function(err,res){
		

	});


	Meteor.startup(function(){

		ReactDOM.render(<App /> , document.getElementById('render-target'));


	});

}




