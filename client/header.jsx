HeaderBar = React.createClass({
	

	propTypes : {

		
		toggleAbout : React.PropTypes.func.isRequired,



	},

	toggleAboutSection() {

		this.props.toggleAbout();

	},

	getInitialState() {
		
		var _buttonText = 'Login with Github'; 
		var _onClick    = this.loginGit;
		var _mode       = 'browsing';
		
		if(Meteor.user()) {

			_buttonText = Meteor.user().profile.name;
			_onClick    = this.logoutGit;
			_mode       = 'starring';


		} 

	    return {
	        buttonText : _buttonText,
	        onclick    : _onClick,
	        mode       : _mode
	    };
	},

	loginGit() {
		
		Meteor.loginWithGithub({
		  requestPermissions: [ 'public_repo']
		}, function (err) {
		  if (err)
		    Session.set('errorMessage', err.reason || 'Unknown error');
		});
	},

	logoutGit() {
		
		this.setState({buttonText : 'Login with Github'});
		this.setState({mode       : 'browsing'});
		this.setState({onclick    : this.loginGit});
		Meteor.logout(function(err,data){

		});

	},


	render() {

		return (
			<div className="headerBar">
				<div className="row">
					<div className="col-xs-4">
						{ Meteor.user() ? 
							<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button> :<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button>

						}	



					</div>
					<div className="col-xs-6 title">
					<h4>WYGT</h4>

					</div>
					<div className="col-xs-2 about">
						 
						 <span className="mode-indicator">
								{this.state.mode}
						 </span>
						 <span className="glyphicon glyphicon-question-sign" aria-hidden="true" onClick={this.toggleAboutSection}></span>
					</div>
				</div>


			 </div>



		);


	}


});