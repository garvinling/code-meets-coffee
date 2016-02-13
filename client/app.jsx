App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return { 

			currentIndex : 0 ,
			aboutVisible : false,
			animationSelected : 'hideAbout',
			lastCommand  : '' 

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

	renderNextRepo() {

		var repoFromAPI  = this.data.repoCards[this.state.currentIndex + 1];
		if(repoFromAPI !== undefined) {

			return <RepoCard key={repoFromAPI._id} repo={repoFromAPI} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>;
		}
		
	},


	getMoreRepos() {

		Meteor.call("getReposFromAPI","javascript","stars","desc",false,function(err,res){
				
				console.log('Done retrieving repos.');

		});   
	},

	handleSwipeLeft() {

		var length = this.data.repoCards.length;
		this.setState({currentIndex : this.state.currentIndex + 1});
		//this.setState({lastCommand  : 'nop'});


		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		}
	},


	handleSwipeRight() {
		
		var length = this.data.repoCards.length;
		this.setState({currentIndex : this.state.currentIndex + 1});
		//this.setState({lastCommand  : 'yep'});

		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		}
	},

	toggleAbout() {

		this.setState({aboutVisible : !this.state.aboutVisible});


		if(this.state.aboutVisible === false) {

			this.setState({animationSelected : 'fadeInLeft'})

		} else {
			this.setState({animationSelected : 'fadeOutLeft'})

		}
	},

	render(){
		return (
			<div className="main-container">
			<HeaderBar toggleAbout={this.toggleAbout} />
			<About visible={this.state.aboutVisible} classFromApp={classNames('about-container','animated',this.state.animationSelected)}/> 
				/**TODO: Need to render or queue the next card. **/
				{this.renderCurrentRepo()}				
				{this.renderNextRepo()}
			</div>

		);

	}




});