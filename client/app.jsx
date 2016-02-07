App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return { 

			currentIndex : 1 //will increment has the user swipes. 

		}

	},

	getMeteorData(){

		return {
			repoCards    : Repos.find().fetch()	
		}	
	},

	renderCurrentRepo(){

		var currentRepo = this.data.repoCards[this.state.currentIndex];

		if(currentRepo !== undefined) {

			return <RepoCard key={currentRepo._id} repo={currentRepo} />;
		}

		// return this.data.repoCards[this.state.currentIndex].map((repo) => {

		// 	return <RepoCard key={repo._id} repo={repo}/>;

		// });

	},

	swipeRight() {

		console.log('Swiped Right');
		this.state.currentIndex++;
		this.forceUpdate();
	},

	render(){

		return (
			<div className="main-container">
				{this.renderCurrentRepo()}
				<button className="btn btn-primary" onClick={this.swipeRight}>Swipe Right </button>
			</div>

		);

	}




});