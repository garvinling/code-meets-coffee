App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return { 

			currentIndex : 0 

		}

	},

	getMeteorData(){

		return {
			repoCards  : Repos.find().fetch()
		}	
	},


	renderCurrentRepo(){

		var repoFromAPI  = this.data.repoCards[this.state.currentIndex];

		if(repoFromAPI !== undefined) {

			return <RepoCard key={repoFromAPI._id} repo={repoFromAPI} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>;
		}


		return (

				<div className="loading-container">
					<img src="/loading-1.gif"/>
				</div>


			);
	},


	getMoreRepos() {

		Meteor.call("getReposFromAPI","javascript","stars","desc",false,function(err,res){
				
				console.log('Done retrieving repos.');

		});   
	},

	handleSwipeLeft() {

		var length = this.data.repoCards.length;
		this.state.currentIndex++;

		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		
		}

		this.forceUpdate();

	},


	handleSwipeRight() {
		
		var length = this.data.repoCards.length;
		this.state.currentIndex++;

		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();

		}
		this.forceUpdate();        
	},

	render(){

		return (
			<div className="main-container">
			<HeaderBar />

				{this.renderCurrentRepo()}
			</div>

		);

	}




});