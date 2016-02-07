
Repos = new Mongo.Collection("repos");

if(Meteor.isClient) {

	Meteor.subscribe('repos',function(err, result){

	});

	Meteor.call("authenticateGitHub");
	
	Meteor.startup(function(){

		ReactDOM.render(<App /> , document.getElementById('render-target'));


	});

}




