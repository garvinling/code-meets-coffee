
Repos = new Mongo.Collection("repos");
SavedRepos = new Mongo.Collection("fastrepos");

if(Meteor.isClient) {	


		Meteor.startup(function(){
			

			

			if(Meteor.user() !== null) {
				Meteor.call("authenticate");
			}


			ReactDOM.render(<App /> , document.getElementById('render-target'));
			


		});







}




