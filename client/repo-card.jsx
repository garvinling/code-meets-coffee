RepoCard = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired
	},

	render(){

		return(
				<div className="card-container">
					
					<h1 className="repo-title">{this.props.repo.name}</h1>
					
					<img src={this.props.repo.image}/>
						
					<RepoCardStats repo={this.props.repo}/>
					

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
