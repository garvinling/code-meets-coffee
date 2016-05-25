HeaderBar = React.createClass({
	

	propTypes : {

		aboutVisible : React.PropTypes.bool.isRequired,
		animationSelected : React.PropTypes.string.isRequired,
		toggleAbout : React.PropTypes.func.isRequired,
		user : React.PropTypes.object

	},

	toggleAboutSection() {


		this.props.toggleAbout();

	},


	loginGit() {
		

		Meteor.loginWithGithub({
		  requestPermissions: [ 'public_repo']
		}, function (err) {

		  if (err)
		    Session.set('errorMessage', err.reason || 'Unknown error');

		});

	},

	logoutGit(){
		

		Meteor.logout();


	},


	render() {
			
		var buttonText = '';
		var mode       = 'browsing';

		if(this.props.user) {

			buttonText = this.props.user.profile.name;
			mode       = 'Starring';

		} 

		return (
			<div className="headerBar">
				<About visible={this.props.aboutVisible} classFromApp={classNames('about-container','animated',this.props.animationSelected)}/> 
				<div className="login">
				{ this.props.user ? 
					<button onClick={this.logoutGit} className="btn btn-primary"><img src="/github-256.png"/><span className="github-user">{buttonText}</span></button> :<button onClick={this.loginGit} className="btn btn-primary"><img src="/github-256.png"/></button>
				}
				<h4>CODE MEETS COFFEE</h4>
				</div>
			
				<div className="header-right">
					<div className="mode-about">
						 <span className="mode-indicator">{mode}</span>
						 <span className="glyphicon glyphicon-question-sign" aria-hidden="true" onClick={this.toggleAboutSection}></span>
					 </div>
				</div>
			 </div>
		);
	}


});