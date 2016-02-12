RepoCardStats = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired
	},
	render(){	
		return(
				<div className ="row stats-container">
					<div className ="col-md-4 stars">    🌟 <br/> {this.props.repo.stars}</div>
					<div className ="col-md-4 forks">    🍴  <br/>{this.props.repo.forks}</div>
					<div className ="col-md-4 issues">   ❗ <br/> {this.props.repo.issues}</div>
				</div>
				

		);
	}
});
