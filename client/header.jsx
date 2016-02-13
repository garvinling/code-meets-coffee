HeaderBar = React.createClass({
	

	propTypes : {

		
		toggleAbout : React.PropTypes.func.isRequired


	},

	toggleAboutSection() {


		this.props.toggleAbout();

	},

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
		Meteor.loginWithGithub({
		  requestPermissions: [ 'public_repo']
		}, function (err) {
		  if (err)
		    Session.set('errorMessage', err.reason || 'Unknown error');
		});
	},

	logoutGit() {
		this.setState({buttonText : 'Login with Github'});
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
							<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button>:<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button>

						}
					</div>
					<div className="col-xs-7 title">
					<h4>WYGT</h4>

					</div>
					<div className="col-xs-1 about">
						  <span className="glyphicon glyphicon-question-sign" aria-hidden="true" onClick={this.toggleAboutSection}></span>
					</div>
				</div>
			 </div>



		);


	}


});