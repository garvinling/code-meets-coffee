
Repos = new Mongo.Collection("repos");
SavedRepos = new Mongo.Collection("fastrepos");

if(Meteor.isClient) {	


		var checkAuth = function() {
			
			var sessionCode = Session.get('github_code');


			if(sessionCode === undefined) { 

				var code = window.location.href.match(/\?code=(.*)/);
			
				if(code !== null){
					
					console.log('Got user code.  Setting new session');
					Session.set('github_code',code[1]);
				   
				    Meteor.call("authorizeCode",code[1],function(err,data){

				   			 Meteor.call("starRepo","airbnb","javascript");
				   			 Meteor.call("testAuth")

				    });

				} else {
					console.log('user not logged in. liking disabled.')

				}

			}  else {

				console.log('session has been set. ')

			}

		};


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




