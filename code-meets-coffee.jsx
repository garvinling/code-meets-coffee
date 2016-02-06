Tasks = new Mongo.Collection("tasks2");

if(Meteor.isClient) {


	Meteor.call("authenticateGitHub");

	Meteor.call("searchRepos","javascript","stars","desc",function(err,res){

			Session.set("current_repo",res);
	});

	Meteor.startup(function(){

		ReactDOM.render(<App /> , document.getElementById('render-target'));


	});

}




