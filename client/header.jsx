HeaderBar = React.createClass({
	

	propTypes : {

		
		toggleAbout : React.PropTypes.func.isRequired,



	},

	toggleAboutSection() {
		this.setState({aboutVisible : !this.state.aboutVisible});

		if(this.state.aboutVisible === false) {

			this.setState({animationSelected : 'slideInUp'})

		} else {
			this.setState({animationSelected : 'slideOutDown'})

		}
	},

	getInitialState() {
		
		var _buttonText = ''; 
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
	        mode       : _mode,
	        aboutVisible : false,
	        animationSelected : 'hideAbout'

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
		
		this.setState({buttonText : ''});
		this.setState({mode       : 'browsing'});
		this.setState({onclick    : this.loginGit});
		Meteor.logout(function(err,data){

		});

	},


	render() {

		return (
			<div className="headerBar">
				<About visible={this.state.aboutVisible} classFromApp={classNames('about-container','animated',this.state.animationSelected)}/> 
				<div className="login">
				{ Meteor.user() ? 
					<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button> :<button onClick={this.state.onclick} className="btn btn-primary">{this.state.buttonText}<img src="/github-256.png"/></button>
				}	
				</div>
				<div className="title">
					<h4>WYGT</h4>
				</div>
				<div className="header-right">
					<div className="mode-about">
						 <span className="mode-indicator">{this.state.mode}</span>
						 <span className="glyphicon glyphicon-question-sign" aria-hidden="true" onClick={this.toggleAboutSection}></span>
					 </div>
				</div>
			 </div>
		);
	}


});