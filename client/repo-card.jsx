RepoCard = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired
	},

	render(){

		var styles = { 

			backgroundImage: "url(" + this.props.repo.image + ")"


		};


		return(


				<div className="card-container">
						
					<div className="repo-bg-image" style={styles}></div>			
					
					<h1 className="repo-title">{this.props.repo.name}</h1>

					<RepoCardStats repo={this.props.repo}/>
					

					<div className="description-container">{this.props.repo.description}</div>
				</div>

		);
	}

});
					// <img src={this.props.repo.image}/>


	// 		name : repoObj.name,
	// 		link : repoObj.html_url,
	// 		stars : repoObj.stargazers_count,
	// 		forks : repoObj.forks_count,
	// 		watchers : repoObj.watchers_count,
	// 		size : repoObj.size,
	// 		rank : repoObj.score,
	// 		description : repoObj.description,
	// 		image : repoObj.owner.avatar_url
