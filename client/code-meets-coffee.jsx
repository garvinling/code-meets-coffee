
Repos = new Mongo.Collection("repos");
SavedRepos = new Mongo.Collection("fastrepos");

if(Meteor.isClient) {	


		Meteor.startup(function(){

		
			if(Meteor.user() !== null) {
				Meteor.call("authenticate");
			}


			Meteor.subscribe('repos',function(){

				ReactDOM.render(<App /> , document.getElementById('render-target'));

			});


			// Meteor.call("getReposFromAPI","javascript","stars","desc",true,function(err,res){});   
		});



}




