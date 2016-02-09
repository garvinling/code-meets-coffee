
Repos = new Mongo.Collection("repos");
SavedRepos = new Mongo.Collection("fastrepos");
Meteor.call("authenticateGitHub");

if(Meteor.isClient) {	

		Meteor.startup(function(){

			Meteor.subscribe('repos',function(){

				ReactDOM.render(<App /> , document.getElementById('render-target'));

			});


			Meteor.call("getReposFromAPI","javascript","stars","desc",true,function(err,res){
				

			});   



		});


}




