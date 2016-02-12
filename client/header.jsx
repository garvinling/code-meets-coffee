HeaderBar = React.createClass({
	
	getInitialState() {
		
		var _buttonText = 'Login with Github'; 
		var _onClick    = this.loginGit;
		
		if(Meteor.user()) {

			_buttonText = Meteor.user().profile.name;
			_onClick    = this.logoutGit;

		} 

	    return {
	        buttonText : _buttonText,
	        onclick    : _onClick
	    };
	},

	loginGit() {
		console.log('2');
		Meteor.loginWithGithub({
		  requestPermissions: [ 'public_repo']
		}, function (err) {
		  if (err)
		    Session.set('errorMessage', err.reason || 'Unknown error');
		});
	},

	logoutGit() {
		console.log('1');
		this.setState({buttonText : 'Login with Github'});
		this.setState({onclick    : this.loginGit});
		Meteor.logout(function(err,data){

		});

	},

	checkStar() {
		console.log(Meteor.user())
		Meteor.call("starRepo","airbnb","javascript");


	},


	render() {

		return (

			<div className="headerBar">
				{ Meteor.user() ? 
					<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button>:<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button>

				}
				

			 </div>



		);


	}


});