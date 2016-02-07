RepoCardStats = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired
	},
	render(){	
		return(
				<div className ="row stats-container">
					<div className ="col-md-3 stars">    🌟 {this.props.repo.stars}</div>
					<div className ="col-md-3 rank">     🏆 #{this.props.repo.rank}</div>
					<div className ="col-md-3 forks">    🍴  {this.props.repo.forks}</div>
					<div className ="col-md-3 issues">   ❗  {this.props.repo.issues}</div>
				</div>

		);
	}
});
