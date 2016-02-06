RepoCard = React.createClass({

	// 		name : repoObj.name,
	// 		link : repoObj.html_url,
	// 		stars : repoObj.stargazers_count,
	// 		forks : repoObj.forks_count,
	// 		watchers : repoObj.watchers_count,
	// 		size : repoObj.size,
	// 		rank : repoObj.score,
	// 		description : repoObj.description,
	// 		image : repoObj.owner.avatar_url




	render : () => {

		var repo = Session.get("current_repo");

		return(
		<div className="card-container">
			<h1>{repo[0].name}</h1>
			<p>Stars: {repo[0].stargazers_count}</p>

		</div>


		);
	}


});



