App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return { 

			currentIndex : 8 //will increment has the user swipes. 

		}

	},

	getMeteorData(){

		return {
			repoCards : Repos.find().fetch()		
		}	
	},

	renderCurrentRepo(){

		var currentRepo = this.data.repoCards[this.state.currentIndex];

		if(currentRepo !== undefined) {

			console.log(currentRepo)
			return <RepoCard key={currentRepo._id} repo={currentRepo} />;
		}

		// return this.data.repoCards[this.state.currentIndex].map((repo) => {

		// 	return <RepoCard key={repo._id} repo={repo}/>;

		// });

	},


	render(){

		return (
			<div className="main-container">
				{this.renderCurrentRepo()}
			</div>

		);

	}




});