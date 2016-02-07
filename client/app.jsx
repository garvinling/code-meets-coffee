App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return null;

	},

	getMeteorData(){

		return {
			repoCards : Repos.find().fetch()		
		}	
	},

	renderCurrentRepo(){

		return this.data.repoCards.map((repo) => {

			return <RepoCard key={repo._id} repo={repo}/>;

		});

	},


	render(){

		return (
			<div className="main-container">
				{this.renderCurrentRepo()}
			</div>

		);

	}




});