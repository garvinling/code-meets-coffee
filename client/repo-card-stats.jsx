RepoCardStats = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired
	},



	render(){

		console.log(this.props)

		return(
				<div className="row stats-container">
					<div className="col-md-2 stars"> 🌟 {this.props.repo.stars}</div>
					<div className="col-md-2 rank">  🏆 #{this.props.repo.rank}</div>
					<div className="col-md-2 rank">  👀  {this.props.repo.watchers}</div>
					<div className="col-md-2 rank">Rank: #{this.props.repo.rank}</div>



				</div>

		);
	}

});


	// 		name : repoObj.name,
	// 		link : repoObj.html_url,
	// 		stars : repoObj.stargazers_count,
	// 		forks : repoObj.forks_count,
	// 		watchers : repoObj.watchers_count,
	// 		size : repoObj.size,
	// 		rank : repoObj.score,
	// 		description : repoObj.description,
	// 		image : repoObj.owner.avatar_url
