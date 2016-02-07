RepoCard = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired
	},



	render(){

		console.log(this.props)

		return(
				<div className="card-container">
					<h1>{this.props.repo.name}</h1>
					<p>Stars: {this.props.repo.stars}</p>
					<p>Rank: #{this.props.repo.rank}</p>
					<p>Description: {this.props.repo.description}</p>
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
