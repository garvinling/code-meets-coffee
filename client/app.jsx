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

			return <RepoCard key={currentRepo._id} repo={currentRepo} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>;
		}

	},

	handleSwipeLeft() {
		console.log('Swiped Left');
		this.state.currentIndex++;
		//dont do defined action
		this.forceUpdate();

	},


	handleSwipeRight() {

		console.log('Swiped Right');
		this.state.currentIndex++;
		//do defined action
		this.forceUpdate();        
	},

	render(){

		return (
			<div className="main-container">
				{this.renderCurrentRepo()}
			</div>

		);

	}




});